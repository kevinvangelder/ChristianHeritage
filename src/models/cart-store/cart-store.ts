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
    error: types.maybe(types.string),
  })
  .extend(withRootStore)
  .extend(withEnvironment)
  .actions(self => ({
    setCurrentCart: (value: CartSnapshot | Cart) => {
      self.currentCart = value as CartModel
    },
    findCartItem: async (RID): Promise<RecordingSnapshot | boolean> => {
      const recording = self.currentCart.items.find(r => r.RID === RID)
      if (recording) return recording
      return false
    },
    setError: (value: string) => {
      self.error = value
    },
  }))
  .actions(self => ({
    updateCartFromAPI: async (cart: any) => {
      const oldCartItems = self.currentCart.items
      // console.tron.log(oldCartItems)
      self.currentCart.setItems(null)
      await Object.keys(cart).map(async k => {
        const recording = await self.rootStore.recordingStore.findRecording(parseInt(k))
        self.currentCart.addItem(clone(recording))
      })
    },
    updateCouponsFromAPI: (coupons: any) => {},
  }))
  .actions(self => ({
    syncCartAddition: async () => {
      const { items } = self.currentCart
      const { token } = self.rootStore.userStore.currentUser
      try {
        const { kind, cart, coupons } = await self.environment.api.checkCart(items, token)

        if (kind === "ok" && Object.keys(cart).length > 0) {
          self.updateCartFromAPI(cart)
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
          self.updateCartFromAPI(cart)
        }
      } catch (e) {
        console.tron.log(e.message)
      }
    },
  }))
  .actions(self => ({
    addToCart: RID => {
      const recording = self.rootStore.recordingStore.findRecording(RID)
      const { isSignedIn } = self.rootStore.userStore.currentUser
      if (recording) {
        self.currentCart.addItem(clone(recording))
        isSignedIn && self.syncCartAddition()
      }
    },
    removeFromCart: async RID => {
      const recording = await self.rootStore.recordingStore.findRecording(RID)
      const cartItem = await self.findCartItem(RID)
      const { isSignedIn } = self.rootStore.userStore.currentUser
      cartItem && self.currentCart.removeItem(cartItem)
      isSignedIn && recording && (await self.syncCartRemoval([recording]))
    },
    checkout: async () => {
      const { currentCart } = self
      const { token } = self.rootStore.userStore.currentUser

      try {
        const { kind, result } = await self.environment.api.checkout(currentCart.token, token)

        if (kind === "ok" && !result.ERROR) {
          currentCart.setOrderResult(result)
          currentCart.resetCard()
          currentCart.resetItems()
          return true
        } else {
          self.setError(result.ERROR)
          return false
        }
      } catch (e) {
        console.tron.log(e.message)
        return false
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
