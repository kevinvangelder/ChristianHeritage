import { StackNavigator, TabNavigator } from "react-navigation"
import { ScheduleScreen } from "../views/screens/schedule-screen"
import { ScheduleDetailScreen } from "../views/screens/schedule-detail-screen"
import { SpeakerDetailScreen } from "../views/screens/speaker-detail-screen"
import { ConcessionsDetailScreen } from "../views/screens/concessions-detail-screen"
import { VenueScreen } from "../views/screens/venue-screen"
import { InfoScreen } from "../views/screens/info-screen"
import { AuthenticationScreen } from "../views/screens/authentication-screen"
import { CartScreen } from "../views/screens/cart-screen"
import { SetDetailScreen } from "../views/screens/set-detail-screen"
import { TabBar } from "../views/shared/tab-bar"
import { CheckoutScreen } from "../views/screens/checkout-screen"
import { FinalizeOrderScreen } from "../views/screens/finalize-order-screen"
import { UpdateUserScreen } from "../views/screens/update-user-screen"
import { WebViewScreen } from "../views/screens/webview-screen"

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
            speakerDetail: { screen: SpeakerDetailScreen },
            concessionsDetail: { screen: ConcessionsDetailScreen },
          },
          {
            headerMode: "none",
            navigationOptions: { gesturesEnabled: true },
          },
        ),
        venueTab: StackNavigator(
          {
            venue: { screen: VenueScreen },
            webview: { screen: WebViewScreen },
          },
          {
            headerMode: "none",
            navigationOptions: { gesturesEnabled: true },
          },
        ),
        cart: StackNavigator(
          {
            cart: { screen: CartScreen },
            setDetail: { screen: SetDetailScreen },
            authentication: { screen: AuthenticationScreen },
            checkout: { screen: CheckoutScreen },
            finalizeOrder: { screen: FinalizeOrderScreen },
            updateUser: { screen: UpdateUserScreen },
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
        order: ["schedule", "venueTab", "cart"],
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
