import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import AuthImageBackground from "../../Components/AuthImageBackground";
import fontFamily from "../../styles/fontFamily";
import colors from "../../styles/colors";
import ButtonComp from "../../Components/ButtonComp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { playSound } from "../../helper/helperFunctions";

const Failed = () => {
  const navigation = useNavigation();

  // useFocusEffect(
  //   useCallback(() => {

  //   }, [])
  // );

  useEffect(() => {
    playSound();
  }, []);

  const onPress = () => {
    navigation?.goBack();
  };

  return (
    <AuthImageBackground>
      <View style={{ flex: 1, marginTop: "30%", alignItems: "center" }}>
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
