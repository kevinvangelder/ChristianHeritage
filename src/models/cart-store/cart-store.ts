import { types } from "mobx-state-tree"
import { CartModel } from "../cart"

/**
 * An CartStore model.
 */
export const CartStoreModel = types.model("CartStore").props({
  currentCart: types.optional(types.array(CartModel), []),
})

/**
 * The CartStore instance.
 */
export type CartStore = typeof CartStoreModel.Type

/**
 * The data of an CartStore.
 */
export type CartStoreSnapshot = typeof CartStoreModel.SnapshotType
