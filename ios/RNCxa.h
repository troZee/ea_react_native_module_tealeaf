//
//  Licensed Materials - Property of IBM
//  (C) Copyright IBM Corp. 2019
//  US Government Users Restricted Rights - Use, duplication or disclosure
//  restricted by GSA ADP Schedule Contract with IBM Corp.
//

#if __has_include(<React/RCTBridgeModule.h>)
    #import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
    #import "RCTBridgeModule.h"
#else
    // Required when used as a Pod in a Swift project
    #import "React/RCTBridgeModule.h"
#endif
@interface RNCxa : NSObject <RCTBridgeModule>
@end
@interface RNTealeafDynamicLoad : NSObject
@end
