import { StackNavigator, TabNavigator } from "react-navigation"
import { ScheduleScreen } from "../views/screens/schedule-screen"
import { ScheduleDetailScreen } from "../views/screens/schedule-detail-screen"
import { VenueScreen } from "../views/screens/venue-screen"
import { InfoScreen } from "../views/screens/info-screen"
import { AuthenticationScreen } from "../views/screens/authentication-screen"
import { CartScreen } from "../views/screens/cart-screen"
import { TabBar } from "../views/shared/tab-bar"
import { CheckoutScreen } from "../views/screens/checkout-screen"
import { FinalizeOrderScreen } from "../views/screens/finalize-order-screen"

export const RootNavigator = StackNavigator(
  {
    welcome: { screen: InfoScreen },
    authentication: { screen: AuthenticationScreen },
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
        cart: StackNavigator(
          {
            cart: { screen: CartScreen },
            authentication: { screen: AuthenticationScreen },
            checkout: { screen: CheckoutScreen },
            finalizeOrder: { screen: FinalizeOrderScreen },
          },
          {
            headerMode: "none",
            navigationOptions: { gesturesEnabled: true },
          },
        ),
      },
      {
        initialRouteName: "schedule",
        tabBarPosition: "bottom",
        tabBarComponent: TabBar,
        order: ["schedule", "venue", "cart"],
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
