import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api.config"
import * as Types from "./api.types"
import { transformRecordingSnapshots } from "./api.transform"

const ORG_ID = 136
const CONF_ID = 0

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {},
    })
  }

  /**
   * Gets a list of repos.
   */
  async getRecordings(): Promise<Types.GetRecordingsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `get.cfc?method=getRecordings&oid=${ORG_ID}&returnformat=json&cid=${CONF_ID}`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", recordings: transformRecordingSnapshots(response.data.data) }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async checkEmail(email): Promise<Types.CheckEmailResult> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `cart.cfc?method=checkEmail&email=${email}&returnformat=json`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: "ok", emailExists: response.data || false }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async signUp(
    email,
    password,
    phone,
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    cart = {},
  ): Promise<Types.SignUpResult> {
    const joinSegments = items => {
      Object.keys(items).map(k => {
        if (items[k].length === 0) return
        return `&${k}=${JSON.stringify(items[k])}`
      })
    }
    const response: ApiResponse<any> = await this.apisauce.post(
      `cart.cfc?method=createUser&email=${email}&password=${password}&phone=${phone}${joinSegments({
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
        cart,
      })}`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return {
        kind: "ok",
        token: response.data.token,
        cart: response.data.cart,
        purchaseHistory: response.data.purchasedRecordings,
      }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async signIn(email, password, cart = {}): Promise<Types.SignInResult> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `cart.cfc?method=authenticate&email=${email}&password=${password}${cart &&
        `&cart=${JSON.stringify(cart)}`}`,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return {
        kind: "ok",
        token: response.data.token,
        cart: response.data.cart,
        purchaseHistory: response.data.purchasedRecordings,
      }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
