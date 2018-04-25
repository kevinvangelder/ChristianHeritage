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

export interface InfoScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingBottom: spacing[3],
}
const CENTER: ViewStyle = {
  alignItems: "center",
  paddingVertical: spacing[3],
}
const LINK: TextStyle = {
  color: palette.bahamaBlue,
  textDecorationLine: "underline",
}
const CTA: ViewStyle = {
  flex: 1,
  backgroundColor: palette.endeavour40,
  padding: spacing[2],
  borderColor: palette.bahamaBlue,
  borderWidth: 1,
  borderRadius: spacing[3],
  flexDirection: "column",
  marginTop: spacing[2],
}

const CTA_HEADER: TextStyle = {
  color: palette.bahamaBlue,
  fontWeight: "500",
}
const PADDED_TEXT: TextStyle = {
  paddingVertical: spacing[2],
}

const FACEBOOK_URL = "https://www.facebook.com/christianheritagehomeeducators"
const WEBSITE_URL = "https://www.christianheritageonline.org/"
const MISSION_URL = "https://www.christianheritageonline.org/about/our-mission/"
const IGNITE_URL = "https://infinite.red/ignite"

export class InfoScreen extends React.Component<InfoScreenProps, {}> {
  render() {
    return (
      <Screen preset="fixed">
        <TitleBar title="Info" />
        <ScrollView style={ROOT}>
          <Image
            source={require("./christian_heritage_logo.png")}
            style={{ alignSelf: "center" }}
          />
          <View style={[CENTER, { flexDirection: "row", justifyContent: "center" }]}>
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
          <TouchableOpacity style={[CENTER, CTA]} onPress={() => Linking.openURL(MISSION_URL)}>
            <Text preset="default" text="Mission" style={CTA_HEADER} />
            <Text
              preset="default"
              text="Christian Heritage equips parents to Biblically disciple and educate their children. Christian Heritage accomplishes this through events, instruction, training, resources, and support."
              style={PADDED_TEXT}
            />
            <Text text="Learn More" style={LINK} />
          </TouchableOpacity>
          <View style={[CENTER, { marginTop: spacing[5] }]}>
            <Text
              text="Application Development By"
              style={{ fontWeight: "500", textAlign: "center" }}
            />
            <Text text="Kevin VanGelder" style={{ textAlign: "center" }} />
          </View>
          <View style={CENTER}>
            <Text text="Built with" style={{ fontWeight: "500" }} />
            <View style={[CENTER, { flexDirection: "row", justifyContent: "center" }]}>
              <TouchableOpacity onPress={() => Linking.openURL(IGNITE_URL)}>
                <Image
                  source={require("./ignite.png")}
                  style={{ width: 110, height: 60, marginHorizontal: spacing[3] }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Screen>
    )
  }
}
