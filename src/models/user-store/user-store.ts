import { types } from "mobx-state-tree"
import { UserModel } from "../user"
import { withEnvironment, withRootStore } from "../extensions"

/**
 * An UserStore model.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    currentUser: types.optional(UserModel, {}),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions(self => ({
    checkEmail: async () => {
      const result = await self.environment.api.checkEmail(self.currentUser.email)
      if (result.kind === "ok") {
        self.currentUser.setEmailExists(result.emailExists)
      }
    },
    signIn: async () => {
      const result = await self.environment.api.signIn(
        self.currentUser.email,
        self.currentUser.password,
        self.rootStore.cartStore.currentCart,
      )
      if (result.kind === "ok") {
        self.currentUser.setToken(result.token)
        if (result.purchaseHistory) {
          self.currentUser.setPurchaseHistory(result.purchaseHistory)
        }
        if (result.cart) {
          self.rootStore.cartStore.setCurrentCart(result.cart)
        }
      }
    },
    signUp: async () => {
      const {
        email,
        password,
        phone,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
      } = self.currentUser
      const result = await self.environment.api.signUp(
        email,
        password,
        phone,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
        self.rootStore.cartStore.currentCart,
      )
      if (result.kind === "ok") {
        self.currentUser.setToken(result.token)
        if (result.purchaseHistory) {
          self.currentUser.setPurchaseHistory(result.purchaseHistory)
        }
        if (result.cart) {
          self.rootStore.cartStore.setCurrentCart(result.cart)
        }
      }
    },
  }))

export type UserStore = typeof UserStoreModel.Type
export type UserStoreSnapshot = typeof UserStoreModel.SnapshotType
