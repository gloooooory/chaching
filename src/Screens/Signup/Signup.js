import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AuthHeader from '../../Components/AuthHeader';
import AuthImageBackground from '../../Components/AuthImageBackground';
import colors from '../../styles/colors';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import ButtonComp from '../../Components/ButtonComp';
import fontFamily from '../../styles/fontFamily';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Signup = () => {
  const navigation = useNavigation();

  const onPressLogin = () => {
    navigation.goBack();
  };

  return (
    <AuthImageBackground>
      <AuthHeader headTxt={'Sign up'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.boxView}>
          <TextInputWithLabel
            label={'Username'}
            placeholder={'Enter username'}
          />
          <TextInputWithLabel
            label={'Email Address'}
            placeholder={'Enter email address'}
          />
          <TextInputWithLabel
            label={'Enter Password'}
            placeholder={'Enter password'}
          />

          <ButtonComp btnText="Sign up" btnStyle={{marginTop: 5}} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.bottomTxt}>Don’t have an account? </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressLogin}>
            <Text style={styles.forgotTxt}> Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </AuthImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  boxView: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: colors.darkBack,
    marginHorizontal: 21,
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
