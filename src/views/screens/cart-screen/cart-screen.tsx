import * as React from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from "react-native"
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
import { FakeRecordingModel } from "../../../models/recording"

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
const ROW: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing[3],
}
const CIRCLE: ViewStyle = {
  width: spacing[7],
  height: spacing[7],
  borderRadius: spacing[5],
  backgroundColor: color.palette.endeavour,
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing[3],
}
const INITIALS: TextStyle = {
  fontSize: 24,
  color: color.background,
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
const SET_DETAIL: TextStyle = {
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

  removeOtherItem = RID => {
    console.tron.log(`remove ${RID}`)
    Alert.alert("Confirm", "Are you sure you wish to remove this item from your cart?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          console.tron.log(`removing ${RID}`)
          this.props.cartStore.removeOtherFromCart(RID)
        },
      },
    ])
  }

  render() {
    const { currentUser: { isSignedIn } } = this.props.userStore
    const sets = this.props.recordingStore.getSets
    // const { currentCart: { setIds } } = this.props.cartStore
    return (
      <Screen preset="fixed">
        <TitleBar
          title="Cart"
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
        <ScrollView
          style={ROOT}
          contentContainerStyle={{ width: "100%", paddingVertical: spacing[3] }}
        >
          {!isSignedIn && this.renderSignIn()}
          {isSignedIn && this.renderSignedIn()}
          {sets && sets.length > 0 && this.renderSets(sets)}
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
    const { currentUser: { email, initials, firstName, lastName }, signOut } = this.props.userStore
    return (
      <View>
        <Text style={HEADING}>Alliance Recording Account</Text>
        <View style={ROW}>
          <View style={CIRCLE}>
            <Text style={INITIALS}>{initials}</Text>
          </View>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Text>
              {firstName} {lastName}
            </Text>
            <Text>{email}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Button preset="deleteSmall" onPress={signOut} text="Sign Out" />
          </View>
        </View>
      </View>
    )
  }

  renderSets = sets => {
    if (sets.length === 1 && this.props.cartStore.findCartItem(sets[0].RID)) return null
    return (
      <View style={SECTION}>
        <Text style={HEADING}>Conference Sets</Text>
        {sets.map(set => this.renderSet(set))}
        <Text style={DISCLAIMER} />
      </View>
    )
  }

  renderSet = set => {
    const setInCart = this.props.cartStore.findCartItem(set.RID)
    if (setInCart) return null
    const detailString = set.SESSIONS.map(i => i.TITLE).join("\n- ")
    return (
      <View key={set.RECID} style={CART_ITEM}>
        <TouchableWithoutFeedback
          style={ITEM_DETAILS}
          onPress={() => Alert.alert("Items in Set", detailString)}
        >
          <View>
            <Text style={ITEM_TITLE}>{set.TITLE}</Text>
            {/* <Text style={ITEM_SPEAKER}>{set.DESCRIPTION}</Text> */}
            <Text style={LINK}>See Details</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={ITEM_PRICE}>
          <Text>${set.displayPrice}</Text>
          <Button
            onPress={() => this.props.cartStore.addToCart(set.RID)}
            preset="primarySmall"
            text="Add to Cart"
          />
        </View>
      </View>
    )
  }

  renderCart = () => {
    const { currentCart: { isEmpty, items, otherItems } } = this.props.cartStore
    return (
      <View style={SECTION}>
        <Text style={HEADING}>Cart</Text>
        {isEmpty && <Text style={EMPTY}>Cart is empty.</Text>}
        {isEmpty && (
          <Text style={EMPTY}>Add individual sessions from the schedule or add a set above.</Text>
        )}
        {!isEmpty && items.map(i => this.renderCartItem(i))}
        {otherItems && otherItems.map(i => this.renderOtherItem(i))}
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
          {!item.SET && <Text style={ITEM_SPEAKER}>{getSpeakerNames(item)}</Text>}
          {item.SET && <Text style={ITEM_SPEAKER}>{item.DESCRIPTION}</Text>}
        </View>
        <View style={ITEM_PRICE}>
          <Text>${item.displayPrice}</Text>
          <Button onPress={() => this.removeItem(item.RID)} preset="deleteSmall" text="Remove" />
        </View>
      </View>
    )
  }

  renderOtherItem = item => {
    return (
      <View key={item.recID} style={CART_ITEM}>
        <View style={ITEM_DETAILS}>
          <Text style={ITEM_TITLE} numberOfLines={0}>
            {item.title}
          </Text>
        </View>
        <View style={ITEM_PRICE}>
          <Text>${item.displayPrice}</Text>
          <Button
            onPress={() => this.removeOtherItem(item.rid)}
            preset="deleteSmall"
            text="Remove"
          />
        </View>
      </View>
    )
  }

  renderSubtotal = () => {
    const { currentCart: { localSubtotal } } = this.props.cartStore
    return (
      <View style={TOTAL}>
        <Text style={SUBTOTAL}>Total: ${localSubtotal}</Text>
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
