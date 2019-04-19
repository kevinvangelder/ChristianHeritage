import * as React from "react"
import {
  Image,
  View,
  ImageStyle,
  TextStyle,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native"
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
  maxHeight: "150%",
  marginBottom: -spacing[8],
  marginTop: -spacing[8] - spacing[5],
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
          style={{ width: "100%", maxWidth: "100%", padding: spacing[2] }}
          contentContainerStyle={{ maxWidth: "100%" }}
        >
          <Image source={require("./leavenworth.png")} style={LOGO} />
          <View style={GRID_ROW}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.push("webview", {
                  url: "https://leavenworth.org/shopping/",
                  title: "Shopping",
                })
              }
              style={GRID}
            >
              <Image source={require("./leavenworth-shopping.png")} style={GRID_IMAGE} />
              <Text style={{ ...TEXT, ...LINK }}>Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.push("webview", {
                  url: "https://leavenworth.org/dining/",
                  title: "Dining",
                })
              }
              style={GRID}
            >
              <Image source={require("./leavenworth-dining.png")} style={GRID_IMAGE} />
              <Text style={{ ...TEXT, ...LINK }}>Dining</Text>
            </TouchableOpacity>
          </View>
          <View style={GRID_ROW}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.push("webview", {
                  url: "https://leavenworth.org/attractions/",
                  title: "Attractions",
                })
              }
              style={GRID}
            >
              <Image source={require("./leavenworth-activities.png")} style={GRID_IMAGE} />
              <Text style={{ ...TEXT, ...LINK }}>Attractions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.push("webview", {
                  url: "https://leavenworth.org/recreation/",
                  title: "Recreation",
                })
              }
              style={GRID}
            >
              <Image source={require("./leavenworth-recreation.png")} style={GRID_IMAGE} />
              <Text style={{ ...TEXT, ...LINK }}>Recreation</Text>
            </TouchableOpacity>
          </View>
          {/* <Image source={require("./ocean-shores.png")} style={IMAGE} /> */}
          {/* <Text preset="header" text="First Floor" style={TEXT} />
          <Image source={require("./floor-1.png")} style={IMAGE} />
          <Text preset="header" text="Second Floor" style={TEXT} />
          <Image source={require("./floor-2.png")} style={IMAGE} />
          <Text preset="header" text="Third Floor" style={TEXT} />
          <Image source={require("./floor-3.png")} style={IMAGE} /> */}
        </ScrollView>
      </Screen>
    )
  }
}
