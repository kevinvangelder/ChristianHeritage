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

export interface InfoScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  flex: 1,
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
      <Screen preset="fixed">
        <TitleBar title="Info" />
        <ScrollView style={ROOT} contentContainerStyle={{ width: "100%" }}>
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
            Hebrews 13:4 Let marriage be held in honor among all..
          </Text>
          <Text style={PARAGRAPH}>
            These days marriage is certainly not held in honor among many! All around us we see the
            devastation, pain and heartbreak of broken marriage vows. We see the systematic attempts
            to dismantle the sanctity of marriage and the redefining of it. The enemy knows how
            foundational this institution is and has been working to destroy what God has
            established as Holy.
          </Text>
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
        </ScrollView>
      </Screen>
    )
  }
}
