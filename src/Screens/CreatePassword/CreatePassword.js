import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthImageBackground from '../../Components/AuthImageBackground';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import ButtonComp from '../../Components/ButtonComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
import InputWithIcon from '../../Components/InputWithIcon';
import imagePath from '../../constants/imagePath';

const CreatePassword = () => {
  const navigation = useNavigation();

  const onPressChange = () => {
    navigation.navigate(navigationStrings.SUCCESS);
  };

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

  return (
    <AuthImageBackground>
      <KeyboardAwareScrollView>
        <View style={{marginTop: 80, paddingHorizontal: 41}}>
          <Text style={styles.forgotTxt}>Create New Password</Text>
          <Text style={styles.descTxt}>
            Your new password should be different than previous one.
          </Text>
        </View>
        <View style={{marginTop: 50, paddingHorizontal: 41}}>
          <InputWithIcon
            extraStyle={{borderRadius: 50}}
            placeholder={'Enter new password'}
            label={'New Password'}
            rightIcon={imagePath.eyeClose}
            onPressRight={() => setIsPasswordSecure(!isPasswordSecure)}
            secureTextEntry={isPasswordSecure}
          />

          <InputWithIcon
            extraStyle={{borderRadius: 50}}
            label={'Confirm New Password'}
            placeholder={'Confirm new password'}
            rightIcon={imagePath.eyeClose}
            onPressRight={() =>
              setIsConfirmPasswordSecure(!isConfirmPasswordSecure)
            }
            secureTextEntry={isConfirmPasswordSecure}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomView}>
        <ButtonComp btnText="Change Password" onPress={onPressChange} />
      </View>
    </AuthImageBackground>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
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
