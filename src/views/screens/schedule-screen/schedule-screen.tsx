import * as React from "react"
import { Text } from "../../shared/text"
import { Button } from "../../shared/button"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"

export interface ScheduleScreenProps extends NavigationScreenProps<{}> {}

export class ScheduleScreen extends React.Component<ScheduleScreenProps, {}> {
  nextScreen = () => this.props.navigation.navigate("info")

  render() {
    return (
      <Screen preset="fixedCenter">
        <Text preset="header" tx="scheduleScreen.header" />
        <Button tx="scheduleScreen.nextScreenButton" onPress={this.nextScreen} />
      </Screen>
    )
  }
}
