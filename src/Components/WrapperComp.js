import {Platform, StatusBar, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../styles/colors';

const WrapperComp = ({
  isTranslucent = false,
  isHidden = false,
  children,
  backgroundColor = colors.mainBack,
  isInsets = false,
  isBarLight = true,
  extraStyle = {},
  isBottomInsets = false,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={isBarLight ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
        translucent={isTranslucent}
        hidden={isHidden}
      />
      <View
        style={{
          position: 'relative',
          flex: 1,
          backgroundColor: backgroundColor,
          paddingTop: isInsets
            ? Platform.OS === 'ios'
              ? insets.top
              : 0
            : undefined,
          paddingBottom: isBottomInsets
            ? Platform.OS === 'ios'
              ? insets.bottom
              : 0
            : undefined,
          ...extraStyle,
        }}>
        {children}
      </View>
    </View>
  );
};

export default WrapperComp;
