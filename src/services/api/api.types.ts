import { GeneralApiProblem } from "./api-problem"
import { RecordingSnapshot } from "../../models/recording"
import { CartSnapshot } from "../../models/cart"

export type GetRecordingsResult =
  | { kind: "ok"; recordings: RecordingSnapshot[] }
  | GeneralApiProblem
export type CheckEmailResult = { kind: "ok"; emailExists: boolean } | GeneralApiProblem
export type SignUpResult =
  | {
      kind: "ok"
      token: string
      firstName: string
      lastName: string
      cart: CartSnapshot
      coupons: any
      purchaseHistory: any
      error: string,
    }
  | GeneralApiProblem
export type SignInResult =
  | {
      kind: "ok"
      token: string
      firstName: string
      lastName: string
      cart: CartSnapshot
      coupons: any
      purchaseHistory: any
      error: string,
    }
  | GeneralApiProblem
export type ReauthenticateResult =
  | {
      kind: "ok"
      token: string
      firstName: string
      lastName: string
      cart: CartSnapshot
      coupons: any
      purchaseHistory: any
      error: string | null,
    }
  | GeneralApiProblem
export type CheckCartResult =
  | { kind: "ok"; cart: CartSnapshot; coupons: any; error: string }
  | GeneralApiProblem
export type RemoveFromCartResult =
  | { kind: "ok"; cart: CartSnapshot; error: string }
  | GeneralApiProblem
export type CheckoutResult = { kind: "ok"; result: any } | GeneralApiProblem
