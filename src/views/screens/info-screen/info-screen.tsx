import * as React from "react"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"

export interface InfoScreenProps extends NavigationScreenProps<{}> {}

export class InfoScreen extends React.Component<InfoScreenProps, {}> {
  static navigationOptions = {
    headerTitle: <TitleBar />,
  }

  render() {
    return (
      <Screen preset="fixedCenter">
        <Text preset="header" tx="infoScreen.header" />
      </Screen>
    )
  }
}
