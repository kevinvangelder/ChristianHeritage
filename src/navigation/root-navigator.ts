import { StackNavigator, TabNavigator } from "react-navigation"
import { ScheduleScreen } from "../views/screens/schedule-screen"
import { VenueScreen } from "../views/screens/venue-screen"
import { InfoScreen } from "../views/screens/info-screen"

export const RootNavigator = StackNavigator(
  {
    tabs: TabNavigator({
      schedule: { screen: ScheduleScreen },
      venue: { screen: VenueScreen },
      info: { screen: InfoScreen },
    }, {

    })
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
    initialRouteName: "tabs",
  },
)
