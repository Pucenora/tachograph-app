package com.tachographapp;

import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    public static final String ON_RESUME = "ON_RESUME";

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "TachographApp";
    }

    @Override
    protected void onResume() {
        super.onResume();
        LocalBroadcastManager.getInstance(this).sendBroadcast(new Intent(ON_RESUME));
    }
}
