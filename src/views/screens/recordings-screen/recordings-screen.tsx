import * as React from "react"
import {
  View,
  ViewStyle,
  Image,
  Linking,
  TextStyle,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"
import { spacing } from "../../../theme/spacing"
import { palette } from "../../../theme/palette"
import { color } from "../../../theme"

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing[4],
  paddingBottom: spacing[3],
}

export interface RecordingsScreenProps extends NavigationScreenProps<{}> {}

export class RecordingsScreen extends React.Component<RecordingsScreenProps, {}> {
  render() {
    return (
      <Screen preset="fixed">
        <TitleBar title="Recordings" />
        <ScrollView style={ROOT} contentContainerStyle={{ width: "100%" }} />
      </Screen>
    )
  }
}
