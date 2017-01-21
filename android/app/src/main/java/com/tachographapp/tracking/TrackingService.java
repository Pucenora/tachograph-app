package com.tachographapp.tracking;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Location;
import android.os.IBinder;
import android.provider.Settings;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import com.tachographapp.MainActivity;
import com.tachographapp.R;

import org.androidannotations.annotations.Bean;
import org.androidannotations.annotations.EService;
import org.androidannotations.annotations.Receiver;
import org.androidannotations.annotations.SystemService;


@EService
public class TrackingService extends Service {

    private static final String TAG = TrackingService.class.getSimpleName();

    public final static String ACTION_START_TRACKING = "START_TRACKING";
    public final static String ACTION_STOP_TRACKING = "STOP_TRACKING";
    public final static String ACTION_LOCATION_UPDATED = "ACTION_LOCATION_UPDATED";

    private static final int TRACKING_NOTIFICATION_ID = 341235;

    @Bean
    LocationTrackingController locationTrackingController;

    @SystemService
    NotificationManager notificationManager;

    @Override
    public void onCreate() {
        super.onCreate();

        Log.d(TAG, "onCreate");
    }

    @Override
    public void onDestroy() {
        Log.d(TAG, "onDestroy");

        super.onDestroy();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        Log.d(TAG, "onStartCommand");
        if (intent == null || intent.getAction() == null) {
            Log.d(TAG, "Started without an intent or without action. Doing nothing");
            return START_STICKY;
        }

        switch(intent.getAction()) {
            case ACTION_START_TRACKING:
                locationTrackingController.setTrackingEnabled(true);
                startForeground(TRACKING_NOTIFICATION_ID, buildNotification());
                break;
            case ACTION_STOP_TRACKING:
                locationTrackingController.setTrackingEnabled(false);
                stopForeground(true);
                stopSelf();
                break;
            case ACTION_LOCATION_UPDATED:
                locationTrackingController.locationUpdated(intent);
                break;
            default:
                Log.e(TAG, "Got intent with unknown action: " + intent.getAction());
        }

        updateNotificationText();

        return START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        // We don't provide binding, so return null
        return null;
    }

    private PendingIntent getMainActivityIntent() {
        Intent mainActivityIntent = new Intent(this, MainActivity.class);
        return PendingIntent.getActivity(this, 0, mainActivityIntent, 0);
    }

    private PendingIntent getOpenLocationSettingsIntent() {
        Intent locationSettingsIntent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);

        return PendingIntent.getActivity(this, 0, locationSettingsIntent, 0);
    }

    private PendingIntent getChangePermissionSettingsIntent() {
        Intent changePermissionSettingsIntent = new Intent(this, LocationPermissionActivity.class);

        return PendingIntent.getActivity(this, 0, changePermissionSettingsIntent, 0);
    }

    @Receiver(actions = LocationProviderChangedReceiver.ON_LOCATION_PROVIDER_CHANGED, local = true)
    public void onLocationProviderChanged(Intent intent) {
        Log.d(TAG, "Location provider changed");
        updateNotificationText();
    }

    private void updateNotificationText() {
        if (locationTrackingController.isTrackingEnabled()) {
            notificationManager.notify(TRACKING_NOTIFICATION_ID, buildNotification());
        } else {
            notificationManager.cancelAll();
        }
    }


    private Notification buildNotification() {

        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this);
        notificationBuilder
                .setContentTitle(getResources().getString(R.string.app_name))
                .setColor(Color.rgb(255, 51, 102))
                .setOngoing(true)
                .setVisibility(Notification.VISIBILITY_PUBLIC)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(getMainActivityIntent());

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ) {
            notificationBuilder.setContentTitle(getResources().getString(R.string.tracking_notification_title));
            notificationBuilder.setContentText(getResources().getString(R.string.tracking_notification_text_no_location_permission));
            notificationBuilder.setSubText(getResources().getString(R.string.tracking_notification_subtext_no_location_permission));
            notificationBuilder.setContentIntent(getChangePermissionSettingsIntent());
            return notificationBuilder.build();
        }

        if (!locationTrackingController.locationServicesEnabled()) {
            notificationBuilder.setContentTitle(getResources().getString(R.string.tracking_notification_title));
            notificationBuilder.setContentText(getResources().getString(R.string.tracking_notification_text_location_services_disabled));
            notificationBuilder.setSubText(getResources().getString(R.string.tracking_notification_subtext_location_services_disabled));
            notificationBuilder.setContentIntent(getOpenLocationSettingsIntent());
            return notificationBuilder.build();
        }


        Location location = locationTrackingController.getLastLocation();

        if (location == null) {
            notificationBuilder.setContentTitle(getResources().getString(R.string.tracking_notification_title));
            notificationBuilder.setContentText(getResources().getString(R.string.tracking_notification_text_no_location));
            notificationBuilder.setSubText(getResources().getString(R.string.tracking_notification_subtext_no_location));
            return notificationBuilder.build();
        }

        String accuracy = String.format("%.0f", location.getAccuracy());

        String accuracyDescription = String.format(getResources().getString(R.string.tracking_notification_subtext_fine), accuracy);

        notificationBuilder.setContentTitle(getString(R.string.tracking_notification_title));
        notificationBuilder.setSubText(accuracyDescription);

        return notificationBuilder.build();
    }
}
