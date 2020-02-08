import * as React from "react"
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native"
import { Text } from "../../shared/text"
import { NavigationScreenProps, NavigationActions } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"
import { spacing } from "../../../theme/spacing"
import { palette } from "../../../theme/palette"
import { Button } from "../../shared/button"
import { inject, observer } from "mobx-react"
import { CartStore } from "../../../models/cart-store"
import { UserStore } from "../../../models/user-store"
import { RecordingStore } from "../../../models/recording-store"
import { color } from "../../../theme"

export interface ScheduleDetailScreenProps extends NavigationScreenProps<{}> {
  cartStore: CartStore
  userStore: UserStore
  recordingStore: RecordingStore
}
const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[3],
  width: "100%",
}
const TITLE: TextStyle = {
  marginBottom: spacing[3],
}
const KEYNOTE_WRAPPER: TextStyle = {
  flexDirection: "row",
}
const KEYNOTE_CONTENT: TextStyle = {
  flexDirection: "column",
  flex: 2,
  paddingRight: spacing[1],
}
const SPEAKER: TextStyle = {
  marginBottom: spacing[1],
}
const TIME: TextStyle = {
  marginBottom: spacing[2],
}
const DESCRIPTION: TextStyle = {
  marginBottom: spacing[2],
}
const LINK: TextStyle = {
  color: color.palette.bahamaBlue,
  textDecorationLine: "underline",
}
const IMAGE_WRAPPER: ViewStyle = {
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  maxHeight: 180,
  marginBottom: spacing[2],
}
const IMAGE: ImageStyle = {
  width: 120,
  resizeMode: "contain",
  maxHeight: 200,
}

const ACTIVITY: ViewStyle = {
  borderBottomColor: palette.lightGrey,
  borderBottomWidth: 1,
  paddingVertical: spacing[3],
}

const INVISIBLE: ViewStyle = {
  height: 0,
  width: 0,
}

const DVD_BUTTON: ViewStyle = {
  marginTop: spacing[3],
}

const IMAGES = {
  "Israel and Brook Wayne": require("./Israel_and_Brook_Wayne.jpg"),
}
const BIOS = {
  "Israel and Brook Wayne":
    "Since 1995, Israel has traveled the nation speaking on family, homeschooling, revival, discipleship, and cultural issues. He is an author of many books, a contributor to several magazines, and a conference speaker who has a passion for defending the Christian faith and promoting a biblical worldview. Israel and his wife Brook, both homeschool graduates themselves, are home educating their ten children in SW Michigan.",
}

@inject("cartStore", "userStore", "recordingStore")
@observer
export class ScheduleDetailScreen extends React.Component<ScheduleDetailScreenProps, {}> {
  openBio(speakerName, bio, image) {
    this.props.navigation.push("speakerDetail", { speaker: { name: speakerName, bio, image } })
  }

  addToCart(RID) {
    this.props.cartStore.addToCart(RID)
  }

  removeFromCart(RID) {
    this.props.cartStore.removeFromCart(RID)
  }

  render() {
    return (
      <Screen preset="fixed">
        <TitleBar
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
          title={this.props.navigation.state.params.title}
        />
        {this.renderContent()}
      </Screen>
    )
  }

  renderContent = () => {
    const { title } = this.props.navigation.state.params
    if (title === "Keynote") {
      return this.renderKeynote()
    } else {
      return this.renderOther()
    }
  }

  renderKeynote = () => {
    const { timeSlotActivities, item } = this.props.navigation.state.params
    const activity = timeSlotActivities[0]
    const recording = activity.RID && this.props.recordingStore.findRecording(activity.RID)
    const dvdRecording =
      activity.DVD_RID && this.props.recordingStore.findRecording(activity.DVD_RID)
    return (
      <ScrollView style={ROOT} contentContainerStyle={{ paddingBottom: spacing[3] }}>
        <Text preset="header" text={activity.name} style={TITLE} />
        <View style={KEYNOTE_WRAPPER}>
          <View style={KEYNOTE_CONTENT}>
            <Text
              preset="subheader"
              text={activity.speaker}
              style={SPEAKER}
              onPress={() =>
                this.openBio(activity.speaker, BIOS[activity.speaker], IMAGES[activity.speaker])
              }
            />
            <Text preset="fieldLabel" text={`${item.startTime} - ${item.endTime}`} style={TIME} />
            <Text preset="default" text={activity.description} style={DESCRIPTION} />
            {/* <Text preset="default" text={BIOS[activity.speaker]} style={DESCRIPTION} /> */}
          </View>
          <TouchableOpacity
            onPress={() =>
              this.openBio(activity.speaker, BIOS[activity.speaker], IMAGES[activity.speaker])
            }
            style={IMAGE_WRAPPER}
          >
            <Image source={IMAGES[activity.speaker]} style={IMAGE} />
          </TouchableOpacity>
        </View>
        {recording && this.renderCartButton(recording)}
        {dvdRecording && this.renderDvdButton(dvdRecording)}
      </ScrollView>
    )
  }

