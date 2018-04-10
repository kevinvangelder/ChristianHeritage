import * as React from "react"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"

export interface VenueScreenProps extends NavigationScreenProps<{}> {}

export class VenueScreen extends React.Component<VenueScreenProps, {}> {
  static navigationOptions = {
    headerTitle: <TitleBar />,
  }

  render() {
    return (
      <Screen preset="fixedCenter">
        <Text preset="header" tx="venueScreen.header" />
      </Screen>
    )
  }
}
