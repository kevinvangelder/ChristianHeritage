import * as React from "react"
import { FlatList, View, TouchableOpacity, ViewStyle } from "react-native"
import { NavigationScreenProps, NavigationActions } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TimeSlot } from "./time-slot"
import { TitleBar } from "../../shared/title-bar"
import { Text } from "../../shared/text"
import { spacing } from "../../../theme/spacing"
import { palette } from "../../../theme/palette"
const data = require("../../../models/spring-2019.json")
const moment = require("moment")

export interface ScheduleScreenProps extends NavigationScreenProps<{}> {}

const NAV_ITEM: ViewStyle = {
  flex: 1,
  width: "50%",
  padding: spacing[3],
}

export class ScheduleScreen extends React.Component<ScheduleScreenProps, { selectedDay: string }> {
  constructor(props) {
    super(props)
    let selectedDay = null
    switch (moment().day()) {
      case 4:
        selectedDay = "thursday"
        break
      case 5:
        selectedDay = "friday"
        break
      default:
        selectedDay = "saturday"
        break
    }
    this.state = {
      selectedDay,
    }
  }

  onPress = (item, timeSlotActivities) => {
    this.props.navigation.push("scheduleDetail", { item, timeSlotActivities, title: item.name })
  }

  renderTimeSlot = ({ item, index }: any) => {
    const { selectedDay } = this.state
    const timeSlotActivities = data[selectedDay].activities[item.id]
    return (
      <TimeSlot
        timeSlot={item}
        timeSlotActivities={timeSlotActivities}
        last={index === data[selectedDay].timeSlots.length - 1}
        onPress={() => {
          this.onPress(item, timeSlotActivities)
        }}
      />
    )
  }

  // renderCurrentTimeIndicator = () => {
  //   const shouldRender = true //moment().isBetween(moment().hour(08), moment().hour(20).minute(30))
  //   if (!shouldRender) return null
  //   const offset = 20
  //   return (
  //     <View style={{width: "100%", height: 1, backgroundColor: "red", position: "absolute", top: offset}} />
  //   )
  // }

  render() {
    const { selectedDay } = this.state
    const dayTimeSlots = data[selectedDay].timeSlots
    return (
      <Screen preset="fixed">
        {/* {this.renderCurrentTimeIndicator} */}
        <TitleBar
          title="Schedule"
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
        <FlatList
          data={dayTimeSlots}
          extraData={this.state}
          renderItem={this.renderTimeSlot}
          keyExtractor={(item, index) => `${selectedDay}-${item.id}`}
          style={{ width: "100%" }}
        />
        <View
          style={{ flexDirection: "row", borderTopWidth: 1, borderTopColor: palette.lightGrey }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ selectedDay: "thursday" })}
            style={[NAV_ITEM, selectedDay === "thursday" && { backgroundColor: palette.shipCove }]}
          >
            <Text
              text="Thursday"
              style={{
                textAlign: "center",
                color: selectedDay === "thursday" ? palette.white : palette.darkGrey,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ selectedDay: "friday" })}
            style={[
              NAV_ITEM,
              { borderLeftWidth: 1, borderLeftColor: palette.lightGrey },
              selectedDay === "friday" && { backgroundColor: palette.shipCove },
            ]}
          >
            <Text
              text="Friday"
              style={{
                textAlign: "center",
                color: selectedDay === "friday" ? palette.white : palette.darkGrey,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ selectedDay: "saturday" })}
            style={[
              NAV_ITEM,
              { borderLeftWidth: 1, borderLeftColor: palette.lightGrey },
              selectedDay === "saturday" && { backgroundColor: palette.shipCove },
            ]}
          >
            <Text
              text="Saturday"
              style={{
                textAlign: "center",
                color: selectedDay === "saturday" ? palette.white : palette.darkGrey,
              }}
            />
          </TouchableOpacity>
        </View>
      </Screen>
    )
  }
}
