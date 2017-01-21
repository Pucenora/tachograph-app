package com.tachographapp.tracking;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationManager;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.mapzen.android.lost.api.LocationRequest;
import com.mapzen.android.lost.api.LocationResult;
import com.mapzen.android.lost.api.LocationServices;
import com.mapzen.android.lost.api.LostApiClient;

import org.androidannotations.annotations.AfterInject;
import org.androidannotations.annotations.EBean;
import org.androidannotations.annotations.SystemService;


/**
 * Created by fabian on 21.01.17.
 */

@EBean(scope = EBean.Scope.Singleton)
public class LocationTrackingController implements LostApiClient.ConnectionCallbacks {

    private static final String TAG = LocationTrackingController.class.getSimpleName();

    public static final String EVENT_TRIP_DISTANCE_CHANGED = "TRIP_DISTANCE_CHANGED";

    private LostApiClient apiClient;
    private PendingIntent locationUpdatedIntent;
    private LocationRequest locationRequest;

    @SystemService
    LocationManager locationManager;

    private Context context;

    private boolean trackingEnabled = false;
    private boolean desiredTrackingMode = false;

    private double currentTripDistanceMeters = 0;
    private Location lastLocation;

    public LocationTrackingController(Context context) {

        this.context = context;
        Intent intent = new Intent(this.context, TrackingService_.class);
        intent.setAction(TrackingService.ACTION_LOCATION_UPDATED);
        this.locationUpdatedIntent = PendingIntent.getService(context, 0, intent, 0);
        this.locationRequest = LocationRequest.create();
        this.locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        this.locationRequest.setInterval(1);
    }

    @AfterInject
    public void afterInject() {

        apiClient = new LostApiClient.Builder(context).addConnectionCallbacks(this).build();
        apiClient.connect();
    }

    @Override
    public void onConnected() {
        Log.d(TAG, "ApiClient connected");
        init();
    }

    @Override
    public void onConnectionSuspended() {
        Log.d(TAG, "ApiClient connection has been suspended");
    }

    public void init() {

        setTrackingEnabled(desiredTrackingMode);
    }

    public void setTrackingEnabled(boolean newTrackingMode) {

        Log.d(TAG, "setTrackingEnabled " + newTrackingMode);

        desiredTrackingMode = newTrackingMode;

        if (!apiClient.isConnected()) {
            Log.w(TAG, "Api client not connected yet, cannot change tracking mode.");
            return;
        }

        if (trackingEnabled == desiredTrackingMode) {
            Log.w(TAG, "new and old tracking mode are identical");
            return;
        }

        if (!newTrackingMode) {
            LocationServices.FusedLocationApi.removeLocationUpdates(apiClient, locationUpdatedIntent);
            trackingEnabled = false;
            return;
        }

        try {
            LocationServices.FusedLocationApi.requestLocationUpdates(apiClient, locationRequest, locationUpdatedIntent);
            trackingEnabled = true;
        } catch(SecurityException e) {
            Log.e(TAG, "Failed to enable tracking", e);
        }
    }

    public boolean isTrackingEnabled() {
        return trackingEnabled || desiredTrackingMode;
    }

    public void locationUpdated(Intent intent) {
        if (!LocationResult.hasResult(intent)) {
            Log.e(TAG, "The intent does not have a location result");
            return;
        }

        LocationResult locationResult = LocationResult.extractResult(intent);

        for (Location location : locationResult.getLocations()) {

            if (!location.hasAccuracy() || location.getAccuracy() > 20) {
                Log.d(TAG, "Skipping location with bad accuracy: " + location.getAccuracy());
                continue;
            }
            if (lastLocation != null) {
                currentTripDistanceMeters += lastLocation.distanceTo(location);
            }
            lastLocation = location;
        }

        Intent tripDistanceChangedIntent = new Intent(EVENT_TRIP_DISTANCE_CHANGED);
        tripDistanceChangedIntent.putExtra("tripDistance", currentTripDistanceMeters / 1000);

        LocalBroadcastManager.getInstance(context).sendBroadcast(tripDistanceChangedIntent);
    }

    public Location getLastLocation() {
        return lastLocation;
    }

    public boolean locationServicesEnabled() {
        boolean gps_enabled = false;
        boolean network_enabled = false;

        try {
            gps_enabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        } catch(Exception ex) {}

        try {
            network_enabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
        } catch(Exception ex) {}

        if(!gps_enabled && !network_enabled) {
            return false;
        }

        return true;
    }
}
