import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperComp from '../../Components/WrapperComp';
import AuthHeader from '../../Components/AuthHeader';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import ButtonComp from '../../Components/ButtonComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../styles/colors';

const MyAccount = () => {
  return (
    <WrapperComp isInsets isBottomInsets>
      <AuthHeader headTxt={'My Account'} />

      <KeyboardAwareScrollView>
        <View style={{flex: 1, marginHorizontal: 21, marginTop: 39}}>
          <TextInputWithLabel
            label={'Username'}
            placeholder={'Enter username'}
          />
          <TextInputWithLabel
            label={'Email Address'}
            placeholder={'Enter email address'}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomView}>
        <ButtonComp btnText="Save" />
      </View>
    </WrapperComp>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  bottomView: {
    marginBottom: 30,
    paddingHorizontal: 21,
  },
});
