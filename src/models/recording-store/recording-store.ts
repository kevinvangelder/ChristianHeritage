import { types } from "mobx-state-tree"
import { RecordingModel } from "../recording"

/**
 * An RecordingStore model.
 */
export const RecordingStoreModel = types.model("RecordingStore").props({
  recordings: types.optional(types.array(RecordingModel), []),
})

/**
 * The RecordingStore instance.
 */
export type RecordingStore = typeof RecordingStoreModel.Type

/**
 * The data of an RecordingStore.
 */
export type RecordingStoreSnapshot = typeof RecordingStoreModel.SnapshotType
