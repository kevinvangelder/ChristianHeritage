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
    COUPON: types.maybe(types.string),
  })
  .views(self => ({
    get speakerNames() {
      const speakers = self.SPEAKERS
      const names = speakers.map(s => `${s.FIRSTNAME} ${s.LASTNAME}`)
      return names.join(", ")
    },
    get displayPrice() {
      return self.PRICE.toFixed(2)
    },
  }))
  .actions(self => ({
    setPrice: (value: number) => {
      self.PRICE = value
    },
    setCoupon: (value: string) => {
      self.COUPON = value
    },
  }))

type RecordingType = typeof RecordingModel.Type
export interface Recording extends RecordingType {}
type RecordingSnapshotType = typeof RecordingModel.SnapshotType
export interface RecordingSnapshot extends RecordingSnapshotType {}

export const FakeRecordingModel = types
  .model("FakeRecording")
  .props({
    rid: types.number,
    coupon: types.string,
    set: types.boolean,
    price: types.number,
    recID: types.string,
    title: types.string,
  })
  .views(self => ({
    get displayPrice() {
      return self.price.toFixed(2)
    },
  }))

type FakeRecordingType = typeof FakeRecordingModel.Type
export interface FakeRecording extends FakeRecordingType {}
type FakeRecordingSnapshotType = typeof FakeRecordingModel.SnapshotType
export interface FakeRecordingSnapshot extends FakeRecordingSnapshotType {}
