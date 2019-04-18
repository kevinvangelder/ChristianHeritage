import { types } from "mobx-state-tree"
import {
  RecordingModel,
  Recording,
  RecordingSnapshot,
  FakeRecordingModel,
  FakeRecording,
  FakeRecordingSnapshot,
} from "../recording"

/**
 * An Cart model.
 */
export const CartModel = types
  .model("Cart")
  .props({
    items: types.optional(types.array(RecordingModel), []),
    otherItems: types.optional(types.array(FakeRecordingModel), []),
    token: types.maybe(types.string),
    lastFour: types.maybe(types.string),
    expiration: types.maybe(types.string),
    orderResult: types.optional(types.frozen, {}),
    coupons: types.optional(types.array(types.string), []),
    couponErrors: types.optional(types.array(types.string), []),
  })
  .actions(self => ({
    setItems: (value: Recording[] | RecordingSnapshot[]) => {
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
    setOtherItems: (value: FakeRecording[] | FakeRecordingSnapshot[]) => {
      if (self.otherItems) {
        if (value) {
          self.otherItems.replace(value as any)
        } else {
          self.otherItems.clear()
        }
      } else {
        self.otherItems = value as any
      }
    },
    setToken: (value: string) => {
      self.token = value
    },
    setLastFour: (value: string) => {
      self.lastFour = value
    },
    setExpiration: (value: string) => {
      self.expiration = value
    },
    setOrderResult: (value: any) => {
      self.orderResult = value
    },
    setCoupons: (value: string[]) => {
      if (self.coupons) {
        if (value) {
          self.coupons.replace(value as any)
        } else {
          self.coupons.clear()
        }
      } else {
        self.coupons = value as any
      }
    },
    setCouponErrors: (value: string[]) => {
      if (self.couponErrors) {
        if (value) {
          self.couponErrors.replace(value as any)
        } else {
          self.couponErrors.clear()
        }
      } else {
        self.couponErrors = value as any
      }
    },
  }))
  .actions(self => ({
    addItem: (item: RecordingSnapshot | Recording) => {
      self.setItems(self.items.concat(item))
    },
    addOtherItem: (item: FakeRecording | FakeRecordingSnapshot) => {
      self.setOtherItems(self.otherItems.concat(item))
    },
    removeItem: (item: RecordingSnapshot | Recording) => {
      self.items.remove(item)
    },
    removeOtherItem: (item: FakeRecording | FakeRecordingSnapshot) => {
      self.otherItems.remove(item)
    },
    resetCard: () => {
      self.setToken(null)
      self.setLastFour(null)
      self.setExpiration(null)
    },
    resetItems: () => {
      self.setItems(null)
    },
    resetOrderResult: () => {
      self.setOrderResult(null)
    },
  }))
  .views(self => ({
    get itemIds() {
      return self.items ? self.items.map(i => i.RID) : []
    },
    get setIds() {
      return self.items ? self.items.map(i => i.SET && i.RID) : []
    },
    get setSessionIds() {
      const arrays = self.items
        ? self.items.map(i => i.SET && i.SESSIONS && i.SESSIONS.map(s => s.RID))
        : []
      return [].concat.apply([], arrays)
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
      self.otherItems.map(i => (subtotal += i.price))
      return subtotal.toFixed(2)
    },
  }))

type CartType = typeof CartModel.Type
export interface Cart extends CartType {}
type CartSnapshotType = typeof CartModel.SnapshotType
export interface CartSnapshot extends CartSnapshotType {}
