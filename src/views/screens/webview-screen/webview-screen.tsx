import * as React from "react"
import { WebView, View } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { TitleBar } from "../../shared/title-bar"
import { Screen } from "../../shared/screen"

export interface WebViewScreenProps extends NavigationScreenProps<{}> {}

export class WebViewScreen extends React.Component<WebViewScreenProps, {}> {
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <TitleBar
          back
          onPress={this.props.navigation.popToTop}
          title={this.props.navigation.state.params.title}
        />
        <WebView
          source={{ uri: this.props.navigation.state.params.url }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    )
  }
}
