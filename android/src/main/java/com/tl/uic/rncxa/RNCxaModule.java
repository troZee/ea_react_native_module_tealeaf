//
// Copyright (C) 2020 Acoustic, L.P. All rights reserved.
//
// NOTICE: This file contains material that is confidential and proprietary to
// Acoustic, L.P. and/or other developers. No license is granted under any intellectual or
// industrial property rights of Acoustic, L.P. except as may be provided in an agreement with
// Acoustic, L.P. Any unauthorized copying or distribution of content from this file is
// prohibited.
//


package com.tl.uic.rncxa;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.inputmethodservice.KeyboardView;
import android.text.TextUtils;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.TextView;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.ibm.eo.EOCore;
import com.ibm.eo.model.EOMonitoringLevel;
import com.tl.uic.Tealeaf;
import com.tl.uic.model.ScreenviewType;

import java.util.HashMap;
import java.util.Map;


/**
 * Tealeaf Android React-Native module that wraps API calls for Javascript.
 * How to use:
 */
public class RNCxaModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private final ReactApplicationContext reactContext;
    private static final String E_LAYOUT_ERROR = "E_LAYOUT_ERROR";
    private static final String E_VIEW_NOT_FOUND_ERROR = "E_VIEW_NOT_FOUND_ERROR";

    public RNCxaModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "RNCxa";
    }


    /**
     * @param readableMap
     * @param moduleName
     * @param promise
     */
    @ReactMethod
    public void updateConfigWithData(final ReadableMap readableMap, final String moduleName, final Promise promise) {
        // TODO: Is it required for Android?
        updateResult(null, promise);
    }

    /**
     * Gets the module's configuration item from AdvancedConfig.json or BasicConfig.properties that matches the specified key as a BOOL value.
     *
     * @param key        Key value.
     * @param moduleName The class name of the module's EOLifecycleObject for which the configuration item is referencing.
     * @param promise    Javascript Promise interface.
     */
    @ReactMethod
    public void getBooleanConfigItemForKey(final String key, final String moduleName, final Promise promise) {
        boolean result = EOCore.getConfigItemBoolean(key, EOCore.getLifecycleObject(moduleName));
        updateResult(result, promise);
    }

    /**
     * Gets the module's configuration item from AdvancedConfig.json or BasicConfig.properties that matches the specified key.
     *
     * @param theDefault In case no value if found, use this value as default.
     * @param key        Key.
     * @param moduleName The class name of the module's EOLifecycleObject for which the configuration item is referencing.
     * @param promise    Javascript Promise interface.
     */
    @ReactMethod
    public void getStringItemForKey(final String theDefault, final String key, final String moduleName, final Promise promise) {
        String result = EOCore.getConfigItemString(key, EOCore.getLifecycleObject(moduleName));
        if (TextUtils.isEmpty(result)) {
            result = theDefault;
        }
        updateResult(result, promise);
    }

    /**
     * Gets the module's configuration item from AdvancedConfig.json or BasicConfig.properties that matches the specified key.
     *
     * @param theDefault In case no value if found, use this value as default.
     * @param key        Map Key.
     * @param moduleName The class name of the module's EOLifecycleObject for which the configuration item is referencing.
     * @param promise    Javascript Promise interface.
     */
    @ReactMethod
    public void getNumberItemForKey(final int theDefault, final String key, final String moduleName, final Promise promise) {
        //TODO: Do we need getConfigItemLong?
        int result = EOCore.getConfigItemInt(key, EOCore.getLifecycleObject(moduleName));
        updateResult(result, promise);
    }

    /**
     * Sets the module's configuration item from AdvancedConfig.json or BasicConfig.properties that matches the specified key.
     *
     * @param key        Map Key.
     * @param value      Map Value.
     * @param moduleName The class name of the module's EOLifecycleObject for which the configuration item is referencing.
     * @param promise    Javascript Promise interface.
     */
    @ReactMethod
    public void setConfigItem(final String key, final Object value, final String moduleName, final Promise promise) {
        final boolean result = EOCore.updateConfig(key, value.toString(), EOCore.getLifecycleObject(moduleName));
        updateResult(result, promise);
    }

    /**
     * Log Custom event.
     *
     * @param eventName   The name of the event to be logged this will appear in the posted json
     * @param readableMap React-Native compatible map type.
     * @param logLevel    Set a custom log level to the event. This will override the configured log level for that event.
     * @param promise     Javascript Promise interface.
     */
    @ReactMethod
    public void logCustomEvent(final String eventName, final ReadableMap readableMap, final int logLevel, final Promise promise) {
        HashMap<String, String> map = new HashMap<>();

        // Convert to conform with React-Native MAP type
        for (Map.Entry<String, Object> entry : readableMap.toHashMap().entrySet()) {
            map.put(entry.getKey(), entry.getValue().toString());
        }

        final boolean result = Tealeaf.logCustomEvent(eventName, map, logLevel);
        updateResult(result, promise);
    }

    /**
     * Log Current Screen Layout
     *
     * @param logicalPageName Page name or title e.g. "Login View Controller"; Must not be empty.
     * @param promise         Javascript Promise interface.
     */
    @ReactMethod
    public void logScreenLayout(final String logicalPageName, final Promise promise) {
        final boolean result = Tealeaf.logScreenLayout(getCurrentActivity(), logicalPageName, 500);
        updateResult(result, promise);
    }

    /**
     * Log Current Screen Layout
     *
     * @param logicalPageName Page name or title e.g. "Login View Controller"; Must not be empty.
     * @param delay           Number of seconds to wait before logging the view.
     * @param promise         Javascript Promise interface.
     */
    @ReactMethod
    public void logScreenLayoutWithDelay(final String logicalPageName, int delay, final Promise promise) {
        final boolean result = Tealeaf.logScreenLayout(getCurrentActivity(), logicalPageName, delay < 0 ? 500 : delay);
        updateResult(result, promise);
    }

    /**
     * Log GeoLocation.  Below permission is need in the androidmanifest.xml file.
     * <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
     *
     * @param promise
     */
    @ReactMethod
    public void logLocation(final Promise promise) {
        final boolean result = Tealeaf.logGeolocation(EOMonitoringLevel.kEOMonitoringLevelInfo.getValue());
        updateResult(result, promise);
    }

    /**
     * Requests that the framework logs the location information. This is not logged automatically to
     * avoid making unnecessary location updates and to protect the privacy of your application's users
     * by ensuring that location is reported only when the app has some other reason to request it.
     * Your application must include the Core Location framework.
     *
     * @param lat      The geographic latitude of the user.
     * @param lng      The geographic longitude of the user.
     * @param logLevel The monitoring level of the event.
     * @param promise  Javascript Promise interface.
     */
    @ReactMethod
    public void logLocationUpdateWithLatitude(final double lat, final double lng, final int logLevel, final Promise promise) {
        final boolean result = Tealeaf.logLocationUpdateEventWithLatitude(lat, lng, logLevel);
        updateResult(result, promise);
    }

    /**
     * Add focus listener to handle EditText UI control.
     *
     * @param textView Input TextView.
     * @param activity Current activity.
     */
    public void addFocusAndRegister(TextView textView, Activity activity) {
        textView.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (hasFocus) {
                    InputMethodManager imm = (InputMethodManager) v.getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
                    imm.showSoftInput(v, InputMethodManager.SHOW_FORCED);

                    KeyboardView keyboardView = new KeyboardView(v.getContext().getApplicationContext(), null);
                    Tealeaf.logEvent(keyboardView , Tealeaf.TLF_UI_KEYBOARD_DID_SHOW_NOTIFICATION);
                    Tealeaf.logEvent(v, Tealeaf.TLF_ON_FOCUS_CHANGE_IN);
                } else {
                    com.tl.uic.Tealeaf.logEvent(v, com.tl.uic.Tealeaf.TLF_ON_FOCUS_CHANGE_OUT);
                    InputMethodManager imm = (InputMethodManager) v.getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
                    imm.hideSoftInputFromWindow(v.getWindowToken(), 0);

                    KeyboardView keyboardView = new KeyboardView(v.getContext().getApplicationContext(), null);
                    Tealeaf.logEvent(keyboardView , Tealeaf.TLF_UI_KEYBOARD_DID_HIDE_NOTIFICATION);
                }
            }
        });

        Tealeaf.registerFormField(textView, activity);
    }

    /**
     * Requests that the framework logs the click events on any UIControl or View. Click event is a
     * normalized form of touch up inside event.
     *
     * @param targetViewId A valid native View Id for lookup
     * @param promise      Javascript Promise interface.
     */
    @ReactMethod
    public void logClickEvent(final int targetViewId, final Promise promise) {
        try {
            final ReactApplicationContext context = getReactApplicationContext();
            // Add UI-block so we can get a valid reference to the map-view
            final UIManagerModule uiManager = context.getNativeModule(UIManagerModule.class);

            uiManager.addUIBlock(new UIBlock() {
                public void execute(NativeViewHierarchyManager nvhm) {
                    final View view = nvhm.resolveView(targetViewId);

                    if (view == null) {
                        updateResult(null, promise);
                    } else {
                        //
                        if (view instanceof EditText) {
                            addFocusAndRegister((EditText) view, getCurrentActivity());
                        } else {
                            Tealeaf.logEvent(view, "click");
                        }
                        updateResult(true, promise);
                    }
                }
            });
        } catch (Exception e) {
            updateResult(e, promise);
        }
    }

    /**
     * Requests that the framework logs an screen load event.
     *
     * @param logicalPageName Page name or title e.g. "Login View Controller"; Must not be empty.
     * @param referrer        Page name or title that loads logicalPageName. Could be empty.
     * @param promise         Javascript Promise interface.
     */
    @ReactMethod
    public void logScreenViewContextLoad(final String logicalPageName, final String referrer, final Promise promise) {
        final boolean result = Tealeaf.logScreenview(getCurrentActivity(), logicalPageName, ScreenviewType.LOAD, referrer);
        updateResult(result, promise);
    }

    /**
     * Requests that the framework logs an screen unload event.
     *
     * @param logicalPageName Page name or title e.g. "Login View Controller"; Must not be empty.
     * @param referrer        Page name or title that loads logicalPageName. Could be empty.
     * @param promise         Javascript Promise interface.
     */
    @ReactMethod
    public void logScreenViewContextUnLoad(final String logicalPageName, final String referrer, final Promise promise) {
        final boolean result = Tealeaf.logScreenview(getCurrentActivity(), logicalPageName, ScreenviewType.UNLOAD, referrer);
        updateResult(result, promise);
    }

    /**
     * Helper function for Promise result
     *
     * @param result  Result from Tealeaf API call.
     * @param promise Javascript Promise interface.
     */
    private void updateResult(Object result, Promise promise) {
        if ((result != null) && ((Boolean) result) == true) {
            promise.resolve(result);
        } else {
            promise.reject("", "", new Throwable());
        }
    }

    @Override
    public void onHostResume() {
        // Initialize Tealeaf library, and hook into activity lifecycle events to help detect if app is in background
        if (!Tealeaf.isEnabled()) {
            if (Tealeaf.getApplication() == null) {
                new Tealeaf((Application) this.reactContext.getApplicationContext());
            }
            Tealeaf.enable();
        }
        Tealeaf.onResume(getCurrentActivity(), null);
    }

    @Override
    public void onHostPause() {
        Tealeaf.onPause(getCurrentActivity(), null);
    }

    @Override
    public void onHostDestroy() {
        Tealeaf.onDestroy(getCurrentActivity(), null);
    }
}