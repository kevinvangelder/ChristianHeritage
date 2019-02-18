import { types, clone } from "mobx-state-tree"
import { CartModel } from "../cart"
import { withRootStore } from "../extensions"

/**
 * An CartStore model.
 */
export const CartStoreModel = types
  .model("CartStore")
  .props({
    currentCart: types.optional(CartModel, {}),
  })
  .extend(withRootStore)
  .actions(self => ({
    addToCart: RECID => {
      const recording = self.rootStore.recordingStore.findRecording(RECID)
      if (recording) {
        self.currentCart.addItem(clone(recording))
      }
    },
  }))

/**
 * The CartStore instance.
 */
export type CartStore = typeof CartStoreModel.Type

/**
 * The data of an CartStore.
 */
export type CartStoreSnapshot = typeof CartStoreModel.SnapshotType
