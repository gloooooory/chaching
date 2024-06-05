package com.chaching;
import android.content.Context;
import android.telecom.Call;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
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
    private Context mContext;
    private Radius mRadius = null;
    private StreamBuilder mInputStreamBuilder;
    private StreamBuilder mOutputStreamBuilder;
    private Promise mRadiusErrorEventPromise;
    private Receiver mReceiver;

    LisnrModule(ReactApplicationContext context){
        super(context);
        mContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "LisnrModule";
    }

    @ReactMethod
    public void createRadius(String token, Promise promise) throws InvalidTokenException, AuthorizationDeniedException, AudioSystemException {
        mRadiusErrorEventPromise = promise;

        mInputStreamBuilder = new StreamBuilder(mContext, StreamBuilder.Direction.INPUT);
        mOutputStreamBuilder = new StreamBuilder(mContext, StreamBuilder.Direction.OUTPUT);
        mInputStreamBuilder.setSharingMode(StreamBuilder.SharingMode.SHARED);
        mRadius = new Radius(mContext, token, mOutputStreamBuilder, mInputStreamBuilder, mErrorEventCallback);
        promise.resolve(true);
    }

    private final Radius.ErrorEventCallback mErrorEventCallback = new Radius.ErrorEventCallback() {
        @Override
        public void onUnauthorizedCallback(final String reason) {
            Log.e("Chaching", reason);
            mRadiusErrorEventPromise.reject("Unauthorized", reason);
        }

        @Override
        public void onExceptionCallback(final String reason) {
            Log.e("Chaching", reason);
            mRadiusErrorEventPromise.reject("RadiusCreateError", reason);
        }
    };

    @ReactMethod
    public void createReceiver(Callback callback, Promise promise){
        Receiver.ReceiverCallback mCallback = new Receiver.ReceiverCallback() {
            @Override
            public void onToneReceived(Receiver receiver, Tone tone) {
                double signalToNoiseRatio = tone.getSnrDb();
                double headerEvmDb = tone.getHeaderEvmDb();
                double payloadEvmDb = tone.getPayloadEvmDb();

                byte[] payloadData = tone.getData();
                String payloadString = HelperFunctions.bytesToPayloadString(payloadData);

                callback.invoke(payloadString);
            }
        };
        try {
            mReceiver = null;
            mReceiver = new Receiver(Radius.PROFILE_STANDARD2_WIDEBAND, mCallback);
            promise.resolve(true);
        } catch (InvalidProfileException e) {
            e.printStackTrace();
            promise.reject("RECEIVE_ERROR", e);
        }
    }

    @ReactMethod
    public void registerReceiver(Promise promise){
        if(mRadius == null){
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
    public void unregisterReceiver(Promise promise){
        if(mRadius == null){
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
}
