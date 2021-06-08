package com.nativebasekitchensink;

import android.view.MotionEvent;

import com.facebook.react.ReactActivity;
import com.tl.uic.Tealeaf;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "NativebaseKitchenSink";
  }

  public boolean dispatchTouchEvent(MotionEvent e) {
    Tealeaf.dispatchTouchEvent(this, e);
    return super.dispatchTouchEvent(e);
  }
}
