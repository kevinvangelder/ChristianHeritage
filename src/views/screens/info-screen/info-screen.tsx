import * as React from "react"
import {
  View,
  ViewStyle,
  Image,
  Linking,
  TextStyle,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"
import { spacing } from "../../../theme/spacing"
import { palette } from "../../../theme/palette"
import { color } from "../../../theme"
import { Button } from "../../shared/button"

export interface InfoScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: spacing[4],
  paddingBottom: spacing[2],
}
const CENTER: ViewStyle = {
  alignItems: "center",
  paddingVertical: spacing[3],
}
const LINK: TextStyle = {
  color: palette.bahamaBlue,
  textDecorationLine: "underline",
  fontWeight: "bold",
  paddingHorizontal: spacing[2],
}
const PARAGRAPH: TextStyle = {
  marginBottom: spacing[3],
}
const ITALICS: TextStyle = {
  fontStyle: "italic",
}

const FACEBOOK_URL = "https://www.facebook.com/christianheritagehomeeducators"
const WEBSITE_URL = "https://www.christianheritagewa.org/"
const IGNITE_URL = "https://infinite.red/ignite"

export class InfoScreen extends React.Component<InfoScreenProps, {}> {
  render() {
    return (
      <Screen preset="scrollStack" style={ROOT}>
        <Image
          source={require("./CH-logo-wide.jpg")}
          style={{ alignSelf: "center", resizeMode: "contain", maxWidth: "100%", maxHeight: 90 }}
        />
        <View style={[CENTER, { flexDirection: "row", justifyContent: "center", paddingTop: 0 }]}>
          <Text
            preset="default"
            text="Website"
            onPress={() => Linking.openURL(WEBSITE_URL)}
            style={LINK}
          />
          <Text text=" | " />
          <Text
            preset="default"
            text="Facebook"
            onPress={() => Linking.openURL(FACEBOOK_URL)}
            style={LINK}
          />
        </View>
        <Image
          source={require("./spring-2019.png")}
          style={{ alignSelf: "center", resizeMode: "contain", maxWidth: "100%", maxHeight: 280 }}
        />
        <Text style={{ ...PARAGRAPH, ...ITALICS }}>
          Teaching purposefully, living righteously, to Build a Godly Legacy (Titus 2:12)
        </Text>
        <Text style={PARAGRAPH}>
          Welcome to the 14th annual Christian Heritage Family Discipleship and Homeschooling
          Conference! We are so excited you are here with us and pray you are encouraged and blessed
          by what you learn and experience. The focus this year is on teaching purposefully, living
          righteously, to build a godly legacy. (Titus 2:12) We hope you will be transformed by the
          Word of God taught by the many wonderful speakers and leaders here with us! May God richly
          bless you and your family these next few days!
        </Text>
        <Text>~ The Christian Heritage Board</Text>
        <View
          style={{
            paddingTop: spacing[6],
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View>
            <Text text="Application Development" style={{ color: color.palette.mediumGrey }} />
            <Text text="by Kevin VanGelder" style={{ color: color.palette.mediumGrey }} />
          </View>
          <View style={{ flexDirection: "row", marginTop: -spacing[1] }}>
            <Text
              text="Built with"
              style={{ color: color.palette.mediumGrey, marginTop: spacing[3] + spacing[1] }}
            />
            <View style={[CENTER, { flexDirection: "row", justifyContent: "center" }]}>
              <TouchableOpacity onPress={() => Linking.openURL(IGNITE_URL)}>
                <Image
                  source={require("./ignite.png")}
                  style={{ width: 60, height: 32, marginHorizontal: spacing[2], maxHeight: 32 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Button
          onPress={() => this.props.navigation.push("authentication", { next: "tabs" })}
          text="Continue"
        />
      </Screen>
    )
  }
}
