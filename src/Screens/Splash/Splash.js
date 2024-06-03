import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import imagePath from "../../constants/imagePath";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import navigationStrings from "../../constants/navigationStrings";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(navigationStrings.FAILED);
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
