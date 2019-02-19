import { types, clone } from "mobx-state-tree"
import { CartModel } from "../cart"
import { withRootStore } from "../extensions"
import { RecordingModel } from "../recording"

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
    findCartItem: async (RECID): Promise<RecordingModel | boolean> => {
      const recording = self.currentCart.items.find(r => r.RECID === RECID)
      if (recording) return recording
      return false
    },
  }))
  .actions(self => ({
    addToCart: async RECID => {
      const recording = await self.rootStore.recordingStore.findRecording(RECID)
      if (recording) {
        self.currentCart.addItem(clone(recording))
      }
    },
    removeFromCart: async RECID => {
      const recording = await self.findCartItem(RECID)
      if (recording) {
        self.currentCart.removeItem(recording)
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
