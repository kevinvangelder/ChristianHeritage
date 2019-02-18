import * as React from "react"
import { Image, View, ImageStyle, TextStyle, ViewStyle, ScrollView } from "react-native"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"
import { spacing } from "../../../theme/"
import { palette } from "../../../theme/palette"

export interface VenueScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  flex: 1,
}
const TEXT: TextStyle = {
  marginBottom: spacing[3],
  textAlign: "center",
}
const IMAGE: ImageStyle = {
  flex: 1,
  resizeMode: "contain",
  maxWidth: "100%",
  maxHeight: "180%",
  // marginBottom: -spacing[8],
  // marginTop: -spacing[8] - spacing[5],
}
const GRID_ROW: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  justifyContent: "center",
  alignItems: "flex-start",
  maxHeight: 200,
}
const GRID: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
const LOGO: ImageStyle = {
  maxWidth: "80%",
  maxHeight: 150,
  alignSelf: "center",
}
const GRID_IMAGE: ImageStyle = {
  maxWidth: 150,
  maxHeight: 150,
}
const LINK: TextStyle = {
  color: palette.bahamaBlue,
  marginTop: spacing[1],
}

export class VenueScreen extends React.Component<VenueScreenProps, {}> {
  render() {
    return (
      <Screen preset="fixed" style={ROOT}>
        <TitleBar title="Venue" />
        <ScrollView
          style={{ flex: 1, padding: spacing[2] }}
          contentContainerStyle={{ maxWidth: "100%" }}
        >
          {/* <Image source={require("./ocean-shores.png")} style={IMAGE} /> */}
          <Text preset="header" text="First Floor" style={TEXT} />
          <Image source={require("./floor-1.png")} style={IMAGE} />
          <Text preset="header" text="Second Floor" style={TEXT} />
          <Image source={require("./floor-2.png")} style={IMAGE} />
          <Text preset="header" text="Third Floor" style={TEXT} />
          <Image source={require("./floor-3.png")} style={IMAGE} />
        </ScrollView>
      </Screen>
    )
  }
}
