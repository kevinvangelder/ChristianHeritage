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
    addItem: (item: RecordingSnapshot | Recording) => {
      self.setItems(self.items.concat(item))
    },
    removeItem: (item: RecordingSnapshot | Recording) => {
      self.items.remove(item)
    },
  }))
  .views(self => ({
    get itemIds() {
      return self.items.map(i => i.RECID)
    },
    get itemCount() {
      return self.items.length
    },
    get isEmpty() {
      return self.items.length === 0
    },
    get localSubtotal() {
      let subtotal = 0
      self.items.map(i => (subtotal += i.PRICE))
      return subtotal
    },
  }))

type CartType = typeof CartModel.Type
export interface Cart extends CartType {}
type CartSnapshotType = typeof CartModel.SnapshotType
export interface CartSnapshot extends CartSnapshotType {}
