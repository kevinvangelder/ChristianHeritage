import { types } from "mobx-state-tree"
import { RecordingModel } from "../recording"

/**
 * An Cart model.
 */
export const CartModel = types.model("Cart").props({
  items: types.optional(types.array(RecordingModel), []),
})

type CartType = typeof CartModel.Type
export interface Cart extends CartType {}
type CartSnapshotType = typeof CartModel.SnapshotType
export interface CartSnapshot extends CartSnapshotType {}
