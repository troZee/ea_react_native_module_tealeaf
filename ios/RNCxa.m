//
// Copyright (C) 2020 Acoustic, L.P. All rights reserved.
//
// NOTICE: This file contains material that is confidential and proprietary to
// Acoustic, L.P. and/or other developers. No license is granted under any intellectual or
// industrial property rights of Acoustic, L.P. except as may be provided in an agreement with
// Acoustic, L.P. Any unauthorized copying or distribution of content from this file is
// prohibited.

//

#import "RNCxa.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import <React/UIView+React.h>
#import <React/RCTUtils.h>
#import <React/RCTScrollView.h>
#import <React/RCTUIManager.h>
#if __has_include(<React/RCTUIManagerUtils.h>)
    #import <React/RCTUIManagerUtils.h>
#endif
#import <React/RCTBridge.h>
#import <EOCore/EOCore.h>
#import <EOCore/EOApplicationHelper.h>
#import <TealeafReactNative/TealeafBridgingHeader.h>
#import <CoreLocation/CoreLocation.h>
#import <Foundation/Foundation.h>

@implementation RNTealeafDynamicLoad
+ (void)load{
    [[TLFApplicationHelper sharedInstance] enableTealeafFramework];
}
@end

@implementation RNCxa
// To export a module named RNCxa
RCT_EXPORT_MODULE()

-(id)init {
    if ( self = [super init] ) {
        // init variables
        _countViews = [NSNumber numberWithInt:1];
        _noViews = [NSNumber numberWithInt:0];
        _start = [NSDate date];
        _end = _start;
        _currentPageName = @"batchDidComplete";
        _work = dispatch_block_create(0, ^{
                        NSLog(@"batchDidComplete");
                });
    }
    return self;
}


@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue {
    return RCTGetUIManagerQueue();
    //return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup {
    // To indicate it needs to use UI thread directly.
    return YES;
//    return NO;
}

- (void)batchDidComplete {
}

/*!
 * @discussion Sets the module's configuration item from AdvancedConfig.json or BasicConfig.plist that matches the specified key as a BOOL value.
 * @param key - Key to update value in configuration settings.
 * @param value - Value to use.
 * @param moduleName - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.
 * @return Whether it was able to set the value as Boolean value.
 */
RCT_EXPORT_METHOD(setBooleanConfigItemForKey:(NSString *)key value:(id)value forModuleName:(NSString *)moduleName resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    moduleName = [self testModuleName:moduleName];
    id result =  [NSNumber numberWithBool:[[EOApplicationHelper sharedInstance] setConfigItem:key value:value forModuleName:moduleName]];
    [self updateResult:result resolver:resolve rejecter:reject];
}

/*!
 * @discussion Sets the module's configuration item from AdvancedConfig.json or BasicConfig.plist that matches the specified key as a NString value.
 * @param key - Key to update value in configuration settings.
 * @param value - Value to use.
 * @param moduleName - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.
 * @return Whether it was able to set the value as Boolean value.
 */
RCT_EXPORT_METHOD(setStringItemForKey:(NSString *)key value:(id)value forModuleName:(NSString *)moduleName resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    moduleName = [self testModuleName:moduleName];
    id result = [NSNumber numberWithBool:[[EOApplicationHelper sharedInstance] setConfigItem:key value:value forModuleName:moduleName]];
    [self updateResult:result resolver:resolve rejecter:reject];
}

/*!
 * @discussion Sets the module's configuration item from AdvancedConfig.json or BasicConfig.plist that matches the specified key as a NSNumber value.
 * @param key - Key to update value in configuration settings.
 * @param value - Value to use.
 * @param moduleName - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.
 * @return Whether it was able to set the value as Boolean value.
 */
RCT_EXPORT_METHOD(setNumberItemForKey:(NSString *)key value:(id)value forModuleName:(NSString *)moduleName resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    moduleName = [self testModuleName:moduleName];
    id result = [NSNumber numberWithBool:[[EOApplicationHelper sharedInstance] setConfigItem:key value:value forModuleName:moduleName]];
    [self updateResult:result resolver:resolve rejecter:reject];
}

/*!
 * @discussion Gets the module's configuration item from AdvancedConfig.json or BasicConfig.plist that matches the specified key as a BOOL value.
 * @param key - Key to update value in configuration settings.
 * @param moduleName - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.
 * @return The value of the configuration item key as a BOOL value.
 */
RCT_EXPORT_METHOD(getBooleanConfigItemForKey:(NSString *)key forModuleName:(NSString *)moduleName resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    moduleName = [self testModuleName:moduleName];
    id result = [NSNumber numberWithBool:[[EOApplicationHelper sharedInstance] getBOOLconfigItemForKey:key withDefault:NO forModuleName:moduleName]];
    [self updateResult:result resolver:resolve rejecter:reject];
}

