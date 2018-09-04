import * as React from "react"
import { View, Image, SafeAreaView } from "react-native"
import { Text } from "../../shared/text"
import { NavButton } from "../../shared/nav-button"
const backgroundImage = require("./header_bg_blue.jpg")
// const logo = require("./christian_heritage_logo.png")

export const TitleBar = props => {
  const { title, back, onPress } = props
  return (
    <SafeAreaView style={{ height: 50 }}>
      <View style={{ position: "absolute", top: 0 }}>
        <Image source={backgroundImage} style={{ height: 50 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        {title && (
          <Text
            text={title}
            style={{ color: "white", marginTop: 15, textAlign: "center", flex: 1 }}
          />
        )}
      </View>
      {back && onPress && <NavButton onPress={onPress} />}
    </SafeAreaView>
  )
}
