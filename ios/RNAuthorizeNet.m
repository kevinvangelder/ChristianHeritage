//  RNAuthorizeNetBridge.m

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(RNAuthorizeNet, RNAuthorizeNetTest, NSObject)
RCT_EXTERN_METHOD(getTokenWithRequestForCard: (NSDictionary *)cardValues isProduction:(BOOL)isProduction callback:(RCTResponseSenderBlock)callback)
@end
