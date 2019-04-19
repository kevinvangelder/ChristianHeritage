import { Alert } from "react-native"
import { types } from "mobx-state-tree"
import { UserModel } from "../user"
import { withEnvironment, withRootStore } from "../extensions"
import { validationRules, validateEmail } from "./validate"
import { validate } from "../../lib/validate"
import { setGenericPassword } from "react-native-keychain"

/**
 * An UserStore model.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    currentUser: types.optional(UserModel, {}),
    isTokenRefreshing: types.optional(types.boolean, false),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions(self => ({
    setIsTokenRefreshing: value => {
      self.isTokenRefreshing = value
    },
    validateEmail: () => {
      const { setEmailError } = self.currentUser
      const { email } = validate(validateEmail, self.currentUser)
      email ? setEmailError(email[0]) : setEmailError(null)
      return !email
    },
    validateSignUp: () => {
      const {
        setPasswordError,
        setConfirmError,
        setPhoneError,
        setFirstNameError,
        setLastNameError,
        setAddress1Error,
        setCityError,
        setStateError,
        setZipError,
      } = self.currentUser
      const {
        password,
        confirm,
        phone,
        firstName,
        lastName,
        address1,
        city,
        state,
        zip,
      } = validate(validationRules, self.currentUser)
      password ? setPasswordError(password[0]) : setPasswordError(null)
      confirm ? setConfirmError(confirm[0]) : setConfirmError(null)
      phone ? setPhoneError(phone[0]) : setPhoneError(null)
      firstName ? setFirstNameError(firstName[0]) : setFirstNameError(null)
      lastName ? setLastNameError(lastName[0]) : setLastNameError(null)
      address1 ? setAddress1Error(address1[0]) : setAddress1Error(null)
      city ? setCityError(city[0]) : setCityError(null)
      state ? setStateError(state[0]) : setStateError(null)
      zip ? setZipError(zip[0]) : setZipError(null)
      return (
        !password &&
        !confirm &&
        !phone &&
        !firstName &&
        !lastName &&
        !address1 &&
        !city &&
        !state &&
        !zip
      )
    },
    validateUpdateUser: () => {
      const {
        setPhoneError,
        setFirstNameError,
        setLastNameError,
        setAddress1Error,
        setCityError,
        setStateError,
        setZipError,
      } = self.currentUser
      const { phone, firstName, lastName, address1, city, state, zip } = validate(
        validationRules,
        self.currentUser,
      )
      phone ? setPhoneError(phone[0]) : setPhoneError(null)
      firstName ? setFirstNameError(firstName[0]) : setFirstNameError(null)
      lastName ? setLastNameError(lastName[0]) : setLastNameError(null)
      address1 ? setAddress1Error(address1[0]) : setAddress1Error(null)
      city ? setCityError(city[0]) : setCityError(null)
      state ? setStateError(state[0]) : setStateError(null)
      zip ? setZipError(zip[0]) : setZipError(null)
      return !phone && !firstName && !lastName && !address1 && !city && !state && !zip
    },
  }))
  .actions(self => ({
    checkEmail: async () => {
      const result = await self.environment.api.checkEmail(self.currentUser.email)
      if (result.kind === "ok") {
        self.currentUser.setEmailExists(result.emailExists)
      }
    },
    signIn: async () => {
      const {
        email,
        password,
        setPassword,
        setToken,
        setFirstName,
        setLastName,
        setPhone,
        setPurchaseHistory,
        setAddress1,
        setAddress2,
        setCity,
        setZip,
        setState,
      } = self.currentUser
      const {
        currentCart: { items, coupons },
        updateCartFromAPI,
        updateCouponsFromAPI,
      } = self.rootStore.cartStore
      const result = await self.environment.api.signIn(email, password, items, coupons)
      if (result.kind === "ok") {
        setPassword("")
        if (result.token) setToken(result.token)
        if (result.firstName) setFirstName(result.firstName)
        if (result.lastName) setLastName(result.lastName)
        if (result.phone) setPhone(`${result.phone}`)
        if (result.address1) setAddress1(result.address1)
        if (result.address2) setAddress2(result.address2)
        if (result.city) setCity(result.city)
        if (result.state) setState(result.state)
        if (result.zip) setZip(`${result.zip}`)
        if (result.purchaseHistory) setPurchaseHistory(result.purchaseHistory)
        if (result.cart) updateCartFromAPI(result.cart)
        if (result.cart) updateCouponsFromAPI(result.cart)
        // if (result.coupons) updateInvalidCouponsFromAPI(result.cart)
        if (result.error) {
          Alert.alert("Error", result.error)
          return false
        } else {
          return true
        }
      }
      return false
    },
    reauthenticate: async () => {
      if (!self.isTokenRefreshing) {
        self.setIsTokenRefreshing(true)
        const {
          email,
          token,
          setToken,
          setFirstName,
          setLastName,
          setPhone,
          setPurchaseHistory,
          setAddress1,
          setAddress2,
          setCity,
          setZip,
          setState,
        } = self.currentUser
        const {
          currentCart: { items, coupons },
          updateCartFromAPI,
          updateCouponsFromAPI,
        } = self.rootStore.cartStore
        const result = await self.environment.api.reauthenticate(email, token, items, coupons)
        if (result.kind === "ok" && !result.error) {
          if (result.token) setToken(result.token)
          if (result.firstName) setFirstName(result.firstName)
          if (result.lastName) setLastName(result.lastName)
          if (result.phone) setPhone(`${result.phone}`)
          if (result.address1) setAddress1(result.address1)
          if (result.address2) setAddress2(result.address2)
          if (result.city) setCity(result.city)
          if (result.state) setState(result.state)
          if (result.zip) setZip(`${result.zip}`)
          if (result.purchaseHistory) setPurchaseHistory(result.purchaseHistory)
          if (result.cart) updateCartFromAPI(result.cart)
          if (result.cart) updateCouponsFromAPI(result.cart)
          // if (result.coupons) updateInvalidCouponsFromAPI(result.cart)
        } else {
          console.tron.log(result.error)
          if (result.error === "User not found or password incorrect.") {
            self.currentUser.setToken(null)
            Alert.alert("Session Expired", "Your Alliance Recordings session has expired.")
          }
        }
        self.setIsTokenRefreshing(false)
      }
    },
    signUp: async () => {
      const {
        email,
        password,
        phone,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
      } = self.currentUser
      const {
        setPassword,
        setToken,
        setFirstName,
        setLastName,
        setPhone,
        setPurchaseHistory,
        setAddress1,
        setAddress2,
        setCity,
        setZip,
        setState,
      } = self.currentUser
      const {
        currentCart: { items, coupons },
        updateCartFromAPI,
        updateCouponsFromAPI,
      } = self.rootStore.cartStore
      const result = await self.environment.api.signUp(
        email,
        password,
        phone,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
        items,
        coupons,
      )
      if (result.kind === "ok") {
        setPassword("")
        if (result.token) setToken(result.token)
        if (result.firstName) setFirstName(result.firstName)
        if (result.lastName) setLastName(result.lastName)
        if (result.phone) setPhone(`${result.phone}`)
        if (result.address1) setAddress1(result.address1)
        if (result.address2) setAddress2(result.address2)
        if (result.city) setCity(result.city)
        if (result.state) setState(result.state)
        if (result.zip) setZip(`${result.zip}`)
        if (result.purchaseHistory) setPurchaseHistory(result.purchaseHistory)
        if (result.cart) updateCartFromAPI(result.cart)
        if (result.cart) updateCouponsFromAPI(result.cart)
        // if (result.coupons) self.rootStore.cartStore.updateInvalidCouponsFromAPI(result.cart)
        if (result.token) return true
      }
      return false
    },
    updateUser: async () => {
      const { currentCart: { items, coupons } } = self.rootStore.cartStore
      const {
        email,
        password,
        phone,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
        setPassword,
        setPasswordError,
      } = self.currentUser
      const result = await self.environment.api.updateUser(
        email,
        password,
        phone,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
        items,
        coupons,
      )
      if (result.kind === "ok" && result.success) {
        setPassword("")
        return true
      } else {
        result.error && setPasswordError(result.error)
        return false
      }
    },
    resetEmailExists: () => {
      const {
        setEmailExists,
        setPassword,
        setConfirm,
        setFirstName,
        setLastName,
        setPhone,
        setAddress1,
        setAddress2,
        setCity,
        setState,
        setZip,
      } = self.currentUser
      const {
        setPasswordError,
        setConfirmError,
        setFirstNameError,
        setLastNameError,
        setPhoneError,
        setAddress1Error,
        setAddress2Error,
        setCityError,
        setStateError,
        setZipError,
      } = self.currentUser
      setEmailExists(null)
      setPassword(null)
      setConfirm(null)
      setFirstName(null)
      setLastName(null)
      setPhone(null)
      setAddress1(null)
      setAddress2(null)
      setCity(null)
      setState(null)
      setZip(null)
      setPasswordError(null)
      setConfirmError(null)
      setFirstNameError(null)
      setLastNameError(null)
      setPhoneError(null)
      setAddress1Error(null)
      setAddress2Error(null)
      setCityError(null)
      setStateError(null)
      setZipError(null)
    },
  }))
  .actions(self => ({
    signOut: () => {
      self.currentUser.setToken(null)
      self.resetEmailExists()
    },
  }))

export type UserStore = typeof UserStoreModel.Type
export type UserStoreSnapshot = typeof UserStoreModel.SnapshotType
