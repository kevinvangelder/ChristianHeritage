import * as React from "react"
import { FlatList, Text } from "react-native"
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
    this.props.navigation.navigate("scheduleDetail", { item, timeSlotActivities })
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

  render() {
    const { selectedDay } = this.state
    const dayTimeSlots = data[selectedDay].timeSlots
    return (
      <Screen preset="fixed">
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
