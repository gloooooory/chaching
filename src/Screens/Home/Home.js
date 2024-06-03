import React, { useEffect, useState } from "react";
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
import Voice from "@react-native-voice/voice";
import { getAdvertise } from "../../redux/actions/promoCodeAction";

const Home = () => {
  const navigation = useNavigation();

  const [fourDigit, setFourDigit] = useState(null);
  const [isRecord, setIsRecord] = useState(false);
  const [fingerprint, setFingerprint] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState("");

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

  const handleSpeechStart = async () => {
    console.log("Speech recognition started");
  };

  const handleSpeechEnd = () => {
    // console.log(e, "sdfkjbsdkfn");
    console.log("Speech recognition ended");
    setIsRecord(false);
  };

  const handleSpeechResults = event => {
    console.log(event.value[0], "event.value[0]");
    const transcript = event.value[0].replace(/ /g, "");
    let newTranscript = transcript?.replace(/[-,' ']/g, "");
    const fourDigitNumbers = newTranscript?.slice(0, 7);
    if (fourDigitNumbers?.length === 7) {
      setFourDigit(fourDigitNumbers.toUpperCase());
    } else {
      console.log("No seven-digit numbers found.");
    }
  };

  const onOpenSettings = async () => {
    await Linking.openSettings();
  };

  const handleSpeechError = error => {
    console.error("Speech recognition error:", error);

    if (error?.error?.message === "User denied access to speech recognition") {
      Alert.alert(
        "Permission denied",
        "User denied access to speech recognition",
        [
          {
            text: "Open Settings",
            onPress: () => onOpenSettings(),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
    setIsRecord(false);
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

    await Voice.start("en-US");
    setIsRecord(true);
  };

  const stopRecording = async () => {
    setIsRecord(false);
    Voice.stop();
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
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const ss = async () => {
      console.log(
        "getSpeechRecognitionServices = ",
        await Voice.getSpeechRecognitionServices()
      );
    };
    if (Platform.OS === "android") {
      ss();
    }

    Voice.onSpeechStart = handleSpeechStart;
    Voice.onSpeechEnd = handleSpeechEnd;
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechError = handleSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (isRecord) setFourDigit(null);
    else if (fourDigit) {
      searchProduct();
    }
  }, [isRecord, fourDigit]);

  useEffect(() => {
    if (isRecord) setDescription("Listening...");
    else if (isUploading) setDescription("Searching...");
    else setDescription("Tap to Chaching");
  }, [isRecord, isUploading]);

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
