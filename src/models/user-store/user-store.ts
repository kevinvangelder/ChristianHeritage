import { Alert } from "react-native"
import { types } from "mobx-state-tree"
import { UserModel } from "../user"
import { withEnvironment, withRootStore } from "../extensions"
import { validationRules } from "./validate"
import { validate } from "../../lib/validate"

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
    validateSignUp: () => {
      const {
        setPasswordError,
        setPhoneError,
        setFirstNameError,
        setLastNameError,
        setAddress1Error,
        setCityError,
        setStateError,
        setZipError,
      } = self.currentUser
      const { password, phone, firstName, lastName, address1, city, state, zip } = validate(
        validationRules,
        self.currentUser,
      )
      password ? setPasswordError(password[0]) : setPasswordError(null)
      phone ? setPhoneError(phone[0]) : setPhoneError(null)
      firstName ? setFirstNameError(firstName[0]) : setFirstNameError(null)
      lastName ? setLastNameError(lastName[0]) : setLastNameError(null)
      address1 ? setAddress1Error(address1[0]) : setAddress1Error(null)
      city ? setCityError(city[0]) : setCityError(null)
      state ? setStateError(state[0]) : setStateError(null)
      zip ? setZipError(zip[0]) : setZipError(null)
      return !password && !phone && !firstName && !lastName && !address1 && !city && !state && !zip
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
      const { email, password } = self.currentUser
      const { currentCart } = self.rootStore.cartStore
      const result = await self.environment.api.signIn(email, password, currentCart)
      if (result.kind === "ok") {
        self.currentUser.setPassword("")
        if (result.token) self.currentUser.setToken(result.token)
        console.tron.log(result)
        if (result.purchaseHistory) self.currentUser.setPurchaseHistory(result.purchaseHistory)
        if (result.cart) self.rootStore.cartStore.setCurrentCart(result.cart)
        if (result.error) {
          Alert.alert("Error", result.error)
          return false
        } else {
          return true
        }
      }
    },
    reauthenticate: async () => {
      if (!self.isTokenRefreshing) {
        self.setIsTokenRefreshing(true)
        const { email, token } = self.currentUser
        const { currentCart } = self.rootStore.cartStore
        const result = await self.environment.api.reauthenticate(email, token, currentCart)
        if (result.kind === "ok") {
          self.currentUser.setToken(result.token)
          if (result.purchaseHistory) {
            self.currentUser.setPurchaseHistory(result.purchaseHistory)
          }
          if (result.cart) {
            self.rootStore.cartStore.setCurrentCart(result.cart)
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
        self.rootStore.cartStore.currentCart,
      )
      if (result.kind === "ok") {
        self.currentUser.setToken(result.token)
        if (result.purchaseHistory) {
          self.currentUser.setPurchaseHistory(result.purchaseHistory)
        }
        if (result.cart) {
          self.rootStore.cartStore.setCurrentCart(result.cart)
        }
      }
    },
    resetEmailExists: () => {
      self.currentUser.setEmailExists(null)
    },
  }))

export type UserStore = typeof UserStoreModel.Type
export type UserStoreSnapshot = typeof UserStoreModel.SnapshotType
