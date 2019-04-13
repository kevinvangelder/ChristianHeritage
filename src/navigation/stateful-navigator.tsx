import * as React from "react"
import { AppState } from "react-native"
import { inject, observer } from "mobx-react"
import { addNavigationHelpers } from "react-navigation"
import { RootNavigator } from "./root-navigator"
import { NavigationStore } from "../models/navigation-store/navigation-store"
import throttle from "lodash.throttle"
import { RecordingStore } from "../models/recording-store"

interface StatefulNavigatorProps {
  navigationStore?: NavigationStore
  recordingStore?: RecordingStore
}

/**
 * How many ms should we throttle for?
 */
const THROTTLE = 500

/**
 * Additional throttle options that nobody can really remember.
 */
const THROTTLE_OPTIONS = { trailing: false }

@inject("navigationStore", "recordingStore")
@observer
export class StatefulNavigator extends React.Component<
  StatefulNavigatorProps,
  { appState: string }
> {
  constructor(props) {
    super(props)
    this.state = {
      appState: "inactive",
    }
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange)
  }

  _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
      console.tron.log("App has come to the foreground!")
      this.props.recordingStore.fetchRecordings()
    }
    this.setState({ appState: nextAppState })
  }

  render() {
    // grab our state & dispatch from our navigation store
    const { state, dispatch, addListener } = this.props.navigationStore

    // create a custom navigation implementation
    const navigation = addNavigationHelpers({
      dispatch: throttle(dispatch, THROTTLE, THROTTLE_OPTIONS),
      state,
      addListener,
    } as any) // (as any is only here until @types/react-navigation is updated)

    return <RootNavigator navigation={navigation} />
  }
}
