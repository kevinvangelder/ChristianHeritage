import { GeneralApiProblem } from "./api-problem"
import { RecordingSnapshot } from "../../models/recording"
import { CartSnapshot } from "../../models/cart"

export type GetRecordingsResult =
  | { kind: "ok"; recordings: RecordingSnapshot[] }
  | GeneralApiProblem
export type CheckEmailResult = { kind: "ok"; emailExists: boolean } | GeneralApiProblem
export type SignUpResult =
  | { kind: "ok"; token: string; cart: CartSnapshot; purchaseHistory: any }
  | GeneralApiProblem
export type SignInResult =
  | { kind: "ok"; token: string; cart: CartSnapshot; purchaseHistory: any }
  | GeneralApiProblem
