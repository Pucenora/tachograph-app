package com.tachographapp.tracking;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tachographapp.MainActivity;

/**
 * Created by fabian on 20.01.17
 */
public class TrackingModule extends ReactContextBaseJavaModule {

    public static final String TAG = TrackingModule.class.getSimpleName();

    public TrackingModule(ReactApplicationContext reactContext) {
        super(reactContext);

        LocalBroadcastManager.getInstance(reactContext).registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Log.d(TAG, "Trip distance updated");
                double tripDistance = intent.getDoubleExtra("tripDistanceMeters", 0);
                float currentAccuracy = intent.getFloatExtra("currentAccuracy", -1);
                sendDistanceChangedEvent(tripDistance, currentAccuracy);
            }
        }, new IntentFilter(LocationTrackingController.EVENT_TRIP_DISTANCE_CHANGED));

        LocalBroadcastManager.getInstance(reactContext).registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Log.d(TAG, "onResume");
                getReactApplicationContext()
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("ANDROID_ACTIVITY_RESUMED", null);
            }
        }, new IntentFilter(MainActivity.ON_RESUME));
    }

    @Override
    public String getName() {
        return "TrackingManager";
    }

    @ReactMethod
    public void startTracking() {
        Log.d(TAG, "startTracking");
        Intent intent = new Intent(getReactApplicationContext(), TrackingService_.class);
        intent.setAction(TrackingService.ACTION_START_TRACKING);

        getReactApplicationContext().startService(intent);
    }

    @ReactMethod
    public void stopTracking() {
        Log.d(TAG, "stopTracking");
        Intent intent = new Intent(getReactApplicationContext(), TrackingService_.class);
        intent.setAction(TrackingService.ACTION_STOP_TRACKING);

        getReactApplicationContext().startService(intent);
    }

    private void sendDistanceChangedEvent(double tripDistanceMeters, float currentAccuracy) {

        WritableMap params = Arguments.createMap();
        params.putDouble("tripDistanceMeters", tripDistanceMeters);
        params.putDouble("currentAccuracy", currentAccuracy);

        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("TRIP_DISTANCE_CHANGED", params);
    }
}
