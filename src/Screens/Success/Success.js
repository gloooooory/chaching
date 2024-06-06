import { Image, Linking, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import AuthImageBackground from "../../Components/AuthImageBackground";
import imagePath from "../../constants/imagePath";
import fontFamily from "../../styles/fontFamily";
import colors from "../../styles/colors";
import ButtonComp from "../../Components/ButtonComp";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import navigationStrings from "../../constants/navigationStrings";
import { playSound } from "../../helper/helperFunctions";

const Success = () => {
  const route = useRoute();

  const msg = route?.params?.msg;
  const url = route?.params?.url;

  const navigation = useNavigation();

  // useFocusEffect(
  //   useCallback(() => {
  //     playSound();
  //   }, [])
  // );

  const onPressOk = () => {
    if (url) {
      Linking.openURL(url);
    }
    navigation?.goBack();
  };

  return (
    <AuthImageBackground>
      <View style={{ flex: 1, marginTop: "30%", alignItems: "center" }}>
        <Image source={imagePath.successTick} />
        <View style={{ marginTop: 21, paddingHorizontal: 47 }}>
          <Text style={styles.successTxt}>Success!</Text>
          <Text style={styles.descTxt}>
            {msg
              ? msg
              : `Your password has been changed.\nFrom now on use your new password to log in`}
          </Text>
        </View>
      </View>
      <View style={styles.bottomView}>
        <ButtonComp btnText="Show me!" onPress={onPressOk} />
      </View>
    </AuthImageBackground>
  );
};

export default Success;

const styles = StyleSheet.create({
  successTxt: {
    fontSize: 24,
    fontFamily: fontFamily.semiBold,
    fontWeight: "600",
    color: colors.white,
    textAlign: "center",
  },
  descTxt: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    fontWeight: "500",
    color: colors.textGray,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 24,
  },
  bottomView: {
    marginBottom: 50,
    paddingHorizontal: 30,
  },
});
