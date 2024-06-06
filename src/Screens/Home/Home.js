import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { DotIndicator } from "react-native-indicators";

import {
  Platform,
  Image,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  AppState,
  NativeEventEmitter,
} from "react-native";
import { MotiView } from "moti";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Easing } from "react-native-reanimated";

import WrapperComp from "../../Components/WrapperComp";
import imagePath from "../../constants/imagePath";
import navigationStrings from "../../constants/navigationStrings";
import { textScale } from "../../styles/responsiveSize";
import fontFamily from "../../styles/fontFamily";
import colors from "../../styles/colors";
import { getAdvertise } from "../../redux/actions/promoCodeAction";
import LisnrModule from "../../nativeModule/LisnrModule";
import { showErrorToast, showSuccessToast } from "../../helper/helperFunctions";

const Home = () => {
  const navigation = useNavigation();

  const [appState, setAppState] = useState(AppState.currentState);

  const [fourDigit, setFourDigit] = useState(null);
  const [isRecord, setIsRecord] = useState(false);
  const [fingerprint, setFingerprint] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [createdRadius, setCreatedRadius] = useState(false);
  const [createdReceiver, setCreatedReceiver] = useState(false);

  const requestMicrophonePermission = async () => {
    let permission;
    if (Platform.OS === "ios") {
      permission = PERMISSIONS.IOS.MICROPHONE;
    } else {
      permission = PERMISSIONS.ANDROID.RECORD_AUDIO;
    }

    const result = await request(permission);

    return result === RESULTS.GRANTED;
  };

  const onOpenSettings = async () => {
    await Linking.openSettings();
  };

  const startRecording = async () => {
    const hasPermission = await requestMicrophonePermission();

    if (!hasPermission) {
      Alert.alert(
        "Permissions Required",
        "This app needs microphone permissions to record audio."
      );
      return;
    }

    if (createdRadius && createdReceiver && !isRecord) {
      try {
        const res = await LisnrModule.registerReceiver();
        console.log("[registerReceiver]", res);

        setFourDigit(null);
        setIsRecord(true);
      } catch (error) {
        console.log("startRecording", error);
      }
    }
  };

  const stopRecording = async () => {
    try {
      const res = await LisnrModule.unregisterReceiver();
      console.log("[unregisterReceiver]", res);
    } catch (error) {
      console.log("unregisterReceiver error", error);
    }
    setIsRecord(false);
  };

  const searchProduct = async () => {
    try {
      setIsUploading(true);
      const res = await getAdvertise(fourDigit);

      navigation.navigate(navigationStrings.SUCCESS, {
        msg: "Found Advertisement",
        url: res.url,
      });
    } catch (error) {
      // Alert.alert("Verification Code is Invalid");
      navigation.navigate(navigationStrings.FAILED);
      setFourDigit(null);
      console.log("search product", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const createRadius = async () => {
      const token =
        "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiYjRmNjA0OGUtNmVlZi00YzY1LTkyZTQtYzJjNzc4YTE0NGVhIiwiYXBwX2lkIjoiNzYyMjg5ODgtZTNiYS00NDZkLThlYjQtZGZlM2FhMTczZjE5IiwiYW5hbHl0aWNzX3VybCI6Imh0dHBzOi8vYW5hbHl0aWNzLmxpc25yLmNvbSIsImFwcF9pbmZvX3VybCI6Imh0dHBzOi8vZW5saWx4Mnc1MmVhc3NreXFkemUuYXBpLmxpc25yLmNvbSIsImV4cCI6MTcxODMyMzIwMCwianRpIjoiMWMxYmEyZDktMGE4Ny00MTVhLTg3YWYtOTdjOWE2YjM2NzcwIiwibmV0d29yayI6dHJ1ZSwicGtfaWQiOjYsInNka190eXBlIjoicmFkaXVzIiwidG9uZV9wcml2YWN5X2lkIjpudWxsLCJ2ZXJzaW9uIjo1LCJhbmRyb2lkX2FwcGxpY2F0aW9uX2lkcyI6WyJjb20uY2hhY2hpbmciXSwiYXBwbGVfYnVuZGxlX2lkcyI6WyJjb20uY2hhY2hpbmciXX0.VtOElOkL6uj_mLeJoH7qwbp0KmNbjbinPZn4Mbr_idBNQGmzjFfVYtAFHCNfFVl09zS2g0okvhX-Vdnbm5WUAR6KXv4lP6UbKwPj3FQWU8t3HCPTLkSIy9qpLs8rBxbNGFD0p2GON8rOd5_P54oSMfZwM2RT23L4zhnNtQLsKgyWM9C6mLAd_0v9m6Utl5YwaYrWoCiMPhRHdvaz8XvsAVg_2N_s6QX-CK-pe1jdfQaxmFGay0lo7PZ79DsX3SVUtUfiUyqsDmyhhQ3HHPKfRurEvj9g5Li6bywvtkhUz6YfKwBtxp1uf8V_NFktQJGqagj-tJcTFxprvumJksebA8w70vnnn9Tmcp0OpqukYr7mYWOaKcV9y5DKUldwOHXNyInIAylMSPWdTaV_f4ulh2i-QyQjn3YmXD5MCaon7GW1WKdJjNO-fFAjcoICv3k6uompUpp_CChoWSX6ulgO_9JsPK3Y2FT94Ckd1kkdG9qrEdXn2IlX7xrFhfaHZ8_UM_nAb-oOQbIS5H1AsObR02PGbgfXa_Jj3Rri5ZO6CFwic6ZK3_vGLfpzIq1ixBSgqIMrM_0JVGDo0oT8CdfSOIvTzW7xrJhF1zDpgwDOQsYWpUZYX0OT0OPfmxnOe8Cjqi56AyxnOhRfIfnHV107dr0ju_aN79PHWh2VIWdhIGs";
      try {
        const res = LisnrModule.createRadius(token);

        setCreatedRadius(true);

        showSuccessToast("Radius creation success.");
        console.log("Radius creation success.");
      } catch (error) {
        showErrorToast("Radius creation failed." + error.message);
        console.log("createRadius error = ", error.message);
      }
    };

    createRadius();
    createReceiver();
  }, []);

  useEffect(() => {
    if (fourDigit?.length == 7) {
      searchProduct();
    }
  }, [fourDigit]);

  useEffect(() => {
    if (isRecord) setDescription("Listening...");
    else if (isUploading) setDescription("Searching...");
    else setDescription("Tap to Chaching");
  }, [isRecord, isUploading]);

  const createReceiver = useCallback(async () => {
    try {
      console.log("Attempting to create receiver...");
      const res = await LisnrModule.createReceiver();
      console.log("Receiver creation success.");
      setCreatedReceiver(true);
    } catch (error) {
      showErrorToast(`Error in creating receiver: ${error.message}`);
      console.log(`createReceiver error: ${error.message}`);
    }
  }, []);

  const handleAppStateChange = useCallback(
    nextAppState => {
      console.log("handleAppStateChange");
      if (appState === "active" && nextAppState === "inactive") {
        console.log("App has paused (onPause)");
        LisnrModule.unregisterAll();
      } else if (
        appState.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has resumed (onResume)");
        createReceiver();
      }

      setAppState(nextAppState);
      console.log("AppState", nextAppState);
    },
    [appState, createReceiver]
  );

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange, createReceiver]);

  //Native Event Handlers
  const AudioErrorHandle = event => {
    console.log(`[Audio Error] = ${event.code}:${event.reason}`);
  };

  const payloadResultHandle = event => {
    console.log("[payloadString] = ", event.payload);
    setFourDigit(event.payload);
    stopRecording();
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(LisnrModule);
    let payloadEventListener = eventEmitter.addListener(
      "EventPayload",
      payloadResultHandle
    );
    let audioErrorEventListener = eventEmitter.addListener(
      "RadiusErrorCallback",
      AudioErrorHandle
    );

    // Removes the listener once unmounted
    return () => {
      payloadEventListener.remove();
      audioErrorEventListener.remove();
    };
  }, []);

  return (
    <WrapperComp backgroundColor="#000b09" isInsets>
      <TouchableOpacity>
        <Image
          source={imagePath.gearIcon}
          style={{ position: "absolute", top: 32, right: 32 }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[
            styles.dot,
            { justifyContent: "center", alignItems: "center" },
          ]}
          activeOpacity={0.9}
          onPressIn={startRecording}
          onPressOut={stopRecording}
        >
          {isRecord &&
            [...Array(3).keys()].map(index => {
              return (
                <MotiView
                  from={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: 0, scale: 4 }}
                  transition={{
                    type: "timing",
                    duration: 2000,
                    easing: Easing.out(Easing.ease),
                    delay: index * 400,
                    repeatReverse: false,
                    loop: true,
                  }}
                  key={index}
                  style={[StyleSheet.absoluteFillObject, styles.dot]}
                />
              );
            })}
          <Image source={imagePath.homeLogo} />
        </TouchableOpacity>
        <View style={{ height: 36, marginTop: 100 }}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: textScale(24),
            }}
          >
            {fourDigit}
          </Text>
        </View>
        <Text style={styles.tapTxt}>{description}</Text>
        {isUploading && <Text style={styles.pleaseTxt}>Please wait</Text>}
        <View
          style={{
            height: 80,
            marginTop: 16,
            alignItems: "center",
          }}
        >
          {(isRecord || isUploading) && (
            <DotIndicator color="white" count={6} size={8} />
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation?.navigate(navigationStrings.ENTER_CODE)}
        >
          <Text style={styles.codeButton}>Enter Code Manuallly</Text>
        </TouchableOpacity>
      </View>
    </WrapperComp>
  );
};

export default Home;

const styles = StyleSheet.create({
  wlcmTxt: {
    fontSize: textScale(30),
    fontFamily: fontFamily.medium,
    fontWeight: "500",
    color: colors.white,
    lineHeight: 45,
  },
  tapTxt: {
    fontSize: textScale(30),
    fontFamily: fontFamily.medium,
    fontWeight: "500",
    color: colors.white,
    marginTop: 32,
    textAlign: "center",
  },
  dot: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  codeButton: {
    color: colors.primary,
    fontSize: 21,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
  pleaseTxt: {
    color: colors.gray,
    fontSize: textScale(14),
    fontWeight: "500",
    textAlign: "center",
    fontFamily: fontFamily.medium,
    marginTop: 10,
  },
});
