import * as React from "react"
import { View, Image } from "react-native"
import { observer } from "mobx-react"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../shared/text"
import { NavButton } from "../../shared/nav-button"
const backgroundImage = require("./header_bg_blue.jpg")
const logo = require("./christian_heritage_logo.png")

export interface TitleBarProps extends NavigationScreenProps<{}> {}

@observer
export class TitleBar extends React.Component<TitleBarProps, {}> {
  render() {
    const { title } = this.props
    return (
      <View>
        <Image source={backgroundImage} style={{ height: 76 }} />
        <NavButton onPress={this.props.goBack} />
        {title && <Text text={title} style={{ position: "absolute", top: 11, left: 75 }} />}
      </View>
    )
  }
}
