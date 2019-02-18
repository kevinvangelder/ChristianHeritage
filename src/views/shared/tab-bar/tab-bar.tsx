import * as React from "react"
import { View, Image, ViewStyle, TouchableOpacity, SafeAreaView } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Text } from "../../shared/text"
import { palette } from "../../../theme/palette"

export interface TabBarProps extends NavigationScreenProps<{}> {}
const SAFE_AREA: ViewStyle = {
  backgroundColor: palette.endeavour,
}

const CONTAINER: ViewStyle = {
  backgroundColor: palette.endeavour40,
  flexDirection: "row",
  justifyContent: "center",
  minHeight: 49,
}
const TAB: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-end",
  flexDirection: "column",
}

const ICON_WRAPPER: ViewStyle = {
  alignItems: "center",
  flexGrow: 1,
  justifyContent: "center",
}

const ACTIVE_INDICATOR: ViewStyle = {
  position: "absolute",
  bottom: 0,
  height: 4,
  width: "100%",
  backgroundColor: palette.shipCove,
}

export const Tab = ({
  activeTintColor,
  inactiveTintColor,
  navigation,
  position,
  renderIcon,
  route,
  index,
  inputRange,
}) => {
  const isActive = index === navigation.state.index
  let text = ""
  switch (route.routeName) {
    case "schedule":
      text = "Schedule"
      break
    case "venue":
      text = "Venue"
      break
    case "info":
      text = "Info"
      break
    case "recordings":
      text = "Recordings"
      break
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate(route.routeName)} style={TAB}>
      <View style={ICON_WRAPPER}>
        <Text text={text} style={{ color: palette.white }} />
        {isActive && <View style={ACTIVE_INDICATOR} />}
      </View>
    </TouchableOpacity>
  )
}

export const TabBar = props => {
  const { routes } = props.navigation.state
  const inputRange = [-1, ...routes.map((x, i) => i)]

  return (
    <SafeAreaView style={SAFE_AREA}>
      <View style={CONTAINER}>
        <Image
          source={require("../title-bar/header_bg_blue.jpg")}
          style={{ position: "absolute", height: 50, resizeMode: "cover", maxWidth: "100%" }}
        />
        {routes.map((route, index) => {
          const tabProps = { ...props, route, index, inputRange, key: route.routeName }
          return <Tab {...tabProps} />
        })}
      </View>
    </SafeAreaView>
  )
}
