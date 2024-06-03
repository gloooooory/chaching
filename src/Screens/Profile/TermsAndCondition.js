import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperComp from '../../Components/WrapperComp';
import AuthHeader from '../../Components/AuthHeader';

const TermsAndCondition = () => {
  return (
    <WrapperComp isInsets isBottomInsets>
      <AuthHeader headTxt={'Terms and Conditions'} />
    </WrapperComp>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({});