/*!
 * @discussion Gets the module's configuration item from AdvancedConfig.json or BasicConfig.plist that matches the specified key as a NString value.
 * @param key - Key to update value in configuration settings.
 * @param moduleName - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.
 * @return The value of the configuration item key as a NString value.
 */
RCT_EXPORT_METHOD(getStringItemForKey:(NSString *)key forModuleName:(NSString *)moduleName resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    moduleName = [self testModuleName:moduleName];
    id result = [[EOApplicationHelper sharedInstance] getStringItemForKey:key withDefault:nil forModuleName:moduleName];
    [self updateResult:result resolver:resolve rejecter:reject];
}

/*!
 * @discussion Gets the module's configuration item from AdvancedConfig.json or BasicConfig.plist that matches the specified key as a NSNumber value.
 * @param key - Key to update value in configuration settings.
 * @param moduleName - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.
 * @return The value of the configuration item key as a NSNumber value.
 */
RCT_EXPORT_METHOD(getNumberItemForKey:(NSString *)key forModuleName:(NSString *)moduleName resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    moduleName = [self testModuleName:moduleName];
    id result = [[EOApplicationHelper sharedInstance] getNumberItemForKey:key withDefault:nil forModuleName:moduleName];
    [self updateResult:result resolver:resolve rejecter:reject];
}

/*!
 @discussion Log custom event.
 @param eventName - the name of the event to be logged this will appear in the posted json.
 @param values - additional key value pairs to be logged with the message.
 @param level - set a custom log level to the event.
 @return Boolean value will return whether it was able to log the custom event.
 */
RCT_EXPORT_METHOD(logCustomEvent:(NSString *)eventName values:(NSDictionary *)values level:(nonnull NSNumber*)level resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    id result = [NSNumber numberWithBool:[[TLFCustomEvent sharedInstance] logEvent:eventName values:values level:[self getLogLevel:level]]];
    [self updateResult:result resolver:resolve rejecter:reject];
}

/*!
 @discussion Log exception.
 @param message - the message of the error/exception to be logged this will appear in the posted json.
 @param stackInfo - the stack trace to be logged with the message.
 @return Boolean value will return whether it was able to log the exception event.
 */
RCT_EXPORT_METHOD(logExceptionEvent:(NSString *)message stack:(NSString *)stackInfo resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    id result = [NSNumber numberWithBool:[[TLFCustomEvent sharedInstance] logExceptionEvent:@"React Plugin" message:message stacktrace:stackInfo isUnhandled:YES]];
    [self updateResult:result resolver:resolve rejecter:reject];
}

#pragma mark - Location
/*!
 @discussion Requests that the framework logs a geographic location
 @return Boolean value will return whether it was able to log the location event.
 */
RCT_EXPORT_METHOD(logLocation:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    CLLocation *location = nil;
    id result = [NSNumber numberWithBool:[[TLFCustomEvent sharedInstance] logLocation:location]];
    [self updateResult:result resolver:resolve rejecter:reject];
}

/*!
 @discussion Requests that the framework logs the location information. This is not logged automatically to avoid making unnecessary location updates and to protect the privacy of your application's users by ensuring that location is reported only when the app has some other reason to request it. Your application must include the Core Location framework.
 @param lat - The geographic latitude of the user.
 @param lng - The geographic longitude of the user.
 @param level - The monitoring level of the event.
 @return Boolean value will return whether it was able to log the location event.
 */
RCT_EXPORT_METHOD(logLocationWithLatitudeLongitude:(double)lat longitude:(double)lng level:(nonnull NSNumber*)level resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    id result = [NSNumber numberWithBool:[[TLFCustomEvent sharedInstance] logLocationUpdateEventWithLatitude:lat longitude:lng level:[self getLogLevel:level]]];
    [self updateResult:result resolver:resolve rejecter:reject];
}

#pragma mark - UIControls
/**
 @discussion Requests that the framework logs the click events on any UIControl or UIView. Click event is a normalized form of touch up inside event.
 @param target - Native node handle for a component from React Native.
 @return Boolean value will return whether it was able to log the click event.
 */
RCT_EXPORT_METHOD(logClickEvent:(nonnull NSNumber *)target resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
        // Get view
        UIView *view;
        
        if ([target intValue] == -1) {
            // Use main view?
            //            UIWindow *window = [[UIApplication sharedApplication] keyWindow];
            //            view = window.rootViewController.view;
        } else {
            view = viewRegistry[target];
        }
        
        if (!view) {
            reject(RCTErrorUnspecified, [NSString stringWithFormat:@"No view found with reactTag: %@", target], nil);
            return;
        }
        
        id result = [NSNumber numberWithBool:[[TLFCustomEvent sharedInstance] logClickEvent:view data:nil]];
        [self updateResult:result resolver:resolve rejecter:reject];
    }];
}

