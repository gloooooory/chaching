import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import fontFamily from '../../styles/fontFamily';
import ButtonComp from '../../Components/ButtonComp';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
import AuthImageBackground from '../../Components/AuthImageBackground';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
  const navigation = useNavigation();

  const onNavigateSignup = () => {
    navigation?.navigate(navigationStrings.SIGNUP);
  };

  const onForgotPassword = () => {
    navigation.navigate(navigationStrings.FORGOT_PASSWORD);
  };

  return (
    <AuthImageBackground>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Image source={imagePath.logoImg} />
        <View style={styles.loginView}>
          <TextInputWithLabel
            label={'Username'}
            placeholder={'Enter username'}
          />
          <TextInputWithLabel
            label={'Password'}
            placeholder={'Enter password'}
          />
          <TouchableOpacity
            onPress={onForgotPassword}
            style={{alignSelf: 'flex-start', marginBottom: 33}}>
            <Text style={styles.forgotTxt}>Forgot Password?</Text>
          </TouchableOpacity>
          <ButtonComp btnText="Login" />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.bottomTxt}>Don’t have an account? </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={onNavigateSignup}>
            <Text style={styles.forgotTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </AuthImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
    marginTop: moderateScale(57),
    backgroundColor: colors.darkBack,
    paddingVertical: moderateScaleVertical(30),
    paddingHorizontal: moderateScaleVertical(20),
    width: '100%',
    borderRadius: 12,
  },
  forgotTxt: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fontFamily.medium,
    color: colors.blue,
  },
  bottomTxt: {
    color: colors.textGray,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fontFamily.medium,
  },
});

export default Login;
