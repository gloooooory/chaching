import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import imagePath from '../constants/imagePath';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AuthImageBackground = ({children, extraStyle}) => {
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground
      source={imagePath.authBack}
      style={{height: '100%', width: '100%'}}>
      <View style={{paddingTop: insets.top, flex: 1, ...extraStyle}}>
        {children}
      </View>
    </ImageBackground>
  );
};

export default AuthImageBackground;

const styles = StyleSheet.create({});
