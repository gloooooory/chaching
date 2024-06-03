import { Image, Linking, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
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

const Failed = () => {
  const route = useRoute();

  const navigation = useNavigation();

  // useFocusEffect(
  //   useCallback(() => {
  //     playSound();
  //   }, [])
  // );

  const onPress = () => {
    navigation?.goBack();
  };

  return (
    <AuthImageBackground>
      <View style={{ flex: 1, marginTop: "30%", alignItems: "center" }}>
        {/* <Image source={imagePath.successTick} /> */}
        <View style={{ marginTop: 160, paddingHorizontal: 47 }}>
          <Text style={styles.successTxt}>Not found advertisement!</Text>
          <Text style={styles.descTxt}>Please try again!</Text>
        </View>
      </View>
      <View style={styles.bottomView}>
        <ButtonComp btnText="Try Again" onPress={onPress} />
      </View>
    </AuthImageBackground>
  );
};

export default Failed;

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
