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

// const IMAGES = {
//   "Ken Ham": "https://www.christianheritageonline.org/wp-content/uploads/2016/12/Ham_Ken_lg.png",
//   "Dr. Steve Scheibner":
//     "https://www.christianheritageonline.org/wp-content/uploads/2016/12/Scheibner_SM.png",
//   "Dr. Carlton McLeod":
//     "https://www.christianheritageonline.org/wp-content/uploads/2016/12/McLoed_Carlton_sm.png",
// }

const IMAGES = {
  "Kevin Swanson": require("./Kevin_Swanson.png"),
  "Steve Walker": require("./Steve_Walker.png"),
  "Todd Friel": require("./Todd_Friel.png"),
  "Bill Jack": require("./Bill_Jack.png"),
  "Daniel Craig": require("./Daniel_Craig.png"),
  "Dwight Cover": require("./Dwight_Cover.png"),
  "Mark Ward": require("./Mark_Ward.png"),
  "Wendy Walker": require("./Wendy_Walker.png"),
}
const BIOS = {
  "Kevin Swanson":
    "Kevin Swanson is a father, pastor, host of the international radio program Generations Radio, and Director of Generations. After holding multiple leadership positions in corporate, church, and non-profit organizations, Kevin now speaks around the world on family-based discipleship, economics, and American culture.",
  "Steve Walker":
    "Steve Walker is passionate about ministering to and encouraging parents and children to turn their hearts towards one another for the glory of God. Steve pastors a church in Central California and enjoys dating his wife, running and playing softball with his children, entertaining his eight grandchildren, and teaching families to love and serve Christ.",
  "Todd Friel":
    "Todd Friel is the host of Wretched TV and Wretched Radio (wretched.org), heard daily on stations around the country. He is also the author of: Stressed Out, Reset for Parents, Jesus Unmasked, and many more DVD projects. He lives in Atlanta with his wife and three children.",
  "Bill Jack":
    "Bill Jack is married and has three children. He is the cofounder and faculty advisor of Worldview Academy, an academic leadership program that seeks to train Christian students to think and live in accord with a biblical worldview so that they will serve Christ and lead the culture.",
  "Daniel Craig":
    "Founder of LifeLaunch.com, Daniel is passionate about home education, discipleship and worldview. As a first generation homeschool graduate, he completed his Bachelor’s Degree in Music and has pursued Seminary Studies in Philosophy and Apologetics. With this background, Daniel has a great burden for furthering the home education and discipleship vision in the next generation.",
  "Dwight Cover":
    "Dwight Cover and his wife Sherrill have homeschooled in Grandview, Washington for over twenty years. Their vision is to disciple their children to live out their calling in robust Biblical manhood and womanhood that advances the kingdom of God among all nations through multigenerational discipleship. Dwight currently serves as the teaching pastor at Household of Faith—a new work with a focus on developing young men to shoulder the mantle of spiritual leadership.",
  "Mark Ward":
    "Mark Ward, PhD, is a writer and editor at Faithlife, makers of Logos Bible Software, in Bellingham, WA. His wife and three homeschooled children live in Mount Vernon, WA. Mark is the author of Biblical Worldview: Creation, Fall, Redemption and Authorized: The Use and Misuse of the King James Bible.",
  "Wendy Walker":
    "Wendy Walker is helpmeet to Steve, mother of six, grandmother to eight, and an adoring daughter of the King. She loves discipling women and teaching them about the importance of living as women of the Word and serving Jesus faithfully. Wendy delights in exploring Creation, cooking, reading, and training up the next generation.",
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
      <ScrollView style={ROOT}>
        <Text preset="header" text={activity.name} style={TITLE} />
        <View style={KEYNOTE_WRAPPER}>
          <View style={KEYNOTE_CONTENT}>
            <Text preset="subheader" text={activity.speaker} style={SPEAKER} />
            <Text preset="fieldLabel" text={`${item.startTime} - ${item.endTime}`} style={TIME} />
            <Text preset="default" text={activity.description} style={DESCRIPTION} />
            <Text preset="default" text={BIOS[activity.speaker]} style={DESCRIPTION} />
          </View>
          <Image source={IMAGES[activity.speaker]} style={IMAGE} />
        </View>
      </ScrollView>
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
        <View style={KEYNOTE_WRAPPER}>
          <View style={KEYNOTE_CONTENT}>
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
            <Text preset="secondary" text={BIOS[activity.speaker]} style={DESCRIPTION} />
          </View>
          <Image source={IMAGES[activity.speaker]} style={IMAGE} />
        </View>
      </View>
    )
  }
}
