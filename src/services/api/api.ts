import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api.config"
import * as Types from "./api.types"
import { transformRecordingSnapshots } from "./api.transform"

const ORG_ID = 136
const CONF_ID = 74

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

  onTokenExpired?: () => Promise<void>

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config

    this.onTokenExpired = () => new Promise(resolve => resolve())
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
    this.apisauce.addMonitor(response => {
      const { ERROR } = response.data
      if (ERROR && ERROR === "Customer Token not valid or expired. Please authenticate.")
        this.onTokenExpired()
    })
  }

  /**
   * Gets a list of repos.
   */
  async getRecordings(): Promise<Types.GetRecordingsResult> {
    // make the api call
    const body = new FormData()
    body.append("method", "getRecordings")
    body.append("oid", ORG_ID)
    body.append("returnformat", "json")
    body.append("cid", CONF_ID)
    body.append("limit", 100)
    this.apisauce.setHeaders({
      "Content-Type": `multipart/form-data; boundary=${body.boundary}`,
    })
    const response: ApiResponse<any> = await this.apisauce.post(`get.cfc`, body)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", recordings: transformRecordingSnapshots(response.data.data) }
    } catch (expecting) {
      return { kind: "bad-data" }
    }
  }

  async checkEmail(email): Promise<Types.CheckEmailResult> {
    const body = new FormData()
    body.append("method", "checkEmail")
    body.append("email", email)
    body.append("returnformat", "json")
    this.apisauce.setHeaders({
      "Content-Type": `multipart/form-data; boundary=${body.boundary}`,
    })
    const response: ApiResponse<any> = await this.apisauce.post(`cart.cfc`, body)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: "ok", emailExists: response.data || false }
    } catch (e) {
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
    items,
    coupons,
  ): Promise<Types.SignUpResult> {
    const body = new FormData()
    body.append("method", "createUser")
    body.append("returnformat", "json")
    body.append("email", email)
    body.append("password", password)
    body.append("phone", phone)
    body.append("firstName", firstName)
    body.append("lastName", lastName)
    body.append("address1", address1), body.append("address2", address2)
    body.append("city", city)
    body.append("state", state)
    body.append("zip", zip)
    if (items && items.length > 0) body.append("cart", items.map(i => i.RID).join(","))
    if (coupons && coupons.length > 0) body.append("coupons", coupons.join(","))
    this.apisauce.setHeaders({
      "Content-Type": `multipart/form-data; boundary=${body.boundary}`,
    })
    const response: ApiResponse<any> = await this.apisauce.post(`cart.cfc`, body)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return {
        kind: "ok",
        token: response.data.cToken,
        firstName: response.data.first,
        lastName: response.data.last,
        cart: response.data.cart,
        coupons: response.data.coupons,
        purchaseHistory: response.data.recordings,
        error: response.data.ERROR,
      }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async signIn(email, password, items, coupons): Promise<Types.SignInResult> {
    const body = new FormData()
    body.append("method", "authenticate")
    body.append("returnformat", "json")
    body.append("email", email)
    body.append("password", password)
    if (items && items.length > 0) body.append("cart", items.map(i => i.RID).join(","))
    if (coupons && coupons.length > 0) body.append("coupons", coupons.join(","))
    this.apisauce.setHeaders({
      "Content-Type": `multipart/form-data; boundary=${body.boundary}`,
    })
    const response: ApiResponse<any> = await this.apisauce.post("cart.cfc", body)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return {
        kind: "ok",
        token: response.data.cToken,
        firstName: response.data.first,
        lastName: response.data.last,
        cart: response.data.cart,
        coupons: response.data.coupons,
        purchaseHistory: response.data.recordings,
        error: response.data.ERROR,
      }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async reauthenticate(email, token, items, coupons): Promise<Types.ReauthenticateResult> {
    const body = new FormData()
    body.append("method", "authenticate")
    body.append("returnformat", "json")
    body.append("email", email)
    body.append("cToken", token)
    if (items && items.length > 0) body.append("cart", items.map(i => i.RID).join(","))
    if (coupons && coupons.length > 0) body.append("coupons", coupons.join(","))
    this.apisauce.setHeaders({
      "Content-Type": `multipart/form-data; boundary=${body.boundary}`,
    })
    const response: ApiResponse<any> = await this.apisauce.post("cart.cfc", body)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const { cToken, cart, coupons, recordings, ERROR } = response.data
      return {
        kind: "ok",
        token: cToken,
        firstName: response.data.first,
        lastName: response.data.last,
        cart: cart,
        coupons: coupons,
        purchaseHistory: recordings,
        error: ERROR,
      }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async checkCart(items, coupons, token): Promise<Types.CheckCartResult> {
    const body = new FormData()
    body.append("method", "checkCart")
    body.append("returnformat", "json")
    body.append("cart", items.map(i => i.RID).join(","))
    body.append("ctoken", token)
    body.append("coupons", coupons.join(","))
    this.apisauce.setHeaders({
      "Content-Type": `multipart/form-data; boundary=${body.boundary}`,
    })
    const response: ApiResponse<any> = await this.apisauce.post(`cart.cfc`, body)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return {
        kind: "ok",
        cart: response.data.cart,
        error: response.data.ERROR,
        coupons: response.data.coupons,
      }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async removeFromCart(rid, token): Promise<Types.RemoveFromCartResult> {
    const body = new FormData()
    body.append("method", "removeFromCart")
    body.append("returnformat", "json")
    body.append("ctoken", token)
    body.append("items", rid)
    this.apisauce.setHeaders({
      "Content-Type": `multipart/form-data; boundary=${body.boundary}`,
    })
    const response: ApiResponse<any> = await this.apisauce.post("cart.cfc", body)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return {
        kind: "ok",
        cart: response.data.cart,
        error: response.data.ERROR,
      }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async checkout(cardToken, coupons, token): Promise<Types.CheckoutResult> {
    const body = new FormData()
    body.append("method", "processOrder")
    body.append("returnformat", "json")
    body.append("ctoken", token)
    body.append("atoken", cardToken)
    body.append("coupons", coupons.join(","))
    body.append("test", "1")
    this.apisauce.setHeaders({
      "Content-Type": `multipart/form-data; boundary=${body.boundary}`,
    })
    const response: ApiResponse<any> = await this.apisauce.post("cart.cfc", body)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return {
        kind: "ok",
        result: response.data,
      }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }
}
