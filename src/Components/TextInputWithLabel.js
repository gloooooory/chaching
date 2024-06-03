import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';

const TextInputWithLabel = ({
  value,
  onChangeText,
  placeholder,
  inputStyle,
  label,
  marginBottom = 25,
  multiline = false,
  extraInputStyle,
  ...props
}) => {
  return (
    <View style={{marginBottom: marginBottom}}>
      <Text style={styles.labelText}>{label} </Text>
      <TextInput
        style={{...styles.inputStyle, ...extraInputStyle}}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.placeHolderColor}
        placeholder={placeholder}
        multiline={multiline}
        {...props}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.medium,
    backgroundColor: colors.inputGray,
    borderRadius: 50,
    height: moderateScale(50),
    paddingHorizontal: moderateScale(20),
    color: colors.placeHolderColor,
  },
  labelText: {
    fontSize: textScale(14),
    fontFamily: fontFamily.medium,
    marginBottom: moderateScaleVertical(14),
    textTransform: 'capitalize',
    fontWeight: '500',
    color: colors.labelColor,
  },
});

export default TextInputWithLabel;
