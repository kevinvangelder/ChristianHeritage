import { types } from "mobx-state-tree"
import { RecordingModel, Recording, RecordingSnapshot } from "../recording"

/**
 * An Cart model.
 */
export const CartModel = types
  .model("Cart")
  .props({
    items: types.optional(types.array(RecordingModel), []),
  })
  .actions(self => ({
    setItems: (value: Recording | RecordingSnapshot) => {
      if (self.items) {
        if (value) {
          self.items.replace(value as any)
        } else {
          self.items.clear()
        }
      } else {
        self.items = value as any
      }
    },
  }))
  .actions(self => ({
    addItem: (item: RecordingModel) => {
      self.setItems(self.items.concat(item))
    },
  }))

type CartType = typeof CartModel.Type
export interface Cart extends CartType {}
type CartSnapshotType = typeof CartModel.SnapshotType
export interface CartSnapshot extends CartSnapshotType {}
