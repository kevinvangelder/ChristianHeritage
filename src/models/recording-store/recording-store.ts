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
    recordingsUpdated: types.maybe(types.Date),
  })
  .extend(withEnvironment)
  .actions(self => ({
    setRecordings: (value: RecordingSnapshot[] | Recording[]) => {
      self.recordings = value as any
    },
    setRecordingsUpdated: (value: Date) => {
      self.recordingsUpdated = value
    },
  }))
  .actions(self => ({
    fetchRecordings: async () => {
      try {
        const { kind, recordings } = await self.environment.api.getRecordings()

        if (kind === "ok") {
          self.setRecordings(recordings)
          self.setRecordingsUpdated(new Date())
        }
      } catch (e) {
        console.tron.log(e.message)
      }
    },
  }))
  .actions(self => ({
    findRecording: (RID): RecordingModel => {
      // if (self.recordings) {
      const recording = self.recordings.find(r => `${r.RID}` === `${RID}`)
      if (recording) return recording
      // } else {
      //   await self.fetchRecordings()
      //   const rec = self.recordings.find(r => r.RID === RID)
      //   if (rec) return rec
      //   return false
      // }
    },
  }))
  .views(self => ({
    get getSets() {
      return self.recordings.filter(r => r.SET === true)
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
