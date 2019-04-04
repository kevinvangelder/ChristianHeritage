import * as React from "react"
import { View, ViewStyle, TextInput, ScrollView, TextStyle, Alert } from "react-native"
import { NavigationScreenProps, NavigationActions } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../shared/title-bar"
import { Text } from "../../shared/text"
import { inject, observer } from "mobx-react"
import { UserStore } from "../../../models/user-store"
import { CartStore } from "../../../models/cart-store"
import { spacing, color } from "../../../theme"
import { validate } from "../../../lib/validate"
import { Button } from "../../shared/button"
import { cardRules } from "../../../models/cart-store/validate"
import RNAuthorizeNet from "react-native-authorize-net-acceptsdk"

// Sandbox
const LOGIN_ID = "76m2skPQr"
const CLIENT_KEY = "7f4FUD6SRR8Dw634qYpJaSh65WVUNaJvmhjh8wcCxDF69EhUcg5pyffPJ2jV6293"

// Live
// const LOGIN_ID = "98g2AB6aE7"
// const CLIENT_KEY = "2seKtumJAGK8fuH6qpBgS2k9DkK45aqa5TtnJ94Wg6H9AkXHeHJ28g7sHH9w5B8F"

const CONTAINER: ViewStyle = {
  padding: spacing[2],
}
const ROW: ViewStyle = {
  flexDirection: "row",
}
const COLUMN: ViewStyle = {
  flex: 1,
  flexDirection: "column",
}
const ERROR: TextStyle = {
  color: color.error,
  marginLeft: spacing[1],
  fontSize: 14,
}
const DISCLAIMER: TextStyle = {
  marginTop: spacing[3],
  fontSize: 12,
  textAlign: "center",
}
const CARD: ViewStyle = {
  padding: spacing[2],
  borderColor: color.line,
  backgroundColor: color.dim,
  flexDirection: "row",
  borderRadius: 4,
  borderWidth: 1,
  marginVertical: spacing[3],
  alignItems: "center",
}

export interface CheckoutScreenProps extends NavigationScreenProps<{}> {
  userStore: UserStore
  cartStore: CartStore
}

@inject("userStore", "cartStore")
@observer
export class CheckoutScreen extends React.Component<
  CheckoutScreenProps,
  {
    ACCOUNT_HOLDER_NAME: string | null
    ACCOUNT_HOLDER_NAME_ERROR: string | null
    CARD_NO: string | null
    CARD_NO_ERROR: string | null
    cardNumberDisplay: string | null
    EXPIRATION_MONTH: string | null
    EXPIRATION_MONTH_ERROR: string | null
    EXPIRATION_YEAR: string | null
    EXPIRATION_YEAR_ERROR: string | null
    CVV_NO: string | null
    CVV_NO_ERROR: string | null
    ZIP_CODE: string | null
    ZIP_CODE_ERROR: string | null,
  }
