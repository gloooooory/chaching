import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthImageBackground from '../../Components/AuthImageBackground';
import AuthHeader from '../../Components/AuthHeader';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import ButtonComp from '../../Components/ButtonComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';

const ForgotPassword = () => {
  const navigtaion = useNavigation();

  const onSendEmail = () => {
    navigtaion.navigate(navigationStrings.CREATE_PASSWORD);
  };

  return (
    <AuthImageBackground>
      <AuthHeader />
      <KeyboardAwareScrollView>
        <View style={styles.mainView}>
          <View>
            <Text style={styles.forgotTxt}>Forgot Password</Text>
            <Text style={styles.descTxt}>
              Enter email address associated with your account and we will send
              email with instruction to reset your password.
            </Text>
          </View>
          <View style={{marginTop: 50}}>
            <TextInputWithLabel
              label={'Username'}
              placeholder={'Enter username'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomView}>
        <ButtonComp btnText="Send Email" onPress={onSendEmail} />
      </View>
    </AuthImageBackground>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 36,
    paddingHorizontal: 21,
  },
  forgotTxt: {
    fontSize: 28,
    fontWeight: '500',
    fontFamily: fontFamily.medium,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  descTxt: {
    color: colors.textGray,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fontFamily.medium,
    lineHeight: 24,
    textAlign: 'center',
  },
  bottomView: {
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
});