  renderOther = () => {
    const { timeSlotActivities } = this.props.navigation.state.params
    return (
      <ScrollView style={ROOT} contentContainerStyle={{ paddingBottom: spacing[3] }}>
        {timeSlotActivities.map(activity => this.renderActivity(activity))}
      </ScrollView>
    )
  }

  renderActivity = activity => {
    const recording = activity.RID && this.props.recordingStore.findRecording(activity.RID)
    const dvdRecording =
      activity.DVD_RID && this.props.recordingStore.findRecording(activity.DVD_RID)
    return (
      <View style={ACTIVITY} key={activity.name}>
        <Text preset="subheader" text={activity.name} style={TITLE} />
        <View style={KEYNOTE_WRAPPER}>
          <View style={KEYNOTE_CONTENT}>
            {activity.speaker ? (
              <Text
                preset="default"
                text={activity.speaker}
                style={SPEAKER}
                onPress={() =>
                  this.openBio(activity.speaker, BIOS[activity.speaker], IMAGES[activity.speaker])
                }
              />
            ) : (
              <View style={INVISIBLE} />
            )}
            {activity.location ? (
              <Text preset="fieldLabel" text={activity.location} style={TIME} />
            ) : (
              <View style={INVISIBLE} />
            )}
            {activity.description ? (
              <Text preset="secondary" text={activity.description} style={DESCRIPTION} />
            ) : (
              <View style={INVISIBLE} />
            )}
            {activity.speaker && BIOS[activity.speaker].length > 0 ? (
              <Text preset="default" text={BIOS[activity.speaker]} style={DESCRIPTION} />
            ) : (
              <View style={INVISIBLE} />
            )}
            {activity.name === "Concessions" && (
              <Text onPress={() => this.props.navigation.push("concessionsDetail")} style={LINK}>
                See Menus
              </Text>
            )}
            {/* <Text preset="secondary" text={BIOS[activity.speaker]} style={DESCRIPTION} /> */}
          </View>
          <TouchableOpacity
            onPress={() =>
              this.openBio(activity.speaker, BIOS[activity.speaker], IMAGES[activity.speaker])
            }
            style={IMAGE_WRAPPER}
          >
            <Image source={IMAGES[activity.speaker]} style={IMAGE} />
          </TouchableOpacity>
        </View>
        {recording && this.renderCartButton(recording)}
        {dvdRecording && this.renderDvdButton(dvdRecording)}
      </View>
    )
  }

  renderCartButton = recording => {
    const { itemIds, setSessionIds } = this.props.cartStore.currentCart
    if (itemIds.includes(recording.RID)) {
      return (
        <Button
          text="Remove from Cart"
          preset="delete"
          onPress={() => this.removeFromCart(recording.RID)}
        />
      )
    } else if (setSessionIds.includes(recording.RID)) {
      return <Button text="Included in Set" preset="disabled" disabled />
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

  renderDvdButton = dvdRecording => {
    const { itemIds, setSessionIds } = this.props.cartStore.currentCart
    if (itemIds.includes(dvdRecording.RID)) {
      return (
        <Button
          text="Remove DVD from Cart"
          preset="delete"
          onPress={() => this.removeFromCart(dvdRecording.RID)}
          style={DVD_BUTTON}
        />
      )
    } else if (setSessionIds.includes(dvdRecording.RID)) {
      return <Button text="DVD Included in Set" preset="disabled" disabled style={DVD_BUTTON} />
    } else {
      const { purchaseHistoryIds } = this.props.userStore.currentUser
      if (purchaseHistoryIds.includes(dvdRecording.RID)) {
        return <Button text="Already Purchased" preset="disabled" disabled style={DVD_BUTTON} />
      } else {
        return (
          <Button
            text={`Add DVD to Cart - $${dvdRecording.displayPrice}`}
            onPress={() => this.addToCart(dvdRecording.RID)}
            style={DVD_BUTTON}
          />
        )
      }
    }
  }
}
