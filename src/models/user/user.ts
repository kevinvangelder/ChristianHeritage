import { types } from "mobx-state-tree"

/**
 * An User model.
 */
export const UserModel = types
  .model("User")
  .props({
    email: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
    address1: types.optional(types.string, ""),
    address2: types.optional(types.string, ""),
  })
  .preProcessSnapshot(snapshot => ({
    ...snapshot,
    password: "",
  }))

type UserType = typeof UserModel.Type
export interface User extends UserType {}
type UserSnapshotType = typeof UserModel.SnapshotType
export interface UserSnapshot extends UserSnapshotType {}
