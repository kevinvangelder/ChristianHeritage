import { types } from "mobx-state-tree"

/**
 * An Recording model.
 */
export const RecordingModel = types
  .model("Recording")
  .props({
    LOCATION: types.string,
    SET: types.boolean,
    PRICE: types.number,
    ORG: types.string,
    RECID: types.string,
    RID: types.number,
    AVAILABLE: types.boolean,
    TOPICS: types.frozen,
    DESCRIPTION: types.string,
    TITLE: types.string,
    SPEAKERS: types.frozen,
    CID: types.number,
    SESSIONS: types.optional(types.frozen, []),
  })
  .views(self => ({
    get speakerNames() {
      const speakers = self.SPEAKERS
      const names = speakers.map(s => `${s.FIRSTNAME} ${s.LASTNAME}`)
      return names.join(", ")
    },
  }))

type RecordingType = typeof RecordingModel.Type
export interface Recording extends RecordingType {}
type RecordingSnapshotType = typeof RecordingModel.SnapshotType
export interface RecordingSnapshot extends RecordingSnapshotType {}
