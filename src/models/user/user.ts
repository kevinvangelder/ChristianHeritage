import { types } from "mobx-state-tree"

/**
 * An User model.
 */
export const UserModel = types
  .model("User")
  .props({
    email: types.optional(types.string, ""),
    emailError: types.maybe(types.string),
    emailExists: types.maybe(types.boolean),
    password: types.maybe(types.string),
    passwordError: types.maybe(types.string),
    confirm: types.maybe(types.string),
    confirmError: types.maybe(types.string),
    phone: types.maybe(types.string),
    phoneError: types.maybe(types.string),
    firstName: types.maybe(types.string),
    firstNameError: types.maybe(types.string),
    lastName: types.maybe(types.string),
    lastNameError: types.maybe(types.string),
    address1: types.maybe(types.string),
    address1Error: types.maybe(types.string),
    address2: types.maybe(types.string),
    address2Error: types.maybe(types.string),
    city: types.maybe(types.string),
    cityError: types.maybe(types.string),
    state: types.maybe(types.string),
    stateError: types.maybe(types.string),
    zip: types.maybe(types.string),
    zipError: types.maybe(types.string),
    token: types.maybe(types.string),
    purchaseHistory: types.optional(types.frozen, {}),
  })
  .preProcessSnapshot(snapshot => ({
    ...snapshot,
    password: "",
  }))
  .actions(self => ({
    setEmail: (value: string) => {
      self.email = value
    },
    setEmailError: (value: string) => {
      self.emailError = value
    },
    setEmailExists: (value: boolean) => {
      self.emailExists = value
    },
    setPassword: (value: string) => {
      self.password = value
    },
    setPasswordError: (value: string | null) => {
      self.passwordError = value
    },
    setConfirm: (value: string) => {
      self.confirm = value
    },
    setConfirmError: (value: string) => {
      self.confirmError = value
    },
    setPhone: (value: string) => {
      self.phone = value
    },
    setPhoneError: (value: string | null) => {
      self.phoneError = value
    },
    setFirstName: (value: string) => {
      self.firstName = value
    },
    setFirstNameError: (value: string | null) => {
      self.firstNameError = value
    },
    setLastName: (value: string) => {
      self.lastName = value
    },
    setLastNameError: (value: string | null) => {
      self.lastNameError = value
    },
    setAddress1: (value: string) => {
      self.address1 = value
    },
    setAddress1Error: (value: string | null) => {
      self.address1Error = value
    },
    setAddress2: (value: string) => {
      self.address2 = value
    },
    setAddress2Error: (value: string | null) => {
      self.address2Error = value
    },
    setCity: (value: string) => {
      self.city = value
    },
    setCityError: (value: string | null) => {
      self.cityError = value
    },
    setState: (value: string) => {
      self.state = value
    },
    setStateError: (value: string | null) => {
      self.stateError = value
    },
    setZip: (value: string) => {
      self.zip = value
    },
    setZipError: (value: string | null) => {
      self.zipError = value
    },
    setToken: (value: string) => {
      self.token = value
    },
    setPurchaseHistory: (value: any) => {
      self.purchaseHistory = value
    },
  }))
  .views(self => ({
    get isSignedIn() {
      return !!self.token
    },
    get purchaseHistoryIds() {
      return self.purchaseHistory ? Object.keys(self.purchaseHistory).map(i => parseInt(i)) : []
    },
    get initials() {
      if (self.firstName && self.lastName)
        return `${self.firstName.slice(0, 1)}${self.lastName.slice(0, 1)}`
      return "CH"
    },
  }))

type UserType = typeof UserModel.Type
export interface User extends UserType {}
type UserSnapshotType = typeof UserModel.SnapshotType
export interface UserSnapshot extends UserSnapshotType {}