> {
  constructor(props) {
    super(props)
    this.state = {
      ACCOUNT_HOLDER_NAME: null,
      ACCOUNT_HOLDER_NAME_ERROR: null,
      CARD_NO: null,
      CARD_NO_ERROR: null,
      cardNumberDisplay: null,
      EXPIRATION_MONTH: null,
      EXPIRATION_MONTH_ERROR: null,
      EXPIRATION_YEAR: null,
      EXPIRATION_YEAR_ERROR: null,
      CVV_NO: null,
      CVV_NO_ERROR: null,
      ZIP_CODE: null,
      ZIP_CODE_ERROR: null,
    }
  }
  setCardName = value => {
    this.setState({ ACCOUNT_HOLDER_NAME: value })
  }
  setCardNumber = value => {
    this.setState({ CARD_NO: value, cardNumberDisplay: value })
  }
  cardNumberFocus = () => {
    this.setState({ cardNumberDisplay: this.state.CARD_NO })
  }
  cardNumberBlur = () => {
    if (this.state.CARD_NO && this.state.CARD_NO.length === 16) {
      const hidden = this.state.CARD_NO.slice(0, -4).replace(/\d/g, "●")
      const display = `${hidden}${this.state.CARD_NO.slice(-4)}`
      this.setState({ cardNumberDisplay: display })
    }
  }
  setExpirationMonth = value => {
    this.setState({ EXPIRATION_MONTH: value })
  }
  setExpirationYear = value => {
    this.setState({ EXPIRATION_YEAR: value })
  }
  setCvv = value => {
    this.setState({ CVV_NO: value })
  }
  setZipCode = value => {
    this.setState({ ZIP_CODE: value })
  }
  submit = () => {
    const result = validate(cardRules, this.state)
    if (!result || Object.keys(result).length === 0) {
      const {
        ACCOUNT_HOLDER_NAME,
        CARD_NO,
        EXPIRATION_MONTH,
        EXPIRATION_YEAR,
        CVV_NO,
        ZIP_CODE,
      } = this.state
      const card = {
        ACCOUNT_HOLDER_NAME,
        CARD_NO,
        EXPIRATION_MONTH,
        EXPIRATION_YEAR,
        CVV_NO,
        ZIP_CODE,
        LOGIN_ID,
        CLIENT_KEY,
      }
      RNAuthorizeNet.getTokenWithRequestForCard(card, false, (status, response) => {
        // console.tron.log({status, response})
        if (status) {
          const { setLastFour, setToken, setExpiration } = this.props.cartStore.currentCart
          setLastFour(CARD_NO.slice(-4))
          setExpiration(`${EXPIRATION_MONTH}/20${EXPIRATION_YEAR}`)
          setToken(response.DATA_VALUE)
          this.props.navigation.push("finalizeOrder")
        } else {
          Alert.alert("Error", "Error validating card. Please check your entries and try again.")
        }
      })
    } else {
      const {
        ACCOUNT_HOLDER_NAME,
        CARD_NO,
        EXPIRATION_MONTH,
        EXPIRATION_YEAR,
        CVV_NO,
        ZIP_CODE,
      } = result
      this.setState({
        ACCOUNT_HOLDER_NAME_ERROR: ACCOUNT_HOLDER_NAME && ACCOUNT_HOLDER_NAME[0],
        CARD_NO_ERROR: CARD_NO && CARD_NO[0],
        EXPIRATION_MONTH_ERROR: EXPIRATION_MONTH && EXPIRATION_MONTH[0],
        EXPIRATION_YEAR_ERROR: EXPIRATION_YEAR && EXPIRATION_YEAR[0],
        CVV_NO_ERROR: CVV_NO && CVV_NO[0],
        ZIP_CODE_ERROR: ZIP_CODE && ZIP_CODE[0],
      })
    }
  }

  continue = () => {
    const { token, lastFour, expiration, resetCard } = this.props.cartStore.currentCart
    if (token && lastFour && expiration) {
      this.props.navigation.push("finalizeOrder")
    } else {
      resetCard()
    }
  }

  render() {
    const { token, lastFour, expiration } = this.props.cartStore.currentCart
    return (
      <Screen preset="fixedStack">
        <TitleBar
          title="Check Out"
          back
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
        <ScrollView style={CONTAINER} keyboardShouldPersistTaps="handled">
          {token && lastFour && expiration && this.renderExistingCard()}
          {(!token || !lastFour || !expiration) && this.renderForm()}
          <Text style={DISCLAIMER}>
            You will have a chance to review your order before submitting.
          </Text>
        </ScrollView>
      </Screen>
    )
  }

  renderExistingCard = () => {
    const { lastFour, expiration, resetCard } = this.props.cartStore.currentCart
    return (
      <View>
        <View style={CARD}>
          <View style={COLUMN}>
            <Text>Card ending in {lastFour}</Text>
            <Text>Exp: {expiration}</Text>
          </View>
          <Button onPress={resetCard} preset="deleteSmall" text="Remove" />
        </View>
        <Button onPress={this.continue} text="Continue" />
      </View>
    )
  }

  renderForm = () => {
    const {
      ACCOUNT_HOLDER_NAME,
      ACCOUNT_HOLDER_NAME_ERROR,
      cardNumberDisplay,
      CARD_NO_ERROR,
      EXPIRATION_MONTH,
      EXPIRATION_MONTH_ERROR,
      EXPIRATION_YEAR,
      EXPIRATION_YEAR_ERROR,
      CVV_NO,
      CVV_NO_ERROR,
      ZIP_CODE,
      ZIP_CODE_ERROR,
    } = this.state
    return (
      <View>
        <TextInput
          placeholder="Name on Card"
          value={ACCOUNT_HOLDER_NAME}
          onChangeText={this.setCardName}
        />
        {ACCOUNT_HOLDER_NAME_ERROR && <Text style={ERROR}>{ACCOUNT_HOLDER_NAME_ERROR}</Text>}
        <TextInput
          placeholder="Card Number"
          value={cardNumberDisplay}
          onChangeText={this.setCardNumber}
          onBlur={this.cardNumberBlur}
          onFocus={this.cardNumberFocus}
          maxLength={16}
          keyboardType="number-pad"
        />
        {CARD_NO_ERROR && <Text style={ERROR}>{CARD_NO_ERROR}</Text>}
        <View style={ROW}>
          <View style={COLUMN}>
            <TextInput
              placeholder="Exp. Month"
              value={EXPIRATION_MONTH}
              onChangeText={this.setExpirationMonth}
              maxLength={2}
              keyboardType="number-pad"
            />
            {EXPIRATION_MONTH_ERROR && <Text style={ERROR}>{EXPIRATION_MONTH_ERROR}</Text>}
          </View>
          <View style={COLUMN}>
            <TextInput
              placeholder="Exp. Year"
              value={EXPIRATION_YEAR}
              onChangeText={this.setExpirationYear}
              maxLength={2}
              keyboardType="number-pad"
            />
            {EXPIRATION_YEAR_ERROR && <Text style={ERROR}>{EXPIRATION_YEAR_ERROR}</Text>}
          </View>
        </View>
        <View style={ROW}>
          <View style={COLUMN}>
            <TextInput
              placeholder="CVV"
              value={CVV_NO}
              onChangeText={this.setCvv}
              maxLength={3}
              keyboardType="number-pad"
            />
            {CVV_NO_ERROR && <Text style={ERROR}>{CVV_NO_ERROR}</Text>}
          </View>
          <View style={COLUMN}>
            <TextInput
              placeholder="Zip"
              value={ZIP_CODE}
              onChangeText={this.setZipCode}
              maxLength={5}
              keyboardType="number-pad"
            />
            {ZIP_CODE_ERROR && <Text style={ERROR}>{ZIP_CODE_ERROR}</Text>}
          </View>
        </View>
        <Button onPress={this.submit} text="Continue" />
      </View>
    )
  }
}
