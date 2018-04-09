import * as React from "react"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"

export interface ScheduleDetailScreenProps extends NavigationScreenProps<{}> {}

export class ScheduleDetailScreen extends React.Component<ScheduleDetailScreenProps, {}> {
  static navigationOptions = {
    headerTitle: <TitleBar />,
  }

  render() {
    return (
      <Screen preset="fixed">
        <Text
          preset="header"
          text={this.props.navigation.state.params.timeSlotActivities[0].name}
        />
      </Screen>
    )
  }
}
