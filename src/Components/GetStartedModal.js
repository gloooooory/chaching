import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import colors from '../styles/colors';
import imagePath from '../constants/imagePath';
import fontFamily from '../styles/fontFamily';
import ButtonComp from './ButtonComp';
import {moderateScaleVertical} from '../styles/responsiveSize';
import {addAlpha} from '../helper/helperFunctions';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';

const GetStartedModal = ({isVisible, onClose}) => {
  const navigation = useNavigation();

  const onContinueWithEmail = () => {
    onClose();
    navigation.navigate(navigationStrings.LOGIN);
  };

  const SocialAppButton = ({type, image}) => {
    return (
      <View style={styles.btnView}>
        <Image source={image} />

        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.btnText}>Continue with {type}</Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      style={{margin: 0, justifyContent: 'flex-end'}}
      swipeDirection={'down'}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      isVisible={isVisible}>
      <View style={styles.mainView}>
        <View style={styles.indicatorStyle} />

        <View>
          <Text style={styles.startedTxt}>Get Started</Text>
          <Text style={styles.descTxt}>
            By signing in with your social media account, you can easily create
            an account
          </Text>

          <ButtonComp
            btnText="Continue with Email"
            onPress={onContinueWithEmail}
          />

          <View style={styles.rowView}>
            <View style={styles.equalFlex}>
              <View style={styles.hLine} />
            </View>
            <Text style={styles.orTxt}>or continue with Socail meida</Text>
            <View style={styles.equalFlex}>
              <View style={styles.hLine} />
            </View>
          </View>
        </View>

        <View>
          <SocialAppButton type={'Google'} image={imagePath.google} />
          <SocialAppButton type={'Facebook'} image={imagePath.facebook} />
          <SocialAppButton type={'Apple'} image={imagePath.apple} />
        </View>
      </View>
    </Modal>
  );
};

export default GetStartedModal;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.darkBack,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 60,
  },
  indicatorStyle: {
    height: 3,
    width: 40,
    backgroundColor: colors.gray,
    alignSelf: 'center',
    marginBottom: 30,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(22),
  },
  startedTxt: {
    fontSize: 30,
    fontFamily: fontFamily.medium,
    color: colors.white,
    fontWeight: '500',
    marginBottom: 3,
    lineHeight: 40,
  },
  descTxt: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.white,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 38,
  },
  hLine: {
    height: 1,
    width: '100%',
    backgroundColor: addAlpha(colors.lineGray, 0.3),
  },
  orTxt: {
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.lightGray,
    marginHorizontal: 10,
  },
  equalFlex: {
    flex: 1,
  },
  btnView: {
    height: 52,
    backgroundColor: colors.white,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 13,
    borderRadius: 6,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  btnText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textBlack,
  },
});
