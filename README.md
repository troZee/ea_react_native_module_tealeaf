
# react-native-acoustic-ea-tealeaf
---
## Features
- Will automatically capture pages after they completed by React Javascript Bridge.
- Will log ReactLayoutTime via custom event based on when component render and completion of React Javascript Bridge, but this will requiere of manual instrumentation to get correct values.
---
## Getting started

**This module uses only enhanced replay. This module is no longer supported: https://www.npmjs.com/package/react-native-wcxa**

This will add it to your package.json file:

`$ npm install --save react-native-acoustic-ea-tealeaf`

or

`$ yarn add react-native-acoustic-ea-tealeaf -E`

Since React Native 0.60 and higher, [autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) makes the installation process simpler.

-----
### Manual installation using React Native 0.59.9 and lower

This will add it to your iOS Xcode project and Android Studio project:

`$ react-native link react-native-acoustic-ea-tealeaf`

To upgrade node_modules and get latest call:

`$ npm install`
___
### React

In order to capture correctly screen tracking based on [React Navigation v5](https://reactnavigation.org/docs/screen-tracking/). Please add the following:

#### Syntax added to App.js
```javascript
import {NativeModules, findNodeHandle, Platform} from 'react-native';
const Tealeaf = NativeModules.RNCxa;
import {TLTRN} from "../node_modules/react-native-acoustic-ea-tealeaf/lib/TLTRN";
import { useRef } from 'react';

let currentScreen = "Home";
let prevScreen = null;
// Turn off for now due to performance - added logic in NavigationContainer instead
// TLTRN.init(currentScreen, 0);

export default () => {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  return (
    <Root>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            // The line below uses the expo-firebase-analytics tracker
            // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
            // Change this line to use another Mobile analytics SDK
            console.log("currentScreen:", currentRouteName);
            // set page name
            TLTRN.currentScreen = currentRouteName;
            // screen capture page
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
              await Tealeaf.logScreenLayout(currentRouteName);
            }
          }

          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}
      >
        <StackNav/>
      </NavigationContainer>
    </Root>
  );
};
```
---
In order to capture correctly screen tracking based on [React Navigation v1](https://reactnavigation.org/docs/1.x/screen-tracking/). Please add the following:

#### Syntax added to App.js
```javascript
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;
import {TLTRN} from "../node_modules/react-native-acoustic-ea-tealeaf/lib/TLTRN";

let currentScreen = "Home";
let prevScreen = null;
// Initialize the library with starting page and no debug information.
TLTRN.init(currentScreen, 0);

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export default () =>
  <Root>
    <AppContainer 
        onNavigationStateChange={(prevState, currentState) => {
            currentScreen = getCurrentRouteName(currentState);
            prevScreen = getCurrentRouteName(prevState);

            if (prevScreen !== currentScreen) {
                // the line below uses the Tealeaf library to get latest screen
                // console.log("currentScreen:",currentScreen);
                TLTRN.currentScreen = currentScreen;
            }
        }}
    />
  </Root>;
```
---
### Build configuration on iOS for React Native 0.59.9 and lower

## Using Cocopods
If the CocoaPods package manager is new to you, please first review its [installation guide](https://guides.cocoapods.org/using/getting-started.html). Setup your Podfile (found at ios/Podfile as below, replacing all references to _YOUR_PROJECT_TARGET_ with your project target (it's the same as project name by default).
#### Template - Podfile
```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target '_YOUR_PROJECT_TARGET_' do
  # Comment the next line if you don't want to use dynamic frameworks
  # use_frameworks!

  rn_path = '../node_modules/react-native'
  rn_tealeaf_path = '../node_modules/react-native-acoustic-ea-tealeaf'

  pod 'yoga', path: "#{rn_path}/ReactCommon/yoga"
  pod 'React', path: rn_path, subspecs: [
    'Core',
    'CxxBridge',
    'DevSupport',
    'RCTActionSheet',
    'RCTAnimation',
    'RCTGeolocation',
    'RCTImage',
    'RCTLinkingIOS',
    'RCTNetwork',
    'RCTSettings',
    'RCTText',
    'RCTVibration',
    'RCTWebSocket'
  ]
  pod 'DoubleConversion', :podspec => "#{rn_path}/third-party-podspecs/DoubleConversion.podspec"
  pod 'glog', :podspec => "#{rn_path}/third-party-podspecs/GLog.podspec"
  pod 'Folly', :podspec => "#{rn_path}/third-party-podspecs/Folly.podspec"

  pod 'react-native-acoustic-ea-tealeaf', path: rn_tealeaf_path

end
```
Then to install pods run:
```javascript
cd ios
pod install
```

## Not using Cocopods
You might have issues with `react-native link react-native-acoustic-ea-tealeaf` on iOS. You will need to link **react-native-acoustic-ea-tealeaf** by dragging from **/node_modules/react-native-acoustic-ea-tealeaf/ios/RNCxa.xcodeproj** to **xCode libraries location**.

![](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/screenshots/move_RNCxa_project.png)


You will need find the **static libraries** and **resource bundles** that can be found at */node_modules/react-native-acoustic-ea-tealeaf/ios/Tealeaf*.

![](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/screenshots/find_libraries_resources.png)

Copy **static libraries** and **resource bundles** to your react native application to have access to them for the build. In this example, it is **NativebaseKitchenSink**. **<span style="color:blue">This is a new folder in your project. Do not link the one in the */node_modules/react-native-acoustic-ea-tealeaf/ios/Tealeaf* otherwise, you will have link issues of not finding items.**</span>

![](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/screenshots/add_libraries_resources.png)

Link the following libraries: **WebKit.framework** from Apple, **EOCore.framework** and **TealeafReactNative.framework** from **/Your Project/Tealeaf** into application. Also review that **libRNCxa.a** is also linked.

![](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/screenshots/link_libraries.png)

Add **bundle resources** that will need to be copied which are **TLFResources.bundle** and **EOCoreSettings.bundle** from **/Your Project/Tealeaf** into application.

![](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/screenshots/add_resources.png)

Add **environmental variables**: 
* **EODebug** and **TLF_DEBUG** will help debugging. 
* If using latest xCode 10 and new simulator add Name **OS_ACTIVITY_MODE** with Value **disable**. <span style="color:red">But this will block xCode console information for debugging library. Please use an older simulator and have **OS_ACTIVITY_MODE** not selected.</span>

Note: **TLF_AUTO_ENABLE** is no longer needed as of version 7.6.0.

![](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/screenshots/add_environment_variables.png)

You will also need to open **TealeafBasicConfig.plist** to adjust **AppKey** and **PostMessageUrl**.

![](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/screenshots/adjust_TLFResources_bundle.png)

---
### Build configuration on Android

Manual installation

Tealeaf React-Native Android module is built with Android Studio 3.2.1, and compiled against gradle version 4.6(3.2.1).


## Skip this if Android Studio project already exists (YourApp/android):
```javascript
`$ react-native upgrade`

`$ react-native link react-native-acoustic-ea`    
```

## Load required Javascript Bundle index.android.bundle under assets folder. Create directory assets if project does not contain it:
```javascript
(Open terminal in project directory) 

`$ mkdir android/app/src/main/assets`
```

## Create the bundle and put under assets(Required when app's Javascript code changes)
```javascript
`$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
```

## Open Android Studio Project
Follow IDE instructions to update plugin or dependency requirements.

## Insert required permission in androidmanifest.xml file

```javascript
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>

<application
      android:usesCleartextTraffic="true"
```

## Insert if Geo location logging is needed
```javascript
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

## Setup Tealeaf Gesture in Android MainActivity.java class
Insert below code snippet in MainActivity for Gesture events capturing:

```javascript
public boolean dispatchTouchEvent(MotionEvent e)
    {
        Tealeaf.dispatchTouchEvent(this, e);
        return super.dispatchTouchEvent(e);
    }
```
You will also need to open **TealeafBasicConfig.properties** to adjust **AppKey** and **PostMessageUrl**.

![](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/screenshots/TealeafBasicConfig_appkey.png)

## Installation complete, run your app
```javascript
`$ react-native run-android`
```

#### Known issues
1) Screen capture in replay sometimes display overlapping items which is expected when Tealeaf captures UI state during animation.  It's recommended to set delay value from app's Javascript code.
2) In Logcat shows error Invalid IDs such as 0x00000001. Please ignore since React-Native app doesn't generate all resource Ids mapping.
3) Android compile issues.  Please see the example app for reference on common setup:

    NativeBase-KitchenSink/Example/android

