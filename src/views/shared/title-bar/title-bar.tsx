import * as React from "react"
import { View, Image } from "react-native"
import { Text } from "../../shared/text"
import { palette } from "../../../theme/palette"
const backgroundImage = require("./header_bg_blue.jpg")
const logo = require("./christian_heritage_logo.png")

export class TitleBar extends React.Component<{}, {}> {
  render() {
    return (
      <View>
        <Image source={backgroundImage} style={{ height: 76 }} />
        <Image
          source={logo}
          style={{ height: 50, width: 50, position: "absolute", top: 10, left: 45 }}
        />
      </View>
    )
  }
}