#pragma mark - Screenview
/*!
 @discussion Requests that the framework logs an application context for load.
 @param logicalPageName - Page name or title e.g. "Login View Controller"; Must not be empty.
 @param referrer - Page name or title that loads logicalPageName. Could be empty.
 @return Boolean value will return whether it was able to log the screenview event.
 */
RCT_EXPORT_METHOD(logScreenViewContextLoad:(NSString*)logicalPageName referrer:(NSString*)referrer resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    id result = [NSNumber numberWithBool:[[TLFCustomEvent sharedInstance] logScreenViewContext:logicalPageName applicationContext:TLFScreenViewTypeLoad referrer:referrer]];
    [self updateResult:result resolver:resolve rejecter:reject];
}

/*!
 @discussion Requests that the framework logs an application context for unload.
 @param logicalPageName - Page name or title e.g. "Login View Controller"; Must not be empty.
 @param referrer - Page name or title that loads logicalPageName. Could be empty.
 @return Boolean value will return whether it was able to log the screenview event.
 */
RCT_EXPORT_METHOD(logScreenViewContextUnload:(NSString*)logicalPageName referrer:(NSString*)referrer resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    id result = [NSNumber numberWithBool:[[TLFCustomEvent sharedInstance] logScreenViewContext:logicalPageName applicationContext:TLFScreenViewTypeUnload referrer:referrer]];
    [self updateResult:result resolver:resolve rejecter:reject];
}

/**
 @discussion Requests that the framework logs the layout of the screen
 @param name - Custom name to associate with the viewcontroller.
 @return Boolean value will return whether it was able to log the screen layout event.
 */
RCT_EXPORT_METHOD(logScreenLayout:(NSString*)name resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        RCTLogInfo(@"logScreenLayout Name:%@", name);
        UIViewController *uv = nil;
        UIViewController *topController = [UIApplication sharedApplication].keyWindow.rootViewController;
        while (topController.presentedViewController) {
            topController = topController.presentedViewController;
        }
        if (topController) {
            uv = topController;
        }
        
        
        id result = [NSNumber numberWithBool:[[TLFCustomEvent sharedInstance] logScreenLayoutWithViewController:uv andDelay:0.5 andName:name]];
        [self updateResult:result resolver:resolve rejecter:reject];
    });
}

///**
// Requests that the framework logs the layout of the screen
// @param viewController - UIViewController object whose layout needs to be logged.
// @param views - Array of views that will be logged along with the provided viewController.
// @param delay - number of seconds to wait before logging the view.
// @param name - Custom name to associate with the view Controller
// @return if the event was successfully logged or not.
// */
//RCT_EXPORT_METHOD(logScreenLayoutWithDelay:(NSString*)name andDelay:(nonnull NSNumber *)delay resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject) {
//    dispatch_async(dispatch_get_main_queue(), ^{
//        UIViewController *uv = nil;
//        UIViewController *topController = [UIApplication sharedApplication].keyWindow.rootViewController;
//        /* Why a loop ? Do we want to go all the way back in view hierarchy ? In anycase its an infinite loop
//         This change was made for RTC 275353 : "Instrumentation :- Wrong background when we add items to the cart from the search category"
//         */
//        while (topController.presentedViewController) {
//            topController = topController.presentedViewController;
//        }
//        if (topController) {
//            uv = topController;
//        }
//
//        id result;
//        //UIViewController *uv = [self getDefaultVC:nil]; //[[TLFCustomEvent sharedInstance] getCurrentDidAppearViewController];
//        //        if (delay.floatValue <= 0) {
//        //            result = [NSNumber numberWithBool:[[TLFCustomEvent sharedInstance] logScreenLayoutWithViewController:uv andName:name]];
//        //        } else {
//        result = [NSNumber numberWithBool:[[TLFCustomEvent sharedInstance] logScreenLayoutWithViewController:uv andDelay:0.5 andName:name]];
//        //        }
//        [self updateResult:result resolver:resolve rejecter:reject];
//    });
//}

- (NSString*)testModuleName:(NSString*)moduleName {
    if ([moduleName caseInsensitiveCompare:@"Tealeaf"]) {
        return moduleName = @"TLFCoreModule";
    }
    return moduleName;
}

- (void)updateResult:(id)result resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    if (result) {
        resolve(result);
    } else {
        NSError *error;
        reject(@"", @"", error);
    }
}

- (kTLFMonitoringLevelType)getLogLevel:(nonnull NSNumber*)level {
    kTLFMonitoringLevelType monitorLevel = kTLFMonitoringLevelIgnore;
    if (level.intValue == kTLFMonitoringLevelIgnore) {
        monitorLevel = kTLFMonitoringLevelIgnore;
    } else if (level.intValue == kTLFMonitoringLevelCellularAndWiFi) {
        monitorLevel = kTLFMonitoringLevelCellularAndWiFi;
    } else if (level.intValue >= kTLFMonitoringLevelWiFi) {
        monitorLevel = kTLFMonitoringLevelWiFi;
    }
    return monitorLevel;
}
@end
