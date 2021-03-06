import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../navigation-store"
import { RecordingStoreModel } from "../recording-store"
import { CartStoreModel } from "../cart-store"
import { UserStoreModel } from "../user-store"

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  recordingStore: types.optional(RecordingStoreModel, {}),
  cartStore: types.optional(CartStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
