import { types } from "mobx-state-tree"

/**
 * An User model.
 */
export const UserModel = types
  .model("User")
  .props({
    email: types.optional(types.string, ""),
    emailExists: types.maybe(types.boolean),
    password: types.optional(types.string, ""),
    passwordError: types.maybe(types.string),
    phone: types.optional(types.string, ""),
    phoneError: types.maybe(types.string),
    firstName: types.optional(types.string, ""),
    firstNameError: types.maybe(types.string),
    lastName: types.optional(types.string, ""),
    lastNameError: types.maybe(types.string),
    address1: types.optional(types.string, ""),
    address1Error: types.maybe(types.string),
    address2: types.optional(types.string, ""),
    address2Error: types.maybe(types.string),
    city: types.optional(types.string, ""),
    cityError: types.maybe(types.string),
    state: types.optional(types.string, ""),
    stateError: types.maybe(types.string),
    zip: types.optional(types.string, ""),
    zipError: types.maybe(types.string),
    token: types.optional(types.string, ""),
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
    setEmailExists: (value: boolean) => {
      self.emailExists = value
    },
    setPassword: (value: string) => {
      self.password = value
    },
    setPasswordError: (value: string | null) => {
      self.passwordError = value
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
      return self.token
    },
  }))

type UserType = typeof UserModel.Type
export interface User extends UserType {}
type UserSnapshotType = typeof UserModel.SnapshotType
export interface UserSnapshot extends UserSnapshotType {}
