import * as React from "react"
import { FlatList, View, Text } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TimeSlot } from "./time-slot"
import { TitleBar } from "../../../views/shared/title-bar"
const data = require("../../../models/data.json")
const moment = require("moment")

export interface ScheduleScreenProps extends NavigationScreenProps<{}> {}

export class ScheduleScreen extends React.Component<ScheduleScreenProps, {}> {
  static navigationOptions = {
    headerTitle: <TitleBar />,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedDay: moment().day() === 6 ? "saturday" : "friday",
    }
  }

  onPress = (item, timeSlotActivities) => {
    this.props.navigation.navigate("scheduleDetail", { item, timeSlotActivities, title: item.name })
  }

  renderTimeSlot = ({ item }: any) => {
    const { selectedDay } = this.state
    const timeSlotActivities = data[selectedDay].activities[item.id]
    return (
      <TimeSlot
        timeSlot={item}
        timeSlotActivities={timeSlotActivities}
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
        <FlatList
          data={dayTimeSlots}
          extraData={this.state}
          renderItem={this.renderTimeSlot}
          keyExtractor={(item, index) => `${selectedDay}-${item.id}`}
          style={{ width: "100%" }}
        />
      </Screen>
    )
  }
}
