import {StyleSheet, View} from 'react-native';
import React from 'react';
import WrapperComp from '../../Components/WrapperComp';
import AuthHeader from '../../Components/AuthHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import ButtonComp from '../../Components/ButtonComp';

const Support = () => {
  return (
    <WrapperComp isInsets isBottomInsets>
      <AuthHeader headTxt={'Support'} />
      <KeyboardAwareScrollView>
        <View style={{flex: 1, marginTop: 40, paddingHorizontal: 21}}>
          <TextInputWithLabel
            label={'Your Full Name'}
            placeholder={'Enter your name'}
          />
          <TextInputWithLabel
            label={'Email Address'}
            placeholder={'Enter email address'}
          />
          <TextInputWithLabel
            label={'Your Query'}
            extraInputStyle={{
              height: 90,
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
            multiline
            placeholder={'Enter your query'}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomView}>
        <ButtonComp btnText="Save" />
      </View>
    </WrapperComp>
  );
};

export default Support;

const styles = StyleSheet.create({
  bottomView: {
    marginBottom: 30,
    marginHorizontal: 21,
  },
});