---
### React Integration

#### Getting correct ReactLayoutTime values

- In order to get correct ReactLayoutTime, you will need to set current screen
 name during render method manually in the React pages.

#### Syntax
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

try {
  var result = await Tealeaf.setCurrentScreenName("HomePage");
  console.log("setCurrentScreenName", result);
} catch (e) {
  console.error(e);
}
```

#### Example React Page Instrumented
 ```javascript
// Example:
import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text
} from "native-base";
import styles from "./styles";

// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

class Header1 extends Component {
  render() {
    Tealeaf.setCurrentScreenName("HomePage");
    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Button onPress={() => this.props.navigation.goBack()}>
            <Text>Back</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default Header1;

```
---

## SDK Usage

### Declaration Use Of WCXA React Native Module
You will need to declare a module object to be able to use it. 

**Note:** *You will need to use [findNodeHandle](https://facebook.github.io/react-native/docs/direct-manipulation#measurelayoutrelativetonativenode-onsuccess-onfail), which can be used to get native node handle for a component.*

#### Syntax
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;
```

#### Example
The full example can also be reviewed at https://github.com/acoustic-analytics/ea_react_native_module/blob/master/Example/NativeBase-KitchenSink/src/screens/checkbox/index.js

### Log Screen View Name **(Type 2)**
You will need to the following in order to log loading a new screen view name or unloading a screen view name, which will get captured as a Tealeaf type 2 message object. 

#### Syntax
* **logicalPageName** - Page name or title e.g. "Login View Controller"; Must not be empty.
* **referrer** - Page name or title that loads logicalPageName. Could be empty.
```
logScreenViewContextLoad(logicalPageName, referrer)
logScreenViewContextUnload(logicalPageName, referrer)
```

#### Example
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

try {
  var result1 = await Tealeaf.logScreenViewContextLoad("TestPage", null);
  console.log("logScreenViewContextLoad", result1);
  var result2 = await Tealeaf.logScreenViewContextUnload("TestPage", null);
  console.log("logScreenViewContextUnload", result2);
  var result3 = await Tealeaf.logScreenViewContextLoad("TestPage2", "TestPage");
  console.log("logScreenViewContextLoad", result3);
  var result4 = await Tealeaf.logScreenViewContextUnload("TestPage2", "TestPage");
  console.log("logScreenViewContextUnload", result4);
} catch (e) {
  console.error(e);
}
```

### Capture Event Listener Actions **(Type 4)**
You will need to the following in order to capture an event listener, which will get captured as a Tealeaf type 4 message object. 

#### Syntax
* **nodeHandler** - Native node handle for a component from React Native.
```
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

logClickEvent(nodeHandler)
```

#### Example
```javascript
<ListItem button onPress={(evt) => {Tealeaf.logClickEvent(findNodeHandle(evt.target)); this.toggleSwitch2();}}>
  <CheckBox
    color="red"
    checked={this.state.checkbox2}
    onPress={(evt) => {Tealeaf.logClickEvent(findNodeHandle(evt.target)); this.toggleSwitch2();}}
  />
  <Body>
    <Text>Daily Stand Up</Text>
  </Body>
</ListItem>
```
The full example can also be reviewed at https://github.com/acoustic-analytics/ea_react_native_module/blob/master/Example/NativeBase-KitchenSink/src/screens/checkbox/index.js

### Log Custom Event **(Type 5)**
You will need to the following in order to log a custom event, which will get captured as a Tealeaf type 5 message object. 

#### Syntax
* **eventName** - The name of the event to be logged this will appear in the posted json.
* **values** - Additional key value pairs to be logged with the message.
* **level** - Set log level for that event.
```
logCustomEvent(eventName, values, level)
```

#### Example
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

try {
  var dict = { shopping: "done" };
  var result = await Tealeaf.logCustomEvent("ShopClick", dict, 3);
  console.log("logCustomEvent", result);
} catch (e) {
  console.error(e);
}
```

### Capture Layout **(Type 10)**
You will need to the following in order to capture the layout of the page, which will get captured as a Tealeaf type 10 message object. 

#### Syntax
* **screenViewName** - Screen view name to be used for page which is used in replay.

Note: This need to added during *componentDidMount* lifecycle event which is triggered when all is displayed on the page.
```
logScreenLayout(screenViewName)
```

#### Example
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

class Home extends Component {
  componentDidMount() {
    Tealeaf.logScreenLayout("Home");
  }
```
The full example can also be reviewed at https://github.com/acoustic-analytics/ea_react_native_module/blob/master/Example/NativeBase-KitchenSink/src/screens/home/index.js


### Capture Gestures **(Type 11)**
Gestures will be captured automatically as a Tealeaf type 11 message object. If SDK install instructions above are followed.

### Log Geolocation **(Type 13)**
You will need to the following in order to geolocation, which will get captured as a Tealeaf type 13 message object. 

#### Syntax
* **latitude** - The geographic latitude of the user.
* **longitude** - The geographic longitude of the user.
* **level** - The monitoring level of the event.
```
logLocation()
logLocationWithLatitudeLongitude(latitude, longitude, level)
```

#### Example
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

try {
  var result1 = await Tealeaf.logLocation();
  console.log("logLocation", result1);
  var result2 = await Tealeaf.logLocationWithLatitudeLongitude(37.7749, 122.4194, 2);
  console.log("logLocationWithLatitudeLongitude", result2);
} catch (e) {
  console.error(e);
}
```

### Set Boolean Configuration Value For A Key
You will need to the following in order to update Boolean value setting in the EOCore or Tealeaf modules.

#### Syntax
* **key** - Key to update value in configuration settings.
* **value** - Value to use.
* **moduleName** - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.

Note: Ideally this should be done before you start the library.
```
setBooleanConfigItemForKey(key, value, moduleName)
```

#### Example
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

var moduleNameEOCore = 'EOCore';
var moduleNameTealeaf = 'Tealeaf';
// This will update the appkey for payload to use.
Tealeaf.setBooleanConfigItemForKey("GetImageDataOnScreenLayout", true, moduleNameTealeaf);
```

### Get Boolean Configuration Value For A Key
You will need to the following in order to get boolean value from a key in a certain module.

#### Syntax
* **key** - Key to obtain value in configuration settings.
* **moduleName** - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.

```
getBooleanConfigItemForKey(key, moduleName)
```

#### Example
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

try {
  var result = await Tealeaf.getBooleanConfigItemForKey("DoPostAppComesFromBackground", true, 'EOCore');
  console.log("getBooleanConfigItemForKey", result);
} catch (e) {
  console.error(e);
}
```

### Set String Configuration Value For A Key
You will need to the following in order to update String value setting in the EOCore or Tealeaf modules.

#### Syntax
* **key** - Key to update value in configuration settings.
* **value** - Value to use.
* **moduleName** - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.

Note: Ideally this should be done before you start the library.
```
setStringItemForKey(key, value, moduleName)
```

#### Example
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

var moduleNameEOCore = 'EOCore';
var moduleNameTealeaf = 'Tealeaf';
// This will update the appkey for payload to use.
Tealeaf.setStringItemForKey("PostMessageUrl", "http://collector.com/collector/collectorPost", moduleNameTealeaf);
```

### Get String Configuration Value For A Key
You will need to the following in order to get string value from a key in a certain module.

#### Syntax
* **key** - Key to obtain value in configuration settings.
* **moduleName** - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.

```
getStringItemForKey(key, moduleName)
```

#### Example
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

try {
  var result = await Tealeaf.getStringItemForKey("MessageVersion", 'EOCore');
  console.log("getStringItemForKey", result);
} catch (e) {
  console.error(e);
}
```

### Set Number Configuration Value For A Key
You will need to the following in order to update Number value setting in the EOCore or Tealeaf modules.

#### Syntax
* **key** - Key to update value in configuration settings.
* **value** - Value to use.
* **moduleName** - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.

Note: Ideally this should be done before you start the library.
```
setNumberItemForKey(key, value, moduleName)
```

#### Example
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

var moduleNameEOCore = 'EOCore';
var moduleNameTealeaf = 'Tealeaf';
// This will update the appkey for payload to use.
Tealeaf.setNumberItemForKey("PostMessageUrl", "http://collector.com/collector/collectorPost", moduleNameTealeaf);
```

### Get Number Configuration Value For A Key
You will need to the following in order to get number value from a key in a certain module.

#### Syntax
* **key** - Key to obtain value in configuration settings.
* **moduleName** - The name of the module to be updated. For EOCore settings, please use 'EOCore' which can be found the following files EOCoreBasicConfig.plist, EOCoreBasicConfig.properties or EOCoreAdvancedConfig.json and 'Tealeaf' for Tealeaf which can be found the following files TealeafBasicConfig.plist, TealeafBasicConfig.properties or TealeafAdvancedConfig.json.

```
getNumberItemForKey(key, moduleName)
```

#### Example
```javascript
// Add import
import {NativeModules, findNodeHandle} from 'react-native';
const Tealeaf = NativeModules.RNCxa;

try {
  var result = await Tealeaf.getNumberItemForKey("PostMessageLevelCellular", 'EOCore');
  console.log("getNumberItemForKey", result);
} catch (e) {
  console.error(e);
}
```

# Demo
## Sample Code with integrated
### Using NativeBase KitchenSink v2.12.0

iOS | Android
 :-----:| :-----:
 ![ios-demo](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/Example/NativeBase-KitchenSink/screenshots/iOS.gif) | ![android-demo](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/Example/NativeBase-KitchenSink/screenshots/Android.gif)


* NativeBase-KitchenSink taken from https://github.com/GeekyAnts/NativeBase-KitchenSink which is at react-native-wcxa/Example/NativeBase-KitchenSink. Documentation is at https://github.com/acoustic-analytics/ea_react_native_module/tree/master/Example/NativeBase-KitchenSink.

## Installation instructions

#### In command line window
```javascript
cd ../ea_react_native_module-master/Example/NativeBase-KitchenSink
yarn
cd ios
pod install
cd ..
```

*	**Run on iOS**
	*	Opt #1:
		*	Open the project in Xcode from `ios/NativeBase-KitchenSink.xcodeproj`
		*	Click `run` button to simulate
	*	Opt #2:
		*	Run `react-native run-ios` in your terminal


*	**Run on Android**
	*	Make sure you have an `Android emulator` installed and running
	*	Run `react-native run-android` in your terminal


## Notes

There are several know issues between npm install versus yarn install. Since yarn is a Facebook tool. It normally has fixes patched for installing dependancies. 

You also need to open ../CXA_react_native_module-master/Example/NativeBase-KitchenSink/ios/NativebaseKitchenSink.xcodeproj. Open File->Project Settings.. and change to use Legacy Build System.

![](https://github.com/acoustic-analytics/ea_react_native_module/raw/master/screenshots/xcode_legacybuild.png)

