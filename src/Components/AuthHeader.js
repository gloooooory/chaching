import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import imagePath from '../constants/imagePath';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import {useNavigation} from '@react-navigation/native';

const AuthHeader = ({headTxt}) => {
  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.rowView}>
      <TouchableOpacity onPress={onBack}>
        <Image source={imagePath.back} />
      </TouchableOpacity>
      {headTxt && (
        <View style={{flex: 0.9, alignItems: 'center'}}>
          <Text style={styles.textStyle}>{headTxt}</Text>
        </View>
      )}
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 45,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  textStyle: {
    fontSize: 21,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.white,
  },
});
