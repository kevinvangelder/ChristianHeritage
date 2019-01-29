import { GeneralApiProblem } from "./api-problem"
import { RecordingSnapshot } from "../../models/recording"

export type GetRecordingsResult =
  | { kind: "ok"; recordings: RecordingSnapshot[] }
  | GeneralApiProblem
