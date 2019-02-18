import { RecordingSnapshot } from "../../models/recording"

export const transformRecordingSnapshots = (rawRecordings: any) => {
  const recordings: RecordingSnapshot[] = rawRecordings.map(bid => {
    const { SET, AVAILABLE, ...rest } = bid
    return {
      SET: SET === 1,
      AVAILABLE: AVAILABLE === 1,
      ...rest,
    }
  })
  return recordings
}
