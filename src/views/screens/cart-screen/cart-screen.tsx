import * as React from "react"
import { View, ViewStyle, TextStyle, ScrollView, Alert } from "react-native"
import { NavigationScreenProps, NavigationActions } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../shared/title-bar"
import { Text } from "../../shared/text"
import { spacing } from "../../../theme/spacing"
import { color } from "../../../theme"
import { inject, observer } from "mobx-react"
import { UserStore } from "../../../models/user-store"
import { Button } from "../../shared/button"
import { CartStore } from "../../../models/cart-store"
import { getSpeakerNames } from "../../../lib/utils"
import { RecordingStore } from "../../../models/recording-store"

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing[4],
  paddingBottom: spacing[3],
}

const SECTION: ViewStyle = {
  flex: 1,
  marginTop: spacing[5],
}
const HEADING: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
}
const LINK: TextStyle = {
  color: color.palette.bahamaBlue,
  textDecorationLine: "underline",
}
const EMPTY: TextStyle = {
  textAlign: "center",
  maxWidth: "75%",
  alignSelf: "center",
  fontStyle: "italic",
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
const ITEM_PRICE: ViewStyle = {
  alignItems: "flex-end",
  flexDirection: "column",
  marginLeft: spacing[2],
}
const ITEM_TITLE: TextStyle = {
  fontWeight: "bold",
}
const ITEM_SPEAKER: TextStyle = {
  fontStyle: "italic",
  fontWeight: "normal",
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

export interface CartScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStore
  cartStore: CartStore
  recordingStore: RecordingStore
}

@inject("userStore", "cartStore", "recordingStore")
@observer
export class CartScreen extends React.Component<CartScreenProps, {}> {
  checkout = () => {
    if (!this.props.userStore.currentUser.isSignedIn) {
      this.props.navigation.push("authentication", { next: "checkout" })
    } else {
      this.props.navigation.push("checkout")
    }
  }

  removeItem = RID => {
    Alert.alert("Confirm", "Are you sure you wish to remove this item from your cart?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          this.props.cartStore.removeFromCart(RID)
        },
      },
    ])
  }

  render() {
    const { currentUser: { isSignedIn } } = this.props.userStore
    return (
      <Screen preset="fixed">
        <TitleBar
          title="Cart"
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
        <ScrollView style={ROOT} contentContainerStyle={{ width: "100%" }}>
          {!isSignedIn && this.renderSignIn()}
          {isSignedIn && this.renderSignedIn()}
          <View style={SECTION}>
            <Text style={HEADING}>Set Info</Text>
            <Text style={DISCLAIMER} />
          </View>
          {this.renderCart()}
          <Text style={DISCLAIMER}>
            Items you have previously purchased will be automatically removed from your cart.
          </Text>
          {isSignedIn && this.renderPurchaseHistory()}
        </ScrollView>
      </Screen>
    )
  }

  renderSignIn = () => {
    return (
      <View>
        <Text style={HEADING}>Alliance Recording Account</Text>
        <Text>Sign in to sync your cart to your account or complete your order.</Text>
        <Button
          onPress={() => this.props.navigation.push("authentication", { next: "cart" })}
          text="Sign In"
        />
      </View>
    )
  }

  renderSignedIn = () => {
    const { currentUser: { email }, signOut } = this.props.userStore
    return (
      <View>
        <Text style={HEADING}>Alliance Recording Account</Text>
        <Text>
          Currently signed in: {email} (<Text style={LINK} onPress={signOut}>
            Sign Out
          </Text>)
        </Text>
      </View>
    )
  }

  renderCart = () => {
    const { currentCart: { isEmpty, items } } = this.props.cartStore
    return (
      <View style={SECTION}>
        <Text style={HEADING}>Cart</Text>
        {isEmpty && <Text style={EMPTY}>Cart is empty.</Text>}
        {isEmpty && (
          <Text style={EMPTY}>Add individual sessions from the schedule or add the set above.</Text>
        )}
        {!isEmpty && items.map(i => this.renderCartItem(i))}
        {!isEmpty && this.renderSubtotal()}
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
        <View style={ITEM_PRICE}>
          <Text>${item.PRICE}.00</Text>
          <Button onPress={() => this.removeItem(item.RID)} preset="deleteSmall" text="Remove" />
        </View>
      </View>
    )
  }

  renderSubtotal = () => {
    const { currentCart: { localSubtotal } } = this.props.cartStore
    return (
      <View style={TOTAL}>
        <Text style={SUBTOTAL}>Total: ${localSubtotal}.00</Text>
        <Button onPress={this.checkout} text="Check Out" />
      </View>
    )
  }

  renderPurchaseHistory = () => {
    const { purchaseHistory } = this.props.userStore.currentUser
    const keys = Object.keys(purchaseHistory)
    return (
      <View style={SECTION}>
        <Text style={HEADING}>Purchase History</Text>
        <Text style={DISCLAIMER}>
          Purchased recordings can be downloaded through the Alliance Recordings website (check your
          emailed receipt for a direct link).
        </Text>
        {keys && keys.length > 0 && keys.map(k => this.renderPurchasedItem(k))}
      </View>
    )
  }

  renderPurchasedItem = key => {
    const item = this.props.recordingStore.findRecording(key)
    return (
      <View key={item.RECID} style={CART_ITEM}>
        <View style={ITEM_DETAILS}>
          <Text style={ITEM_TITLE} numberOfLines={0}>
            {item.TITLE}
          </Text>
          <Text style={ITEM_SPEAKER}>{getSpeakerNames(item)}</Text>
        </View>
      </View>
    )
  }
}
