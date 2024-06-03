import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import WrapperComp from "../../Components/WrapperComp";
import AuthHeader from "../../Components/AuthHeader";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../styles/responsiveSize";
import imagePath from "../../constants/imagePath";
import { BarIndicator, DotIndicator } from "react-native-indicators";
import colors from "../../styles/colors";
import fontFamily from "../../styles/fontFamily";
import ButtonComp from "../../Components/ButtonComp";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import navigationStrings from "../../constants/navigationStrings";

const ListenMusic = () => {
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(true);

  // useEffect(() => {
  //   if (isListening) {
  //     setTimeout(() => {
  //       setIsListening(false);
  //     }, 4000);
  //   } else {
  //     setTimeout(() => {
  //       setIsError(true);
  //     }, 3000);
  //   }
  // }, [isListening]);

  const [isError, setIsError] = useState(false);

  const onTryAgain = () => {
    setIsError(false);
    setIsListening(true);
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const onEnterCode = () => {
    navigation?.navigate(navigationStrings.ENTER_CODE);
  };

  return (
    <WrapperComp isInsets isBottomInsets>
      {!isError ? (
        <View style={{ flex: 1 }}>
          <AuthHeader />

          <View style={{ marginTop: moderateScale(20) }}>
            {isListening ? (
              <BarIndicator color={colors.white} count={6} size={20} />
            ) : (
              <DotIndicator color={colors.white} count={3} size={10} />
            )}
            <View
              style={{ marginTop: 20, width: 320, marginHorizontal: "auto" }}
            >
              <Text style={styles.listenTxt}>
                {isListening
                  ? "Claiming the Offer from the Merchant"
                  : "Searching..."}
              </Text>
              <Text style={styles.adviceTxt}>
                {isListening ? "" : "Please wait"}
              </Text>
            </View>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={[
                styles.dot,
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              {[...Array(3).keys()].map(index => {
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
            </View>
          </View>
          <View
            style={{ flexDirection: "column", gap: 60, alignItems: "center" }}
          >
            <TouchableOpacity onPress={onEnterCode}>
              <Text style={styles.codeButton}>Enter Manual Code</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.boxView}>
            <Image
              source={imagePath.exclamation}
              style={{ alignSelf: "center" }}
            />
            <View style={{ marginTop: moderateScale(30) }}>
              <Text style={styles.noResultTxt}>No Ad Recognized</Text>
              <Text style={styles.infoTxt}>
                We didn’t find any ad recognized
              </Text>
            </View>

            <View style={styles.rowView}>
              <View style={styles.flexView}>
                <ButtonComp
                  onPress={onCancel}
                  btnStyle={styles.cancelView}
                  btnText="Cancel"
                />
              </View>
              <View style={[styles.flexView, { marginLeft: 15 }]}>
                <ButtonComp btnText="Try Again" onPress={onTryAgain} />
              </View>
            </View>
          </View>
        </View>
      )}
    </WrapperComp>
  );
};

export default ListenMusic;

const styles = StyleSheet.create({
  listenTxt: {
    fontSize: 21,
    fontFamily: fontFamily.semiBold,
    lineHeight: 36,
    fontWeight: "600",
    color: colors.white,
    textAlign: "center",
  },
  adviceTxt: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    fontWeight: "400",
    color: colors.gray300,
    marginTop: moderateScale(10),
    textAlign: "center",
  },
  boxView: {
    paddingHorizontal: moderateScaleVertical(62),
  },
  noResultTxt: {
    fontSize: textScale(20),
    fontFamily: fontFamily.medium,
    fontWeight: "500",
    color: colors.white,
    textAlign: "center",
  },
  infoTxt: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    fontWeight: "500",
    color: colors.textGray,
    textAlign: "center",
    marginTop: moderateScaleVertical(10),
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(30),
  },
  flexView: {
    flex: 1,
  },
  cancelView: {
    backgroundColor: colors.darkGray,
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
  cancelButton: {
    color: "white",
    backgroundColor: "#FF3B32",
    paddingHorizontal: 32,
    paddingVertical: 13,
    fontSize: 16,
    fontWeight: "500",
    borderRadius: 55,
  },
});
