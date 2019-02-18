import { types } from "mobx-state-tree"
import { RecordingModel, Recording, RecordingSnapshot } from "../recording"
import { withEnvironment } from "../extensions"

/**
 * An RecordingStore model.
 */
export const RecordingStoreModel = types
  .model("RecordingStore")
  .props({
    recordings: types.optional(types.array(RecordingModel), []),
  })
  .extend(withEnvironment)
  .actions(self => ({
    setRecordings: (value: RecordingSnapshot[] | Recording[]) => {
      self.recordings = value as any
    },
  }))
  .actions(self => ({
    fetchRecordings: async () => {
      try {
        const { kind, recordings } = await self.environment.api.getRecordings()

        if (kind === "ok") {
          self.setRecordings(recordings)
        }
      } catch (e) {
        console.tron.log(e.message)
      }
    },
  }))
  .actions(self => ({
    findRecording: async (RECID): Promise<RecordingModel | boolean> => {
      const recording = self.recordings.find(r => r.RECID === RECID)
      if (recording) return recording
      await self.fetchRecordings()
      const rec = self.recordings.find(r => r.RECID === RECID)
      if (rec) return rec
      return false
    },
  }))

/**
 * The RecordingStore instance.
 */
export type RecordingStore = typeof RecordingStoreModel.Type

/**
 * The data of an RecordingStore.
 */
export type RecordingStoreSnapshot = typeof RecordingStoreModel.SnapshotType
