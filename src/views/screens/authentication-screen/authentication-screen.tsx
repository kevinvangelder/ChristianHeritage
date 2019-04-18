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
  paddingBottom: spacing[2],
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
  alignItems: "center",
}
const ERROR: TextStyle = {
  color: color.error,
  marginLeft: spacing[1],
}
const CIRCLE: ViewStyle = {
  width: spacing[7],
  height: spacing[7],
  borderRadius: spacing[5],
  backgroundColor: color.palette.endeavour,
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing[3],
}
const INITIALS: TextStyle = {
  fontSize: 24,
  color: color.background,
}
const BUTTON_MARGIN: ViewStyle = {
  marginVertical: spacing[3],
}

export interface AuthenticationScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStore
}

@inject("userStore")
@observer
export class AuthenticationScreen extends React.Component<AuthenticationScreenProps, {}> {
  firstName: any
  lastName: any
  phone: any
  address1: any
  address2: any
  city: any
  state: any
  zip: any

  checkEmail = async () => {
    if (this.props.userStore.validateEmail()) {
      await this.props.userStore.checkEmail()
    }
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
      const result = await userStore.signUp()
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
    const { emailExists, isSignedIn } = this.props.userStore.currentUser
    const checkingOut = this.props.navigation.state.params.next === "checkout"
    return (
      <Screen preset="fixedStack" style={ROOT}>
        <TitleBar
          title="Alliance Recordings"
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
        <ScrollView style={ROOT} keyboardShouldPersistTaps="always">
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
            {emailExists === null && !isSignedIn && this.renderEmailInput()}
            {emailExists && !isSignedIn && this.renderPasswordInput()}
            {emailExists === false && !isSignedIn && this.renderSignUp()}
            {!checkingOut &&
              !isSignedIn && (
                <Text
                  onPress={this.next}
                  style={{
                    ...LINK,
                    alignSelf: "center",
                    paddingHorizontal: spacing[2],
                    marginTop: spacing[2],
                  }}
                >
                  Skip for now
                </Text>
              )}
            {isSignedIn && this.renderSignedIn()}
          </View>
        </ScrollView>
      </Screen>
    )
  }

  renderEmailInput = () => {
    const { email, setEmail, emailError } = this.props.userStore.currentUser
    return (
      <View>
        <Text style={HEADER}>Enter Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          onSubmitEditing={this.checkEmail}
          returnKeyLabel="Next"
        />
        {emailError !== null && emailError.length > 0 && <Text style={ERROR}>{emailError}</Text>}
        <Button onPress={this.checkEmail} text="Next" />
      </View>
    )
  }

  renderPasswordInput = () => {
    const { email, password, setPassword } = this.props.userStore.currentUser
    return (
      <View>
        <Text style={HEADER}>Sign In</Text>
        <View style={{ ...ROW, justifyContent: "space-between" }}>
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
          onSubmitEditing={this.signIn}
          returnKeyLabel="Next"
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
      confirm,
      setConfirm,
      confirmError,
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
        <View style={{ ...ROW, justifyContent: "space-between" }}>
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
          onSubmitEditing={() => {
            this.firstName.focus()
          }}
          returnKeyLabel="Next"
        />
        {passwordError !== null &&
          passwordError.length > 0 && <Text style={ERROR}>{passwordError}</Text>}
        <TextInput
          placeholder="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          onSubmitEditing={() => {
            this.firstName.focus()
          }}
          returnKeyLabel="Next"
        />
        {confirmError !== null &&
          confirmError.length > 0 && <Text style={ERROR}>{confirmError}</Text>}
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          ref={input => (this.firstName = input)}
          onSubmitEditing={() => {
            this.lastName.focus()
          }}
          returnKeyLabel="Next"
        />
        {firstNameError !== null &&
          firstNameError.length > 0 && <Text style={ERROR}>{firstNameError}</Text>}
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          ref={input => (this.lastName = input)}
          onSubmitEditing={() => {
            this.phone.focus()
          }}
          returnKeyLabel="Next"
        />
        {lastNameError !== null &&
          lastNameError.length > 0 && <Text style={ERROR}>{lastNameError}</Text>}
        <TextInput
          placeholder="Phone (for account recovery purposes only)"
          value={phone}
          onChangeText={setPhone}
          ref={input => (this.phone = input)}
          onSubmitEditing={() => {
            this.address1.focus()
          }}
          returnKeyLabel="Next"
          keyboardType="phone-pad"
        />
        {phoneError !== null && phoneError.length > 0 && <Text style={ERROR}>{phoneError}</Text>}
        <TextInput
          placeholder="Address Line 1"
          value={address1}
          onChangeText={setAddress1}
          ref={input => (this.address1 = input)}
          onSubmitEditing={() => {
            this.address2.focus()
          }}
          returnKeyLabel="Next"
        />
        {address1Error !== null &&
          address1Error.length > 0 && <Text style={ERROR}>{address1Error}</Text>}
        <TextInput
          placeholder="Address Line 2"
          value={address2}
          onChangeText={setAddress2}
          ref={input => (this.address2 = input)}
          onSubmitEditing={() => {
            this.city.focus()
          }}
          returnKeyLabel="Next"
        />
        {address2Error !== null &&
          address2Error.length > 0 && <Text style={ERROR}>{address2Error}</Text>}
        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
          ref={input => (this.city = input)}
          onSubmitEditing={() => {
            this.state.focus()
          }}
          returnKeyLabel="Next"
        />
        {cityError !== null && cityError.length > 0 && <Text style={ERROR}>{cityError}</Text>}
        <TextInput
          placeholder="State"
          value={state}
          onChangeText={setState}
          ref={input => (this.state = input)}
          onSubmitEditing={() => {
            this.zip.focus()
          }}
          returnKeyLabel="Next"
        />
        {stateError !== null && stateError.length > 0 && <Text style={ERROR}>{stateError}</Text>}
        <TextInput
          placeholder="Zip"
          value={zip}
          onChangeText={setZip}
          ref={input => (this.zip = input)}
          onSubmitEditing={this.signUp}
          returnKeyLabel="Next"
          keyboardType="numeric"
        />
        {zipError !== null && zipError.length > 0 && <Text style={ERROR}>{zipError}</Text>}
        <Button onPress={this.signUp} text="Next" />
      </View>
    )
  }

  renderSignedIn = () => {
    const { currentUser: { initials, email, firstName, lastName }, signOut } = this.props.userStore
    return (
      <View>
        <Text style={HEADER}>Account</Text>
        <View style={ROW}>
          <View style={CIRCLE}>
            <Text style={INITIALS}>{initials}</Text>
          </View>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Text>
              {firstName} {lastName}
            </Text>
            <Text>{email}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Button preset="deleteSmall" onPress={signOut} text="Sign Out" />
          </View>
        </View>
        <Button onPress={this.next} text="Continue" style={BUTTON_MARGIN} />
      </View>
    )
  }
}
