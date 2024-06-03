import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperComp from '../../Components/WrapperComp';
import imagePath from '../../constants/imagePath';
import {moderateScaleVertical, textScale} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import SuccessModal from '../../Components/SuccessModal';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';

const Fingerprint = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressOk = () => {
    setIsModalVisible(false);
    navigation.navigate(navigationStrings.HOME);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsModalVisible(true);
    }, 1000);
  }, []);

  return (
    <WrapperComp isInsets isBottomInsets>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View>
          <Text style={styles.headTxt}>Authorization</Text>
          <Text style={styles.descTxt}>Please use your fingerprint</Text>
        </View>
        <Image source={imagePath.successTick} style={styles.imgStyle} />
        <View>
          <Text style={styles.headTxt}>46%</Text>
          <Text style={styles.descTxt}>Scanning...</Text>
        </View>
      </View>

      <SuccessModal
        isVisible={isModalVisible}
        headText="Fingerprint Verified!"
        descText={`Your fingerprint has been ${'\n'}successfully authenticated.`}
        onPressOk={onPressOk}
      />
    </WrapperComp>
  );
};

export default Fingerprint;

const styles = StyleSheet.create({
  imgStyle: {
    marginVertical: moderateScaleVertical(60),
    alignSelf: 'center',
  },
  headTxt: {
    fontSize: textScale(28),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
  },
  descTxt: {
    marginTop: 10,
    color: colors.textGray,
    fontSize: textScale(16),
    fontFamily: fontFamily.medium,
    textAlign: 'center',
  },
});
