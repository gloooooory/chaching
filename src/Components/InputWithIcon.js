import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';

const InputWithIcon = ({
  rightIcon,
  leftIcon,
  placeholder,
  onChangeText,
  value,
  marginBottom = 25,
  label,
  extraStyle,
  onPressRight,
  secureTextEntry,
}) => {
  return (
    <View style={{marginBottom: marginBottom}}>
      {label && <Text style={styles.labelText}>{label} </Text>}
      <View style={{...styles.mainView, ...extraStyle}}>
        {leftIcon && <Image source={leftIcon} style={{marginLeft: 18}} />}
        <TextInput
          style={styles.inputStyle}
          placeholderTextColor={colors.placeHolderColor}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressRight}>
            <Image source={rightIcon} style={{marginRight: 18}} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputWithIcon;

const styles = StyleSheet.create({
  mainView: {
    height: moderateScale(56),
    backgroundColor: colors.inputGray,
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textGray,
    paddingHorizontal: moderateScaleVertical(16),
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
