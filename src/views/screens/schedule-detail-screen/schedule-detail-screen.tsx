import * as React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, ScrollView } from "react-native"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"
import { spacing } from "../../../theme/spacing"
import { palette } from "../../../theme/palette"

export interface ScheduleDetailScreenProps extends NavigationScreenProps<{}> {}

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

const IMAGE: ImageStyle = {
  width: 120,
  resizeMode: "contain",
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

const IMAGES = {
  "Ken Ham": "https://www.christianheritageonline.org/wp-content/uploads/2016/12/Ham_Ken_lg.png",
  "Dr. Steve Scheibner":
    "https://www.christianheritageonline.org/wp-content/uploads/2016/12/Scheibner_SM.png",
  "Dr. Carlton McLeod":
    "https://www.christianheritageonline.org/wp-content/uploads/2016/12/McLoed_Carlton_sm.png",
}

export class ScheduleDetailScreen extends React.Component<ScheduleDetailScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: TitleBar,
  })

  render() {
    return (
      <Screen preset="fixed">
        <TitleBar
          back
          onPress={this.props.navigation.popToTop}
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
    return (
      <View style={ROOT}>
        <Text preset="header" text={activity.name} style={TITLE} />
        <View style={KEYNOTE_WRAPPER}>
          <View style={KEYNOTE_CONTENT}>
            <Text preset="subheader" text={activity.speaker} style={SPEAKER} />
            <Text preset="fieldLabel" text={`${item.startTime} - ${item.endTime}`} style={TIME} />
            <Text preset="default" text={activity.description} style={DESCRIPTION} />
          </View>
          <Image source={{ uri: IMAGES[activity.speaker] }} style={IMAGE} />
        </View>
      </View>
    )
  }

  renderOther = () => {
    const { timeSlotActivities } = this.props.navigation.state.params
    return (
      <ScrollView style={ROOT}>
        {timeSlotActivities.map(activity => this.renderActivity(activity))}
      </ScrollView>
    )
  }

  renderActivity = activity => {
    return (
      <View style={ACTIVITY} key={activity.name}>
        <Text preset="subheader" text={activity.name} style={TITLE} />
        {activity.speaker ? (
          <Text preset="default" text={activity.speaker} style={SPEAKER} />
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
      </View>
    )
  }
}
