import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import {textScale} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';
import ButtonComp from './ButtonComp';

const SuccessModal = ({
  isVisible,
  onPressOk,
  headText = 'Success!',
  descText = 'You have successfully changed the title',
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.mainView}>
        <Image
          source={imagePath.successTick}
          style={{height: 96, width: 100, alignSelf: 'center'}}
        />
        <View style={{marginTop: 22}}>
          <Text style={styles.successsTxt}>{headText}</Text>
          <Text style={styles.msgTxt}>{descText}</Text>
        </View>

        <ButtonComp
          btnStyle={{marginTop: 30}}
          btnText="Ok"
          onPress={onPressOk}
        />
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.darkBack,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  successsTxt: {
    fontSize: textScale(20),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
  },
  msgTxt: {
    fontSize: textScale(16),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.textGray,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
});
