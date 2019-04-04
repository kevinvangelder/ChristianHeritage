import * as React from "react"
import { View, ViewStyle, TextStyle, Alert, ScrollView } from "react-native"
import { NavigationScreenProps, NavigationActions } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../shared/title-bar"
import { Text } from "../../shared/text"
import { inject, observer } from "mobx-react"
import { UserStore } from "../../../models/user-store"
import { CartStore } from "../../../models/cart-store"
import { spacing, color } from "../../../theme"
import { Button } from "../../shared/button"
import { getSpeakerNames } from "../../../lib/utils"

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing[4],
  paddingBottom: spacing[3],
}

const CART: ViewStyle = {
  flex: 1,
}
const HEADING: TextStyle = {
  marginTop: spacing[2],
  fontSize: 18,
  fontWeight: "bold",
}
const EMPTY: TextStyle = {
  textAlign: "center",
  maxWidth: "75%",
  alignSelf: "center",
}
const CART_ITEM: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
  borderBottomWidth: 1,
  borderBottomColor: color.line,
  paddingVertical: spacing[2],
}
const ITEM_DETAILS: ViewStyle = {
  flexDirection: "column",
  flex: 1,
}
const ITEM_TITLE: TextStyle = {
  fontWeight: "bold",
}
const ITEM_SPEAKER: TextStyle = {
  fontStyle: "italic",
  fontWeight: "normal",
}
const ITEM_PRICE: TextStyle = {
  marginLeft: spacing[2],
}
const REMOVE: TextStyle = {
  marginLeft: spacing[2],
}
const TOTAL: ViewStyle = {
  alignSelf: "flex-end",
}
const SUBTOTAL: TextStyle = {
  marginVertical: spacing[2],
}
const DISCLAIMER: TextStyle = {
  marginTop: spacing[3],
  fontSize: 12,
}
const SECTION: ViewStyle = {
  marginVertical: spacing[3],
}

export interface FinalizeOrderScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStore
  cartStore: CartStore
}

@inject("userStore", "cartStore")
@observer
export class FinalizeOrderScreen extends React.Component<
  FinalizeOrderScreenProps,
  {
    complete: boolean,
  }
> {
  constructor(props) {
    super(props)
    this.state = {
      complete:
        props.cartStore.currentCart.orderResult &&
        !!props.cartStore.currentCart.orderResult.ORDERID,
    }
  }

  checkout = async () => {
    const {
      cartStore: { currentCart: { token }, checkout, error },
      userStore: { currentUser: { isSignedIn } },
    } = this.props
    if (token && isSignedIn) {
      const result = await checkout()
      if (result) {
        this.setState({ complete: true })
      } else {
        Alert.alert(
          "Error",
          "We couldn't complete your transaction. Please try reentering your card. If you continue to see this error, restart the app or try a different card.",
        )
      }
    } else {
      if (!token) {
        Alert.alert(
          "Error",
          "Looks like we're missing some data necessary to complete your order. Please try again.",
          [
            {
              text: "Ok",
              onPress: () => {
                this.props.navigation.goBack()
              },
            },
          ],
        )
      } else if (!isSignedIn) {
        Alert.alert(
          "Error",
          "Looks like we're missing some data necessary to complete your order. Please try again.",
          [
            {
              text: "Ok",
              onPress: () => {
                this.props.navigation.goBack("checkout")
              },
            },
          ],
        )
      }
    }
  }

  finish = () => {
    this.props.navigation.pop(3)
    this.props.cartStore.currentCart.resetOrderResult()
  }

  render() {
    const { complete } = this.state
    return (
      <Screen preset="fixed">
        <TitleBar
          title={complete ? "Order Complete" : "Place Order"}
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
        <ScrollView style={ROOT} contentContainerStyle={{ width: "100%" }}>
          {complete && this.renderResult()}
          {!complete && this.renderCart()}
        </ScrollView>
      </Screen>
    )
  }

  renderResult = () => {
    const { orderResult } = this.props.cartStore.currentCart
    console.tron.log(orderResult)
    return (
      <View>
        <Text style={HEADING}>Thank you for your order!</Text>
        <View style={SECTION}>
          <Text>Order ID: #{orderResult && orderResult.ORDERID}</Text>
          <Text>Amount Paid: ${orderResult && orderResult.PAID}.00</Text>
          <Text>Items: {orderResult && orderResult.ITEMS.length}</Text>
        </View>
        <Button onPress={this.finish} text="Finish" />
        <Text style={DISCLAIMER}>
          You will receive an emailed receipt shortly with links to download your purchased
          sessions.
        </Text>
      </View>
    )
  }

  renderCart = () => {
    const { currentCart: { isEmpty, items } } = this.props.cartStore
    return (
      <View style={CART}>
        <Text style={HEADING}>Review Cart</Text>
        {!isEmpty && items.map(i => this.renderCartItem(i))}
        {!isEmpty && this.renderSubtotal()}
        <Text style={DISCLAIMER}>
          You will receive an emailed receipt with links to download the sessions you have
          purchased. If any sessions have not yet been uploaded, you will receive additional emails
          when each one is uploaded.
        </Text>
      </View>
    )
  }

  renderCartItem = item => {
    return (
      <View key={item.RECID} style={CART_ITEM}>
        <View style={ITEM_DETAILS}>
          <Text style={ITEM_TITLE} numberOfLines={0}>
            {item.TITLE}
          </Text>
          <Text style={ITEM_SPEAKER}>{getSpeakerNames(item)}</Text>
        </View>
        <Text style={ITEM_PRICE}>${item.PRICE}.00</Text>
      </View>
    )
  }

  renderSubtotal = () => {
    const { currentCart: { localSubtotal } } = this.props.cartStore
    return (
      <View style={TOTAL}>
        <Text style={SUBTOTAL}>Subtotal: ${localSubtotal}.00</Text>
        <Button onPress={this.checkout} text="Place Order" />
      </View>
    )
  }
}
