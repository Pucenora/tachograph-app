package com.tachographapp.tracking;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;

/**
 * Created by fabian on 18.10.16.
 */
public class LocationProviderChangedReceiver extends BroadcastReceiver {

    public final static String ON_LOCATION_PROVIDER_CHANGED = "ON_LOCATION_PROVIDER_CHANGED";

    @Override
    public void onReceive(Context context, Intent intent) {
        LocalBroadcastManager.getInstance(context).sendBroadcast(new Intent(ON_LOCATION_PROVIDER_CHANGED));
    }
}
