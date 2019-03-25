import * as React from "react"
import { View } from "react-native"
import { NavigationScreenProps, NavigationActions } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../shared/title-bar"
import { Text } from "../../shared/text"
import { inject, observer } from "mobx-react"
import { UserStore } from "../../../models/user-store"
import { CartStore } from "../../../models/cart-store"

export interface FinalizeOrderScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStore
  cartStore: CartStore
}

@inject("userStore", "cartStore")
@observer
export class FinalizeOrderScreen extends React.Component<FinalizeOrderScreenProps, {}> {
  render() {
    return (
      <Screen preset="fixed">
        <TitleBar
          title="Place Order"
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
      </Screen>
    )
  }
}
