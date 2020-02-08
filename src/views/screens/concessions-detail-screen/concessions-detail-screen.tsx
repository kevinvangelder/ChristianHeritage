import * as React from "react"
import { ScrollView, View, ViewStyle, Image, ImageStyle } from "react-native"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../shared/title-bar"
import { Text } from "../../shared/text"
import { spacing } from "../../../theme"
import { NavigationActions } from "react-navigation"

const ROOT: ViewStyle = {
  width: "100%",
  flex: 1,
  paddingHorizontal: spacing[4],
  paddingBottom: spacing[3],
}
const ROW: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing[3],
  justifyContent: "space-between",
}
const COLUMN: ViewStyle = {
  flex: 1,
  flexDirection: "column",
}
const IMAGE_WRAPPER: ViewStyle = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  maxHeight: 180,
  marginBottom: spacing[2],
}
const IMAGE: ImageStyle = {
  width: 120,
  resizeMode: "contain",
  maxHeight: 150,
}

export class ConcessionsDetailScreen extends React.Component<{}, {}> {
  render() {
    return (
      <Screen preset="fixed">
        <TitleBar
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
          title="Concessions"
        />
        <ScrollView style={ROOT}>
          <Text preset="header">K.C. Deez BBQ</Text>
          <View style={ROW}>
            <View style={COLUMN}>
              <Text>– BBQ Sandwiches</Text>
              <Text>– Ribs</Text>
              <Text>– Burnt Ends</Text>
              <Text>– Sausage Sliders</Text>
              <Text>– Beef Brisket</Text>
              <Text>– Pulled Pork</Text>
              <Text>– Turkey</Text>
            </View>
            <View style={COLUMN}>
              <Text>– Chicken Trays</Text>
              <Text>– Wangz</Text>
              <Text>– Rib Tips</Text>
              <Text>– BBQ Beans</Text>
              <Text>– Coleslaw</Text>
              <Text>– Drinks</Text>
            </View>
            <View style={IMAGE_WRAPPER}>
              <Image source={require("./kcdeezbbq.png")} style={IMAGE} />
            </View>
          </View>
          <Text preset="header">La Riviera Maya</Text>
          <View style={ROW}>
            <View style={COLUMN}>
              <Text>– Torta Cubana</Text>
              <Text>– Fish Tacos</Text>
              <Text>– Tamales, Mulitas</Text>
              <Text>– Torta, Quesadilla</Text>
              <Text>– Chimichanga</Text>
              <Text>– Maya’s Chips</Text>
              <Text>– Taco Salad</Text>
              <Text>– Sopes Homemade Flan</Text>
              <Text>– Vanilla Cake</Text>
              <Text>– Churros</Text>
              <Text>– Fresa Con Cremea Cake</Text>
              <Text>– Pan Dulce</Text>
              <Text>– Drinks</Text>
            </View>
            <View style={IMAGE_WRAPPER}>
              <Image source={require("./larivieramaya.png")} style={IMAGE} />
            </View>
          </View>
          <Text preset="header">CH Healthy Eats & Treats</Text>
          <View style={ROW}>
            <View>
              <Text>– Juices</Text>
              <Text>– Smoothies</Text>
              <Text>– Waters</Text>
              <Text>– Granola Bars</Text>
              <Text>– Jerky</Text>
              <Text>– Crackers</Text>
              <Text>– Fruits</Text>
            </View>
            <View>
              <Text>– Vegetables</Text>
              <Text>– Protein</Text>
              <Text>– Pretzels</Text>
              <Text>– Fruit Leather</Text>
              <Text>– Trail Mix</Text>
              <Text>– & MUCH more!</Text>
            </View>
            <View style={IMAGE_WRAPPER}>
              <Image source={require("./cheatsandtreats.png")} style={IMAGE} />
            </View>
          </View>
        </ScrollView>
      </Screen>
    )
  }
}
