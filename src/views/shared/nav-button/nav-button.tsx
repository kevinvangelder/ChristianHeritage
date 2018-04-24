import * as React from "react"
import { TouchableOpacity, View, Image } from "react-native"
import { NavigationScreenProps } from "react-navigation"
const back = require("./back.png")

export interface NavButtonProps extends NavigationScreenProps<{}> {
  onPress: any
}

export class NavButton extends React.Component<NavButtonProps, {}> {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{ paddingVertical: 16, paddingHorizontal: 10 }}
      >
        <Image source={back} />
      </TouchableOpacity>
    )
  }
}
