import * as React from "react"
import { View, ScrollView, ViewStyle, Image, ImageStyle, TextStyle } from "react-native"
import { observer, inject } from "mobx-react"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../shared/title-bar"
import { spacing } from "../../../theme"
import { Text } from "../../shared/text"
import { NavigationActions } from "react-navigation"

const ROOT: ViewStyle = {
  width: "100%",
  flex: 1,
  paddingHorizontal: spacing[4],
  paddingBottom: spacing[3],
}
const HEADING: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  paddingBottom: spacing[2],
}
const IMAGE_WRAPPER: ViewStyle = {
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  maxHeight: 180,
  marginBottom: spacing[2],
}
const IMAGE: ImageStyle = {
  width: 120,
  resizeMode: "contain",
  maxHeight: 200,
}

@inject("userStore", "cartStore", "recordingStore")
@observer
export class SpeakerDetailScreen extends React.Component<{}, {}> {
  render() {
    const { speaker } = this.props.navigation.state.params
    return (
      <Screen preset="fixed">
        <TitleBar
          title="Speaker Details"
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
        <ScrollView
          style={ROOT}
          contentContainerStyle={{ width: "100%", paddingVertical: spacing[3] }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 2, flexDirection: "column", paddingRight: spacing[2] }}>
              <Text style={HEADING}>{speaker.name}</Text>
              <Text preset="secondary">{speaker.bio}</Text>
            </View>
            <View style={IMAGE_WRAPPER}>
              <Image source={speaker.image} style={IMAGE} />
            </View>
          </View>
        </ScrollView>
      </Screen>
    )
  }
}
