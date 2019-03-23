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
  marginBottom: spacing[2],
}
const BOLD: TextStyle = {
  fontWeight: "bold",
}
const ROW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
const ERROR: TextStyle = {
  color: color.error,
  marginLeft: spacing[1],
}

export interface AuthenticationScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStore
}

@inject("userStore")
@observer
export class AuthenticationScreen extends React.Component<AuthenticationScreenProps, {}> {
  checkEmail = async () => {
    await this.props.userStore.checkEmail()
  }
  signIn = async () => {
    const { next } = this.props.navigation.state.params
    const result = await this.props.userStore.signIn()
    if (result) {
      this.props.navigation.push(next ? next : "tabs")
    }
  }
  signUp = async () => {
    const { userStore, navigation } = this.props
    if (userStore.validateSignUp()) {
      const { next } = navigation.state.params
      const result = await userStore.signUp
      if (result) {
        navigation.push(next ? next : "tabs")
      }
    }
  }

  changeEmail = () => {
    this.props.userStore.resetEmailExists()
  }

  next = () => {
    const { next } = this.props.navigation.state.params
    if (next === "cart") {
      this.props.navigation.dispatch(NavigationActions.back())
    } else {
      this.props.navigation.push(next ? next : "tabs")
    }
  }

  render() {
    const { emailExists } = this.props.userStore.currentUser
    const checkingOut = this.props.navigation.state.params.next === "checkout"
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
            {!checkingOut && (
              <Text onPress={this.next} style={LINK}>
                Skip
              </Text>
            )}
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
    const { email, password, setPassword } = this.props.userStore.currentUser
    return (
      <View>
        <Text style={HEADER}>Sign In</Text>
        <View style={ROW}>
          <Text>
            <Text style={BOLD}>Email: </Text>
            {email}
          </Text>
          <Button onPress={this.changeEmail} text="Edit" preset="primarySmall" />
        </View>
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
      email,
      password,
      setPassword,
      passwordError,
      firstName,
      setFirstName,
      firstNameError,
      lastName,
      setLastName,
      lastNameError,
      phone,
      setPhone,
      phoneError,
      address1,
      setAddress1,
      address1Error,
      address2,
      setAddress2,
      address2Error,
      city,
      setCity,
      cityError,
      state,
      setState,
      stateError,
      zip,
      setZip,
      zipError,
    } = this.props.userStore.currentUser
    return (
      <View>
        <Text style={HEADER}>Sign Up</Text>
        <View style={ROW}>
          <Text>
            <Text style={BOLD}>Email: </Text>
            {email}
          </Text>
          <Button onPress={this.changeEmail} text="Edit" preset="primarySmall" />
        </View>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError !== null &&
          passwordError.length > 0 && <Text style={ERROR}>{passwordError}</Text>}
        <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} />
        {firstNameError !== null &&
          firstNameError.length > 0 && <Text style={ERROR}>{firstNameError}</Text>}
        <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} />
        {lastNameError !== null &&
          lastNameError.length > 0 && <Text style={ERROR}>{lastNameError}</Text>}
        <TextInput
          placeholder="Phone (for account recovery purposes only)"
          value={phone}
          onChangeText={setPhone}
        />
        {phoneError !== null && phoneError.length > 0 && <Text style={ERROR}>{phoneError}</Text>}
        <TextInput placeholder="Address Line 1" value={address1} onChangeText={setAddress1} />
        {address1Error !== null &&
          address1Error.length > 0 && <Text style={ERROR}>{address1Error}</Text>}
        <TextInput placeholder="Address Line 2" value={address2} onChangeText={setAddress2} />
        {address2Error !== null &&
          address2Error.length > 0 && <Text style={ERROR}>{address2Error}</Text>}
        <TextInput placeholder="City" value={city} onChangeText={setCity} />
        {cityError !== null && cityError.length > 0 && <Text style={ERROR}>{cityError}</Text>}
        <TextInput placeholder="State" value={state} onChangeText={setState} />
        {stateError !== null && stateError.length > 0 && <Text style={ERROR}>{stateError}</Text>}
        <TextInput placeholder="Zip" value={zip} onChangeText={setZip} />
        {zipError !== null && zipError.length > 0 && <Text style={ERROR}>{zipError}</Text>}
        <Button onPress={this.signUp} text="Next" />
      </View>
    )
  }
}
