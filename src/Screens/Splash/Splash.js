import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import imagePath from "../../constants/imagePath";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import navigationStrings from "../../constants/navigationStrings";
import { playSound } from "../../helper/helperFunctions";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(navigationStrings.TAB_BAR);
    }, 1000);
  }, []);

  return (
    <View style={styles.mainView}>
      <Image source={imagePath.logoImg} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: "70%",
    alignItems: "center",
  },
});
