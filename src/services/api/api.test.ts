// apisauce
const mockApisauceHead = jest.fn()
const mockApisauceGet = jest.fn()
const mockApisaucePut = jest.fn()
const mockApisaucePost = jest.fn()
const mockApisaucePatch = jest.fn()
const mockApisauceDelete = jest.fn()
const mockApisauceCreate = jest.fn().mockReturnValue({
  head: mockApisauceHead,
  get: mockApisauceGet,
  put: mockApisaucePut,
  post: mockApisaucePost,
  patch: mockApisaucePatch,
  delete: mockApisauceDelete,
  setHeader: jest.fn(),
  deleteHeader: jest.fn(),
})
jest.mock("apisauce", () => ({
  create: mockApisauceCreate,
}))
global.console = {
  tron: {
    error: jest.fn(),
  },
} as any

// Jest doesn't know about FormData :(
//@ts-ignore
global.FormData = require("FormData")

import { Api } from "./api"
import { VALID_CONFIG, responses } from "./api.fixtures"

describe("constructor", () => {
  const api = new Api(VALID_CONFIG)

  it("remembers the config", () => {
    expect(api.config).toBe(VALID_CONFIG)
  })
})

describe("setup()", () => {
  it("configures apisauce", async () => {
    const api = new Api(VALID_CONFIG)
    await api.setup()
    expect(mockApisauceCreate).toBeCalledWith({
      baseURL: VALID_CONFIG.url,
      timeout: VALID_CONFIG.timeout,
      headers: {},
    })
  })
})

describe("getRecordings()", () => {
  let api: Api
  const { PASS, BAD_DATA } = responses.getRecordings

  beforeEach(async () => {
    api = new Api(VALID_CONFIG)
    mockApisaucePost.mockReset()

    await api.setup()
  })

  it("handles bad data", async () => {
    mockApisaucePost.mockReturnValue(BAD_DATA)
    const response: any = await api.getRecordings()

    expect(response.kind).toEqual("bad-data")
  })

  it("transforms properly", async () => {
    mockApisauceGet.mockReturnValue(PASS)
    const response: any = await api.getRecordings()

    expect(response.recordings.length).toEqual(PASS.data.data.length)
  })
})
