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
} from "react-native";
import { MotiView } from "moti";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Easing } from "react-native-reanimated";
// import * as mm from 'music-metadata';

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
    console.log("Speech recognition ended");
    setIsRecord(false);
  };

  const handleSpeechResults = event => {
    const transcript = event.value[0].replace(/ /g, "");
    console.log("transcript = ", transcript);
    const fourDigitNumbers = transcript.match(/\b\d{4}\b/g);
    if (fourDigitNumbers) {
      console.log("Four-digit numbers:", fourDigitNumbers.join(" "));
      setFourDigit(fourDigitNumbers);
    } else {
      console.log("No four-digit numbers found.");
    }
  };

  const handleSpeechError = error => {
    console.error("Speech recognition error:", error);
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

    Voice.start("en-US");
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

      console.log("[res of getAdvertise] = ", res);
    } catch (error) {
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
    ss();

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
  },
});
