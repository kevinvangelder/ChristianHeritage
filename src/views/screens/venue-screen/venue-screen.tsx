import * as React from "react"
import { Image, View, ImageStyle, TextStyle, ViewStyle, ScrollView } from "react-native"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"
import { spacing } from "../../../theme/spacing"

export interface VenueScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  flex: 1,
  padding: spacing[2],
}
const TEXT: TextStyle = {
  marginBottom: spacing[3],
  textAlign: "center",
}
const IMAGE: ImageStyle = {
  flex: 1,
  resizeMode: "contain",
  maxWidth: "100%",
  maxHeight: "200%",
  marginBottom: spacing[5],
}

export class VenueScreen extends React.Component<VenueScreenProps, {}> {
  static navigationOptions = {
    headerTitle: <TitleBar />,
  }

  render() {
    return (
      <Screen preset="fixed" style={ROOT}>
        <ScrollView>
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
