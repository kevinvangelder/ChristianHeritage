import * as React from "react"
import { View, Image } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../shared/text"
import { palette } from "../../../theme/palette"
const backgroundImage = require("./header_bg_blue.jpg")
const logo = require("./christian_heritage_logo.png")

export interface TitleBarProps extends NavigationScreenProps<{}> {}

export class TitleBar extends React.Component<TitleBar, {}> {
  render() {
    return (
      <View>
        <Image source={backgroundImage} style={{ height: 76 }} />
        <Image
          source={logo}
          style={{ height: 50, width: 57, position: "absolute", top: 11, left: 45 }}
        />
      </View>
    )
  }
}
