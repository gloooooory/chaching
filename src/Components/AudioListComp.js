import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import imagePath from '../constants/imagePath';
import fontFamily from '../styles/fontFamily';

const AudioListComp = ({item, index, onPressEdit}) => {
  return (
    <View key={index} style={styles.mainVieww}>
      <View style={[styles.rowView, {flex: 1}]}>
        <Image source={imagePath.playIcon} />
        <View style={{flex: 1, marginLeft: 9}}>
          <Text style={styles.nameTxt}>Recording1503.mp3</Text>
          <Text style={styles.timerTxt}>00.03.21</Text>
        </View>
      </View>

      <View style={styles.rowView}>
        <TouchableOpacity onPress={onPressEdit}>
          <Image source={imagePath.edit} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: 15}}>
          <Image source={imagePath.delete} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioListComp;

const styles = StyleSheet.create({
  mainVieww: {
    backgroundColor: colors.darkBack,
    marginBottom: 10,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameTxt: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.white,
  },
  timerTxt: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textGray,
    marginTop: 4,
  },
  editTxt: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.primary,
    marginLeft: 5,
  },
});
