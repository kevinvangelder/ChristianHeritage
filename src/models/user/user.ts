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
    phone: types.optional(types.string, ""),
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    address1: types.optional(types.string, ""),
    address2: types.optional(types.string, ""),
    city: types.optional(types.string, ""),
    state: types.optional(types.string, ""),
    zip: types.optional(types.string, ""),
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
    setPhone: (value: string) => {
      self.phone = value
    },
    setFirstName: (value: string) => {
      self.firstName = value
    },
    setLastName: (value: string) => {
      self.lastName = value
    },
    setAddress1: (value: string) => {
      self.address1 = value
    },
    setAddress2: (value: string) => {
      self.address2 = value
    },
    setCity: (value: string) => {
      self.city = value
    },
    setState: (value: string) => {
      self.state = value
    },
    setZip: (value: string) => {
      self.zip = value
    },
    setToken: (value: string) => {
      self.token = value
    },
    setPurchaseHistory: (value: any) => {
      self.purchaseHistory = value
    },
  }))

type UserType = typeof UserModel.Type
export interface User extends UserType {}
type UserSnapshotType = typeof UserModel.SnapshotType
export interface UserSnapshot extends UserSnapshotType {}
