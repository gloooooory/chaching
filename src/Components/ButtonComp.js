import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale } from "../styles/responsiveSize";
import colors from "../styles/colors";
import fontFamily from "../styles/fontFamily";
import { hitSlopProp } from "../styles/commonStyles";

const ButtonComp = ({
  onPress,
  btnText = "",
  btnTextStyle = {},
  btnStyle = {},
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.btnStyle, ...btnStyle }}
      hitSlop={hitSlopProp}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Text style={{ ...styles.btnTextStyle, ...btnTextStyle }}>{btnText}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.primary,
    height: moderateScale(52),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: moderateScale(8),
    borderRadius: 100,
    width: "100%",
  },
  btnTextStyle: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    fontWeight: "500",
    textTransform: "capitalize",
    color: colors.white,
  },
});
export default ButtonComp;
