
# react-native-acoustic-ea

# Only iOS is supported at this moment

## Getting started

**This module uses only enhanced replay, if you like to use traditional replay. Use https://www.npmjs.com/package/react-native-wcxa**

This will add it to your package.json file:

`$ npm install --save react-native-acoustic-ea`

### Manual installation

This will add it to your iOS Xcode project and Android Studio project:

`$ react-native link react-native-acoustic-ea`

To upgrade node_modules and get latest call:

`$ npm install`

---
### iOS

You might have issues with `react-native link react-native-acoustic-ea` on iOS. You will need to link **react-native-acoustic-ea** by dragging from **/node_modules/react-native-acoustic-ea/ios/RNCxa.xcodeproj** to **xCode libraries location**.

![](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/screenshots/move_RNCxa_project.png)


You will need find the **static libraries** and **resource bundles** that can be found at */node_modules/react-native-acoustic-ea/ios/Tealeaf*.

![](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/screenshots/find_libraries_resources.png)

Copy **static libraries** and **resource bundles** to your react native application to have access to them for the build. In this example, it is **NativebaseKitchenSink**. **<span style="color:blue">This is a new folder in your project. Do not link the one in the */node_modules/react-native-acoustic-ea/ios/Tealeaf* otherwise, you will have link issues of not finding items.**</span>

![](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/screenshots/add_libraries_resources.png)

Link the following libraries: **WebKit.framework** from Apple, **EOCore.framework** and **TealeafReactNative.framework** from **/Your Project/Tealeaf** into application. Also review that **libRNCxa.a** is also linked.

![](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/screenshots/link_libraries.png)

Add **bundle resources** that will need to be copied which are **TLFResources.bundle** and **EOCoreSettings.bundle** from **/Your Project/Tealeaf** into application.

![](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/screenshots/add_resources.png)

Add **environmental variables**: 
* **EODebug** and **TLF_DEBUG** will help debugging. 
* **TLF_AUTO_ENABLE** will help automatically start the libraries.
* If using latest xCode 10 and new simulator add Name **OS_ACTIVITY_MODE** with Value **disable**. <span style="color:red">But this will block xCode console information for debugging library. Please use an older simulator and have **OS_ACTIVITY_MODE** not selected.</span>

Note: **TLF_AUTO_ENABLE** is no longer needed as of version 7.6.0.

![](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/screenshots/add_environment_variables.png)

You will also need to open **TealeafBasicConfig.plist** to adjust **AppKey** and **PostMessageUrl**.

![](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/screenshots/adjust_TLFResources_bundle.png)

---
### Android

Manual installation

Tealeaf React-Native Android module is built with Android Studio 3.2.1, and compiled against gradle version 4.6(3.2.1).


## Skip this if Android Studio project already exists (YourApp/android):

`$ react-native upgrade`

`$ react-native link react-native-acoustic-ea`    


## Load required Javascript Bundle index.android.bundle under assets folder
(Open terminal in project directory) 

`$ mkdir android/app/src/main/assets`

## Create the bundle and put under assets(Required when app's Javascript code changes)

`$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

## Open Android Studio Project
Follow IDE instructions to update plugin or dependency requirements.

## Insert required permission in androidmanifest.xml file

```javascript
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
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

![](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/screenshots/TealeafBasicConfig_appkey.png)

## Installation complete, run your app
`$ react-native run-android`


#### Known issues
1) Screen capture in replay sometimes display overlapping items which is expected when Tealeaf captures UI state during animation.  It's recommended to set delay value from app's Javascript code.
2) In Logcat shows error Invalid IDs such as 0x00000001. Please ignore since React-Native app doesn't generate all resource Ids mapping.
3) Android compile issues.  Please see the example app for reference on common setup:

    NativeBase-KitchenSink/Example/android

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
The full example can also be reviewed at https://github.com/ibm-watson-cxa/ea_react_native_module/blob/master/Example/NativeBase-KitchenSink/src/screens/checkbox/index.js

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
The full example can also be reviewed at https://github.com/ibm-watson-cxa/ea_react_native_module/blob/master/Example/NativeBase-KitchenSink/src/screens/checkbox/index.js

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
  var result = await Tealeaf.("ShopClick", dict, 3);
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
The full example can also be reviewed at https://github.com/ibm-watson-cxa/ea_react_native_module/blob/master/Example/NativeBase-KitchenSink/src/screens/home/index.js


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
 ![ios-demo](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/Example/NativeBase-KitchenSink/screenshots/iOS.gif) | ![android-demo](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/Example/NativeBase-KitchenSink/screenshots/Android.gif)


* NativeBase-KitchenSink taken from https://github.com/GeekyAnts/NativeBase-KitchenSink which is at react-native-wcxa/Example/NativeBase-KitchenSink. Documentation is at https://github.com/ibm-watson-cxa/ea_react_native_module/tree/master/Example/NativeBase-KitchenSink.

## Installation instructions

#### In command line window
```javascript
cd ../ea_react_native_module-master/Example/NativeBase-KitchenSink
yarn
react-native link react-native-vector-icons
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

![](https://github.com/ibm-watson-cxa/ea_react_native_module/raw/master/screenshots/xcode_legacybuild.png)

