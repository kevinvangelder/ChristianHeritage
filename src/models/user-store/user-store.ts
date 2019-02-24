import { types } from "mobx-state-tree"
import { UserModel } from "../user"

/**
 * An UserStore model.
 */
export const UserStoreModel = types.model("UserStore").props({
  currentUser: types.optional(UserModel, {}),
})

export type UserStore = typeof UserStoreModel.Type
export type UserStoreSnapshot = typeof UserStoreModel.SnapshotType
