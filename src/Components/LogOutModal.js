import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import colors from '../styles/colors';
import {moderateScale, textScale} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';
import ButtonComp from './ButtonComp';

const LogOutModal = ({isVisible = false, onCancel, onLogout}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={() => {}}
      onBackdropPress={() => {}}>
      <View style={styles.mainView}>
        <Text style={styles.logTxt}>Log out</Text>
        <Text style={styles.descTxt}>Are you sure you want to log out? </Text>

        <View style={styles.rowView}>
          <View style={styles.flexView}>
            <ButtonComp
              onPress={onCancel}
              btnStyle={styles.cancelView}
              btnText="Cancel"
            />
          </View>
          <View style={[styles.flexView, {marginLeft: 12}]}>
            <ButtonComp btnText="Logout" onPress={onLogout} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogOutModal;

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 32,
    backgroundColor: colors.darkBack,
    paddingVertical: 30,
    borderRadius: 12,
  },
  logTxt: {
    fontSize: textScale(20),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
  },
  descTxt: {
    fontSize: textScale(16),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.textGray,
    marginTop: 8,
    textAlign: 'center',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(40),
  },
  flexView: {
    flex: 1,
  },
  cancelView: {
    backgroundColor: colors.darkGray,
  },
});
