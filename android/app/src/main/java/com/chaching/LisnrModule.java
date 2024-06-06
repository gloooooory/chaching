package com.chaching;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.lisnr.radius.Radius;
import com.lisnr.radius.Receiver;
import com.lisnr.radius.StreamBuilder;
import com.lisnr.radius.Tone;
import com.lisnr.radius.exceptions.AudioSystemException;
import com.lisnr.radius.exceptions.AuthorizationDeniedException;
import com.lisnr.radius.exceptions.InvalidArgumentException;
import com.lisnr.radius.exceptions.InvalidProfileException;
import com.lisnr.radius.exceptions.InvalidTokenException;
import com.lisnr.radius.exceptions.RadiusDestroyedException;

public class LisnrModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    private Radius mRadius = null;
    private StreamBuilder mInputStreamBuilder;
    private StreamBuilder mOutputStreamBuilder;
    private Receiver mReceiver;
    private final Radius.ErrorEventCallback mErrorEventCallback = new Radius.ErrorEventCallback() {
        @Override
        public void onUnauthorizedCallback(final String reason) {
            Log.e("Chaching", reason);

            WritableMap params = Arguments.createMap();
            params.putString("code", "UNAUTHORIZED");
            params.putString("reason", reason);
            sendEvent("RadiusErrorCallback", params);
        }

        @Override
        public void onExceptionCallback(final String reason) {
            Log.e("Chaching", reason);

            WritableMap params = Arguments.createMap();
            params.putString("code", "EXCEPTION");
            params.putString("reason", reason);
            sendEvent("RadiusErrorCallback", params);
        }
    };

    LisnrModule(ReactApplicationContext context) {
        super(context);
        mContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "LisnrModule";
    }

    private void internalCreateRadius(String token) throws InvalidTokenException, AuthorizationDeniedException, AudioSystemException {
        mInputStreamBuilder = new StreamBuilder(mContext, StreamBuilder.Direction.INPUT);
        mOutputStreamBuilder = new StreamBuilder(mContext, StreamBuilder.Direction.OUTPUT);
        mInputStreamBuilder.setSharingMode(StreamBuilder.SharingMode.SHARED);

        mRadius = new Radius(mContext, token, mOutputStreamBuilder, mInputStreamBuilder, mErrorEventCallback);
    }

    @ReactMethod
    public void createRadius(String token, Promise promise) {
        try {
            Radius.validateToken(token);
        } catch (InvalidTokenException e) {
            e.printStackTrace();
            promise.reject("INVALID_TOKEN", "INVALID_TOKEN");
            return;
        }

        Log.d("Chaching", "[createRadius]");

        try {
            internalCreateRadius(token);
            promise.resolve(true);
        } catch (InvalidTokenException e) {
            e.printStackTrace();
            promise.reject("INVALID_TOKEN", "INVALID_TOKEN");
        } catch (AuthorizationDeniedException e) {
            e.printStackTrace();
            promise.reject("AUTH_DENIED_TOKEN", "AUTH_DENIED_TOKEN");
        } catch (AudioSystemException e) {
            e.printStackTrace();
            promise.reject("AUDIO_SYSTEM_ERROR", "AUDIO_SYSTEM_ERROR");
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("GENERAL_ERROR", "GENERAL_ERROR");
        }
    }

    @ReactMethod
    public void createReceiver(Promise promise) {
        Receiver.ReceiverCallback mCallback = new Receiver.ReceiverCallback() {
            @Override
            public void onToneReceived(Receiver receiver, Tone tone) {
                double signalToNoiseRatio = tone.getSnrDb();
                double headerEvmDb = tone.getHeaderEvmDb();
                double payloadEvmDb = tone.getPayloadEvmDb();
                byte[] payloadData = tone.getData();
                String payloadString = HelperFunctions.bytesToPayloadString(payloadData);

                Log.d("Chaching", "onToneReceived function is called: " + payloadString);

                WritableMap params = Arguments.createMap();
                params.putString("payload", payloadString);
                sendEvent("EventPayload", params);
            }
        };

        try {
            mReceiver = null;
            mReceiver = new Receiver(Radius.PROFILE_STANDARD2_WIDEBAND, mCallback);
            promise.resolve(true);
        } catch (InvalidProfileException e) {
            e.printStackTrace();
            promise.reject("RECEIVE_CREATION_FAILED","RECEIVE_CREATION_FAILED");
        }
    }

    @ReactMethod
    public void registerReceiver(Promise promise) {
        if (mRadius == null) {
            promise.reject("RADIUS_NOT_CREATED", "Radius was not created.");
        }
        try {
            mRadius.registerReceiver(mReceiver);
            promise.resolve(true);
        } catch (InvalidArgumentException | RadiusDestroyedException e) {
            e.printStackTrace();
            promise.reject("REGISTER_RECEIVER_FAILED", "Register receiver failed.");
        }
    }

    @ReactMethod
    public void unregisterReceiver(Promise promise) {
        if (mRadius == null) {
            promise.reject("RADIUS_NOT_CREATED", "Radius was not created.");
        }
        try {
            mRadius.unregisterReceiver(mReceiver);
            promise.resolve(true);
        } catch (InvalidArgumentException | RadiusDestroyedException e) {
            e.printStackTrace();
            promise.reject("UNREGISTER_RECEIVER_FAILED", "Unregister receiver failed.");
        }
    }

    @ReactMethod
    public void unregisterAll() {
        try {
            mRadius.unregisterAll();
        } catch (RadiusDestroyedException e) {
            e.printStackTrace();
        }
    }
    private void sendEvent(String eventName,
                           WritableMap params) {
        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
