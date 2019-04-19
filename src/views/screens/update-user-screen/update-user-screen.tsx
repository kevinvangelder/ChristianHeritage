import * as React from "react"
import { ScrollView, View, ViewStyle, TextInput, TextStyle } from "react-native"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../shared/title-bar"
import { Text } from "../../shared/text"
import { spacing, color } from "../../../theme"
import { NavigationActions } from "react-navigation"
import { inject, observer } from "mobx-react"
import { UserStore } from "../../../models/user-store"
import { Button } from "../../shared/button"

const ROOT: ViewStyle = {
  width: "100%",
  flex: 1,
  paddingHorizontal: spacing[4],
  paddingBottom: spacing[3],
}
const ROW: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing[3],
  justifyContent: "space-between",
}

const BOLD: TextStyle = {
  fontWeight: "bold",
}
const ERROR: TextStyle = {
  color: color.error,
  marginLeft: spacing[1],
}

@inject("userStore")
@observer
export class UpdateUserScreen extends React.Component<{ userStore: UserStore }, {}> {
  firstName: any
  lastName: any
  phone: any
  address1: any
  address2: any
  city: any
  state: any
  zip: any
  scrollview: any

  constructor(props) {
    super(props)
    this.state = {
      passwordError: null,
    }
  }

  submit = async () => {
    this.setState({ passwordError: null })
    const { userStore, navigation } = this.props
    if (userStore.validateUpdateUser()) {
      const result = await userStore.updateUser()
      if (result) {
        navigation.dispatch(NavigationActions.back())
      } else {
        this.setState({ passwordError: "The email and password do not match." })
        this.scrollview.scrollTo({ x: 0, y: 0, animated: true })
      }
    } else {
      this.scrollview.scrollTo({ x: 0, y: 0, animated: true })
    }
  }

  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
    } = this.props.userStore.currentUser
    const {
      passwordError,
      firstNameError,
      lastNameError,
      phoneError,
      address1Error,
      cityError,
      stateError,
      zipError,
    } = this.props.userStore.currentUser
    const {
      setPassword,
      setFirstName,
      setLastName,
      setPhone,
      setAddress1,
      setAddress2,
      setCity,
      setState,
      setZip,
    } = this.props.userStore.currentUser
    return (
      <Screen preset="fixed">
        <TitleBar
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
          title="Update Address"
        />
        <ScrollView
          style={ROOT}
          keyboardShouldPersistTaps="handled"
          ref={scrollview => (this.scrollview = scrollview)}
        >
          <View style={{ ...ROW, justifyContent: "space-between" }}>
            <Text>
              <Text style={BOLD}>Email: </Text>
              {email}
            </Text>
          </View>
          <TextInput
            placeholder="Current Password"
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
            onSubmitEditing={this.submit}
            returnKeyLabel="Next"
            keyboardType="numeric"
          />
          {zipError !== null && zipError.length > 0 && <Text style={ERROR}>{zipError}</Text>}
          <Button onPress={this.submit} text="Finish" />
        </ScrollView>
      </Screen>
    )
  }
}
