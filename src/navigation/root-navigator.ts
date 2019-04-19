import { StackNavigator, TabNavigator } from "react-navigation"
import { ScheduleScreen } from "../views/screens/schedule-screen"
import { ScheduleDetailScreen } from "../views/screens/schedule-detail-screen"
import { VenueScreen } from "../views/screens/venue-screen"
import { InfoScreen } from "../views/screens/info-screen"
import { TabBar } from "../views/shared/tab-bar"
import { WebViewScreen } from "../views/screens/webview-screen"

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
        venue: StackNavigator(
          {
            venue: { screen: VenueScreen },
            webview: { screen: WebViewScreen },
          },
          {
            headerMode: "none",
            navigationOptions: { gesturesEnabled: true },
          },
        ),
        info: { screen: InfoScreen },
      },
      {
        initialRouteName: "info",
        tabBarPosition: "bottom",
        tabBarComponent: TabBar,
        order: ["info", "schedule", "venue"],
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
    initialRouteName: "tabs",
  },
)
