import * as React from "react"
import {
  View,
  ViewStyle,
  TextInput,
  ScrollView,
  TextStyle,
  Alert,
  Picker,
  NativeModules,
  Platform,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native"
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

// Sandbox
// const LOGIN_ID = "76m2skPQr"
// const CLIENT_KEY = "7f4FUD6SRR8Dw634qYpJaSh65WVUNaJvmhjh8wcCxDF69EhUcg5pyffPJ2jV6293"

// Live
const LOGIN_ID = "98g2AB6aE7"
const CLIENT_KEY = "2seKtumJAGK8fuH6qpBgS2k9DkK45aqa5TtnJ94Wg6H9AkXHeHJ28g7sHH9w5B8F"

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
const INPUT: ViewStyle = {
  marginVertical: spacing[2],
  paddingBottom: spacing[1],
  borderBottomColor: color.line,
  borderBottomWidth: 1,
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
const PICKER_OPTION: ViewStyle = {
  marginHorizontal: spacing[4],
  padding: spacing[4],
  borderBottomColor: color.line,
  borderBottomWidth: 1,
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
    ZIP_CODE_ERROR: string | null
    modalVisible: boolean
    modalType: string | null,
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
      modalVisible: false,
      modalType: null,
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
    this.setState({ EXPIRATION_MONTH: value, modalVisible: false, modalType: null })
  }
  setExpirationYear = value => {
    this.setState({ EXPIRATION_YEAR: value, modalVisible: false, modalType: null })
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
      NativeModules.RNAuthorizeNet.getTokenWithRequestForCard(card, true, (status, response) => {
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
    const isIos = Platform.OS === "ios"
    return (
      <View>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false, modalType: null })}
        >
          {this.renderModalContent()}
        </Modal>
        <TextInput
          placeholder="Name on Card"
          placeholderTextColor={color.palette.mediumGrey}
          value={ACCOUNT_HOLDER_NAME}
          onChangeText={this.setCardName}
          style={isIos ? INPUT : {}}
        />
        {ACCOUNT_HOLDER_NAME_ERROR && <Text style={ERROR}>{ACCOUNT_HOLDER_NAME_ERROR}</Text>}
        <TextInput
          placeholder="Card Number"
          placeholderTextColor={color.palette.mediumGrey}
          value={cardNumberDisplay}
          onChangeText={this.setCardNumber}
          onBlur={this.cardNumberBlur}
          onFocus={this.cardNumberFocus}
          maxLength={16}
          keyboardType="numeric"
          style={isIos ? INPUT : {}}
        />
        {CARD_NO_ERROR && <Text style={ERROR}>{CARD_NO_ERROR}</Text>}
        <View style={ROW}>
          <View style={COLUMN}>
            <View style={ROW}>
              <Text style={{ alignSelf: "center" }}>Exp. Month:</Text>
              {!isIos && (
                <Picker
                  selectedValue={EXPIRATION_MONTH}
                  onValueChange={value => this.setExpirationMonth(value)}
                  style={{ flex: 1 }}
                >
                  <Picker.Item label="Select" value={false} />
                  <Picker.Item label="01" value="01" />
                  <Picker.Item label="02" value="02" />
                  <Picker.Item label="03" value="03" />
                  <Picker.Item label="04" value="04" />
                  <Picker.Item label="05" value="05" />
                  <Picker.Item label="06" value="06" />
                  <Picker.Item label="07" value="07" />
                  <Picker.Item label="08" value="08" />
                  <Picker.Item label="09" value="09" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="11" value="11" />
                  <Picker.Item label="12" value="12" />
                </Picker>
              )}
              {isIos && this.renderIosPicker("month")}
            </View>
            {EXPIRATION_MONTH_ERROR && <Text style={ERROR}>{EXPIRATION_MONTH_ERROR}</Text>}
          </View>
          <View style={COLUMN}>
            <View style={ROW}>
              <Text style={{ alignSelf: "center" }}>Exp Year:</Text>
              {!isIos && (
                <Picker
                  selectedValue={EXPIRATION_YEAR}
                  onValueChange={value => this.setExpirationYear(value)}
                  style={{ flex: 1 }}
                >
                  <Picker.Item label="Select" value={false} />
                  <Picker.Item label="2019" value="19" />
                  <Picker.Item label="2020" value="20" />
                  <Picker.Item label="2021" value="21" />
                  <Picker.Item label="2022" value="22" />
                  <Picker.Item label="2023" value="23" />
                  <Picker.Item label="2024" value="24" />
                  <Picker.Item label="2025" value="25" />
                  <Picker.Item label="2026" value="26" />
                  <Picker.Item label="2027" value="27" />
                  <Picker.Item label="2028" value="28" />
                  <Picker.Item label="2029" value="29" />
                  <Picker.Item label="2030" value="30" />
                </Picker>
              )}
              {isIos && this.renderIosPicker("year")}
            </View>
            {EXPIRATION_YEAR_ERROR && <Text style={ERROR}>{EXPIRATION_YEAR_ERROR}</Text>}
          </View>
        </View>
        <View style={ROW}>
          <View style={COLUMN}>
            <TextInput
              placeholder="CVV"
              placeholderTextColor={color.palette.mediumGrey}
              value={CVV_NO}
              onChangeText={this.setCvv}
              maxLength={3}
              keyboardType="numeric"
              style={isIos ? [INPUT, { marginRight: spacing[3] }] : {}}
            />
            {CVV_NO_ERROR && <Text style={ERROR}>{CVV_NO_ERROR}</Text>}
          </View>
          <View style={COLUMN}>
            <TextInput
              placeholder="Zip"
              placeholderTextColor={color.palette.mediumGrey}
              value={ZIP_CODE}
              onChangeText={this.setZipCode}
              maxLength={5}
              keyboardType="numeric"
              style={isIos ? INPUT : {}}
            />
            {ZIP_CODE_ERROR && <Text style={ERROR}>{ZIP_CODE_ERROR}</Text>}
          </View>
        </View>
        <Button onPress={this.submit} text="Continue" />
      </View>
    )
  }

  renderIosPicker = type => {
    const { EXPIRATION_MONTH, EXPIRATION_YEAR } = this.state
    const currentValue = type === "month" ? EXPIRATION_MONTH : EXPIRATION_YEAR
    const setter = type === "month" ? this.setExpirationMonth : this.setExpirationYear
    return (
      <TouchableOpacity
        style={{ marginLeft: spacing[2] }}
        onPress={() => this.setState({ modalVisible: true, modalType: type })}
      >
        <Text>
          {currentValue ? (type === "year" ? `20${currentValue}` : currentValue) : "Select"}
        </Text>
      </TouchableOpacity>
    )
  }

  renderModalContent = () => {
    const { modalType } = this.state
    return (
      <SafeAreaView>
        <View>
          <Text preset="header" style={{ textAlign: "center" }}>
            Select Expiration {modalType === "month" ? "Month" : "Year"}
          </Text>
          {modalType === "month" && this.renderMonthOptions()}
          {modalType === "year" && this.renderYearOptions()}
          <Button
            preset="delete"
            text="Cancel"
            onPress={() => this.setState({ modalVisible: false, modalType: null })}
            style={{ margin: spacing[3] }}
          />
        </View>
      </SafeAreaView>
    )
  }

  renderMonthOptions = () => {
    return (
      <View>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("01")}>
          <Text>01</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("02")}>
          <Text>02</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("03")}>
          <Text>03</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("04")}>
          <Text>04</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("05")}>
          <Text>05</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("06")}>
          <Text>06</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("07")}>
          <Text>07</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("08")}>
          <Text>08</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("09")}>
          <Text>09</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("10")}>
          <Text>10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("11")}>
          <Text>11</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationMonth("12")}>
          <Text>12</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderYearOptions = () => {
    return (
      <View>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("19")}>
          <Text>2019</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("20")}>
          <Text>2020</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("21")}>
          <Text>2021</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("22")}>
          <Text>2022</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("23")}>
          <Text>2023</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("24")}>
          <Text>2024</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("25")}>
          <Text>2025</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("26")}>
          <Text>2026</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("27")}>
          <Text>2027</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("28")}>
          <Text>2028</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("29")}>
          <Text>2029</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PICKER_OPTION} onPress={() => this.setExpirationYear("30")}>
          <Text>2030</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
