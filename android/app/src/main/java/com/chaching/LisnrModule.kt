package com.chaching

import com.facebook.react.bridge.*
// import com.lisnr.sdk.v2.radius.Lisnr
// import com.lisnr.sdk.v2.radius.Payload

class LisnrModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    // private var lisnr: Lisnr? = null

    override fun getName(): String {
        return "LisnrModule"
    }

    @ReactMethod
    fun initLisnr(apiKey: String, callback: Callback) {
        // lisnr = Lisnr.getInstance(reactApplicationContext)
        // lisnr?.init(apiKey)
        callback.invoke("LISNR Initialized")
    }

    @ReactMethod
    fun startListening(callback: Callback) {
        // lisnr?.start { payload ->
        //     // Assuming payload needs to be processed or just logged
        //     callback.invoke("Payload Received: ${payload.toString()}")
        // }
        callback.invoke("Listening Started")
    }

    @ReactMethod
    fun stopListening(callback: Callback) {
        // lisnr?.stop()
        callback.invoke("Listening Stopped")
    }
}
