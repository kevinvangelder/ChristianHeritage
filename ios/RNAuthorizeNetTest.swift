import Foundation
import AuthorizeNetAccept

@objc(RNAuthorizeNetTest)

class RNAuthorizeNetTest: NSObject {
  func methodQueue() -> DispatchQueue {
    return DispatchQueue.main
  }
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  private let LOGIN_ID: String = "LOGIN_ID"
  private let CLIENT_KEY: String = "CLIENT_KEY"
  private let CARD_NO: String = "CARD_NO"
  private let EXPIRATION_MONTH: String = "EXPIRATION_MONTH"
  private let EXPIRATION_YEAR: String = "EXPIRATION_YEAR"
  private let CVV_NO: String = "CVV_NO"
  private let ZIP_CODE: String = "ZIP_CODE"
  private let ACCOUNT_HOLDER_NAME: String = "ACCOUNT_HOLDER_NAME"
  private let ACCOUNT_HOLDER_EMAIL: String = "ACCOUNT_HOLDER_EMAIL"
  private let DATA_DESCRIPTOR: String = "DATA_DESCRIPTOR"
  private let DATA_VALUE: String = "DATA_VALUE"

  @objc func getTokenWithRequestForCard(_ cardValues: Dictionary<String, String>, isProduction: Bool, callback: @escaping RCTResponseSenderBlock) -> Void {
    let handler = AcceptSDKHandler(environment: isProduction ? AcceptSDKEnvironment.ENV_LIVE : AcceptSDKEnvironment.ENV_TEST)
    let request = AcceptSDKRequest()
    request.merchantAuthentication.name = cardValues[LOGIN_ID] ?? ""
    request.merchantAuthentication.clientKey = cardValues[CLIENT_KEY] ?? ""
    request.securePaymentContainerRequest.webCheckOutDataType.token.cardNumber = cardValues[CARD_NO] ?? ""
    request.securePaymentContainerRequest.webCheckOutDataType.token.expirationMonth = cardValues[EXPIRATION_MONTH] ?? ""
    request.securePaymentContainerRequest.webCheckOutDataType.token.expirationYear = cardValues[EXPIRATION_YEAR] ?? ""
    request.securePaymentContainerRequest.webCheckOutDataType.token.cardCode = cardValues[CVV_NO] ?? ""

    handler?.getTokenWithRequest(request, successHandler: { token in
      //NSLog(@"success %@", token.getOpaqueData.getDataValue);
      let responsDict = [
        self.DATA_DESCRIPTOR: token.getOpaqueData().getDataDescriptor,
        self.DATA_VALUE: token.getOpaqueData().getDataValue()
        ] as [String : Any]
      callback([NSNumber(value: true), responsDict])
    }, failureHandler: { error in
      callback([NSNumber(value: false), "Error while add card."])
    })
  
  }
}
