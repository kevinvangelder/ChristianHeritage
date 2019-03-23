import { types, clone } from "mobx-state-tree"
import { CartSnapshot, Cart, CartModel } from "../cart"
import { withRootStore, withEnvironment } from "../extensions"
import { RecordingSnapshot } from "../recording"

/**
 * An CartStore model.
 */
export const CartStoreModel = types
  .model("CartStore")
  .props({
    currentCart: types.optional(CartModel, {}),
    coupons: types.optional(types.array(types.string), []),
  })
  .extend(withRootStore)
  .extend(withEnvironment)
  .actions(self => ({
    setCurrentCart: (value: CartSnapshot | Cart) => {
      self.currentCart = value as CartModel
    },
    findCartItem: async (RECID): Promise<RecordingSnapshot | boolean> => {
      const recording = self.currentCart.items.find(r => r.RECID === RECID)
      if (recording) return recording
      return false
    },
    updateCartFromAPI: (cart: CartSnapshot | Cart) => {},
    updateCouponsFromAPI: (coupons: any) => {},
  }))
  .actions(self => ({
    syncCartAddition: async () => {
      const { currentCart } = self
      const { token } = self.rootStore.userStore.currentUser
      try {
        const { kind, cart, coupons } = await self.environment.api.checkCart(currentCart, token)

        if (kind === "ok" && Object.keys(cart).length > 0) {
          // self.updateCartFromAPI(cart)
          // self.updateCouponsFromAPI(coupons)
        }
      } catch (e) {
        console.tron.log(e.message)
      }
    },
    syncCartRemoval: async items => {
      const { token } = self.rootStore.userStore.currentUser
      try {
        const { kind, cart } = await self.environment.api.removeFromCart(items, token)

        if (kind === "ok" && Object.keys(cart).length > 0) {
          // self.updateCartFromAPI(cart)
        }
      } catch (e) {
        console.tron.log(e.message)
      }
    },
  }))
  .actions(self => ({
    addToCart: async RECID => {
      const recording = await self.rootStore.recordingStore.findRecording(RECID)
      const { isSignedIn } = self.rootStore.userStore.currentUser
      if (recording) {
        self.currentCart.addItem(clone(recording))
        isSignedIn && self.syncCartAddition()
      }
    },
    removeFromCart: async RECID => {
      const recording = await self.findCartItem(RECID)
      const { isSignedIn } = self.rootStore.userStore.currentUser
      if (recording) {
        self.currentCart.removeItem(recording)
        isSignedIn && self.syncCartRemoval([recording])
      }
    },
    checkout: async () => {
      const { currentCart } = self
      const { token } = self.rootStore.userStore.currentUser
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
