import * as React from "react"
import { View, ScrollView, ViewStyle, TextStyle } from "react-native"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../shared/title-bar"
import { spacing } from "../../../theme"
import { Text } from "../../shared/text"
import { NavigationActions } from "react-navigation"
import { Button } from "../../shared/button"
import { inject, observer } from "mobx-react"
import { CartStore } from "../../../models/cart-store"
import { RecordingStore } from "../../../models/recording-store"
import { UserStore } from "../../../models/user-store"

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing[4],
  paddingBottom: spacing[3],
}
const HEADING: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  paddingBottom: spacing[2],
}
const PARAGRAPH: TextStyle = {
  paddingBottom: spacing[2],
}
const BOLD: TextStyle = {
  fontWeight: "bold",
  paddingBottom: spacing[2],
}
const SESSION_TITLE: TextStyle = {
  fontSize: 12,
  paddingBottom: spacing[1],
}

@inject("cartStore", "recordingStore", "userStore")
@observer
export class SetDetailScreen extends React.Component<
  {
    cartStore: CartStore
    recordingStore: RecordingStore
    userStore: UserStore,
  },
  {}
> {
  addToCart(RID) {
    this.props.cartStore.addToCart(RID)
  }

  removeFromCart(RID) {
    this.props.cartStore.removeFromCart(RID)
  }

  render() {
    const { set } = this.props.navigation.state.params
    const recording = this.props.recordingStore.findRecording(set.RID)
    const cleanedDescription = set.DESCRIPTION.replace(
      "###Please Ensure you provide complete Postal mailing address in your account to prevent complications during fulfillment.###",
      "",
    )
    const isDVD = set.TITLE.includes("DVD")
    return (
      <Screen preset="fixed">
        <TitleBar
          title="Set Details"
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
        <ScrollView
          style={ROOT}
          contentContainerStyle={{ width: "100%", paddingVertical: spacing[3] }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={HEADING}>{set.TITLE}</Text>
          <Text style={PARAGRAPH}>{cleanedDescription}</Text>
          {isDVD && (
            <Text style={BOLD}>
              Please Ensure you provide complete Postal mailing address in your account to prevent
              complications during fulfillment.
            </Text>
          )}
          {this.renderCartButton(recording)}
          <Text style={{ marginVertical: spacing[2] }}>Included Sessions:</Text>
          {set.SESSIONS.map(session => (
            <Text key={session.RID} style={SESSION_TITLE}>
              - {session.TITLE}
            </Text>
          ))}
        </ScrollView>
      </Screen>
    )
  }

  renderCartButton = recording => {
    const { itemIds } = this.props.cartStore.currentCart
    if (itemIds.includes(recording.RID)) {
      return (
        <Button
          text="Remove from Cart"
          preset="delete"
          onPress={() => this.removeFromCart(recording.RID)}
        />
      )
    } else {
      const { purchaseHistoryIds } = this.props.userStore.currentUser
      if (purchaseHistoryIds.includes(recording.RID)) {
        return <Button text="Already Purchased" preset="disabled" disabled />
      } else {
        return (
          <Button
            text={`Add to Cart - $${recording.displayPrice}`}
            onPress={() => this.addToCart(recording.RID)}
          />
        )
      }
    }
  }
}
