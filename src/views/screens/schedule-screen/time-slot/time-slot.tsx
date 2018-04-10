import * as React from "react"
import { TouchableOpacity, View } from "react-native"
import { TimeSlotProps } from "./time-slot.props"
import { Text } from "../../../shared/text"
import { palette } from "../../../../theme/palette"
const moment = require("moment")

export class TimeSlot extends React.Component<TimeSlotProps, {}> {
  render() {
    const { timeSlot, timeSlotActivities = [], onPress } = this.props
    const keynoteSummary =
      timeSlot.name === "Keynote"
        ? `${(timeSlotActivities[0] || {}).speaker}: ${(timeSlotActivities[0] || {}).name}`
        : null
    const summary =
      timeSlotActivities.length <= 3
        ? timeSlotActivities.map(activity => activity.name).join(", ")
        : `${timeSlotActivities.length} Workshops`
    const height = timeSlot.duration / 15 * 20 // 20 pixels tall per 15 minutes
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: palette.lightGrey }}
      >
        <View
          style={{ flexDirection: "column", justifyContent: "space-between", padding: 5, height }}
        >
          <Text preset="secondary" text={timeSlot.startTime} />
          {timeSlot.id === 9 && <Text preset="secondary" text={timeSlot.endTime} />}
        </View>
        <View style={{ flexDirection: "column", padding: 5, flex: 1, height }}>
          <Text preset="header" text={timeSlot.name} />
          <Text preset="fieldLabel" text={keynoteSummary || summary} />
        </View>
      </TouchableOpacity>
    )
  }
}
