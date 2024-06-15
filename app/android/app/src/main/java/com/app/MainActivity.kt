package com.app

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

// import android.os.Bundle
// import org.devio.rn.splashscreen.SplashScreen;

class MainActivity : ReactActivity() {

  // override fun onCreate(savedInstanceState: Bundle?) {
  //  SplashScreen.show(this)
  //  super.onCreate(savedInstanceState)
  // }

  override fun getMainComponentName(): String = "app"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
