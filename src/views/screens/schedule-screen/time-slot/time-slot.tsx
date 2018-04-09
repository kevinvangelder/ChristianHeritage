import * as React from "react"
import { TouchableOpacity, View } from "react-native"
import { TimeSlotProps } from "./time-slot.props"
import { Text } from "../../../shared/text"
const moment = require("moment")

export class TimeSlot extends React.Component<TimeSlotProps, {}> {
  render() {
    const { timeSlot, timeSlotActivities, onPress } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column", padding: 5, height: 75 }}>
          <Text preset="secondary" text={timeSlot.startTime} />
          <Text preset="secondary" text={timeSlot.endTime} style={{ alignSelf: "flex-end" }} />
        </View>
        <View style={{ flexDirection: "column", padding: 5 }}>
          <Text preset="header" text={timeSlot.name} />
          <Text
            preset="fieldLabel"
            text={(timeSlotActivities || []).map(activity => activity.name).join(", ")}
          />
        </View>
      </TouchableOpacity>
    )
  }
}
