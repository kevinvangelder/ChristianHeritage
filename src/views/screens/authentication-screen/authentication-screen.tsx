import * as React from "react"
import {
  View,
  ViewStyle,
  Image,
  Linking,
  TextStyle,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native"
import { Text } from "../../shared/text"
import { NavigationScreenProps, NavigationActions } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"
import { color, spacing } from "../../../theme"
import { Button } from "../../shared/button"
import { inject, observer } from "mobx-react"
import { UserStore } from "../../../models/user-store"

export interface AuthenticationScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStore
}

const ROOT: ViewStyle = {
  flexGrow: 1,
}
const CONTENT: ViewStyle = {
  padding: spacing[2],
}
const NOTICE: TextStyle = {
  marginTop: spacing[2],
  fontStyle: "italic",
}
const LINK: TextStyle = {
  color: color.palette.bahamaBlue,
  textDecorationLine: "underline",
  fontWeight: "bold",
  paddingHorizontal: spacing[2],
  marginTop: spacing[2],
  alignSelf: "center",
}
const HEADER: TextStyle = {
  fontWeight: "bold",
  textAlign: "center",
  marginTop: spacing[5],
}
@inject("userStore")
@observer
export class AuthenticationScreen extends React.Component<AuthenticationScreenProps, {}> {
  checkEmail = async () => {
    await this.props.userStore.checkEmail()
  }
  signIn = async () => {
    await this.props.userStore.signIn
  }
  signUp = async () => {
    await this.props.userStore.signUp
  }

  render() {
    const { emailExists } = this.props.userStore.currentUser
    return (
      <View style={ROOT}>
        <TitleBar
          title="Alliance Recordings"
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
        <Screen preset="scrollStack" style={ROOT}>
          <View style={CONTENT}>
            <Text>
              Session recordings are now available for purchase through the app and website via
              Alliance Recordings. For the best experience, we recommend you log in or sign up so
              that your cart will sync to your other devices, but you can always come back to do
              this later.
            </Text>
            <Text style={NOTICE}>
              Please note, your Alliance Recording account is separate from your Christian Heritage
              account.
            </Text>
            {emailExists === null && this.renderEmailInput()}
            {emailExists && this.renderPasswordInput()}
            {emailExists === false && this.renderSignUp()}
            <Text onPress={() => this.props.navigation.push("tabs")} style={LINK}>
              Skip
            </Text>
          </View>
        </Screen>
      </View>
    )
  }

  renderEmailInput = () => {
    const { email, setEmail } = this.props.userStore.currentUser
    return (
      <View>
        <Text style={HEADER}>Enter Email</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <Button onPress={this.checkEmail} text="Next" />
      </View>
    )
  }

  renderPasswordInput = () => {
    const { password, setPassword } = this.props.userStore.currentUser
    return (
      <View>
        <Text style={HEADER}>Sign In</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button onPress={this.signIn} text="Next" />
      </View>
    )
  }

  renderSignUp = () => {
    const {
      password,
      setPassword,
      phone,
      setPhone,
      address1,
      setAddress1,
      address2,
      setAddress2,
      city,
      setCity,
      state,
      setState,
      zip,
      setZip,
    } = this.props.userStore.currentUser
    return (
      <View>
        <Text style={HEADER}>Sign Up</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
        <TextInput placeholder="Address Line 1" value={address1} onChangeText={setAddress1} />
        <TextInput placeholder="Address Line 2" value={address2} onChangeText={setAddress2} />
        <TextInput placeholder="City" value={city} onChangeText={setCity} />
        <TextInput placeholder="State" value={state} onChangeText={setState} />
        <TextInput placeholder="Zip" value={zip} onChangeText={setZip} />
        <Button onPress={this.signUp} text="Next" />
      </View>
    )
  }
}
