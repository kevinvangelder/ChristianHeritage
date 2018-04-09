import { StackNavigator, TabNavigator } from "react-navigation"
import { ScheduleScreen } from "../views/screens/schedule-screen"
import { ScheduleDetailScreen } from "../views/screens/schedule-detail-screen"
import { VenueScreen } from "../views/screens/venue-screen"
import { InfoScreen } from "../views/screens/info-screen"

export const RootNavigator = StackNavigator(
  {
    tabs: TabNavigator(
      {
        schedule: StackNavigator(
          {
            scheduleOverview: { screen: ScheduleScreen },
            scheduleDetail: { screen: ScheduleDetailScreen },
          },
          {
            headerMode: "none",
            navigationOptions: { gesturesEnabled: true },
          },
        ),
        venue: { screen: VenueScreen },
        info: { screen: InfoScreen },
      },
      {
        tabBarPosition: "bottom",
      },
    ),
  },
  {
    navigationOptions: { gesturesEnabled: false },
    initialRouteName: "tabs",
  },
)
