import { StackNavigator, TabNavigator } from "react-navigation"
import { ScheduleScreen } from "../views/screens/schedule-screen"
import { ScheduleDetailScreen } from "../views/screens/schedule-detail-screen"
import { VenueScreen } from "../views/screens/venue-screen"
import { InfoScreen } from "../views/screens/info-screen"
import { RecordingsScreen } from "../views/screens/recordings-screen"
import { TabBar } from "../views/shared/tab-bar"

export const RootNavigator = StackNavigator(
  {
    welcome: { screen: InfoScreen },
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
        recordings: { screen: RecordingsScreen },
      },
      {
        initialRouteName: "schedule",
        tabBarPosition: "bottom",
        tabBarComponent: TabBar,
        order: ["schedule", "venue", "recordings"],
        backBehavior: "none",
      },
    ),
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      headerStyle: {
        elevation: 0,
        shadowRadius: 0,
        paddingTop: 0,
      },
    },
    initialRouteName: "welcome",
  },
)
