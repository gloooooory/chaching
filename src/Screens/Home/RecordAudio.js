import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import WrapperComp from '../../Components/WrapperComp';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import AuthHeader from '../../Components/AuthHeader';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';

const RecordAudio = () => {
  const navigation = useNavigation();
  const [isPlayView, setIsPlayView] = useState(false);

  const onDone = () => {
    navigation.navigate(navigationStrings.FINGERPRINT);
  };

  return (
    <WrapperComp isInsets isBottomInsets backgroundColor="#000B09">
      <AuthHeader headTxt={'Capturing...'} />
      <Text style={styles.capturingTxt}>Capturing the Offer...</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={imagePath.audioWave}
          style={{height: '80%', width: '80%'}}
        />
      </View>
      {!isPlayView ? (
        <View style={styles.bottomView}>
          <Text style={styles.timerTxt}>00.02.50</Text>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => setIsPlayView(true)}
            activeOpacity={0.8}>
            <Image source={imagePath.stop} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{marginBottom: 30}}>
          <Text style={styles.timerTxt}>00.02.50</Text>

          <View style={styles.bottomRow}>
            <Image source={imagePath.backward} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {}}
              style={{marginHorizontal: moderateScaleVertical(60)}}>
              <Image source={imagePath.playWhite} />
            </TouchableOpacity>
            <Image source={imagePath.forward} />
          </View>

          <View style={{marginTop: 50}}>
            <TouchableOpacity activeOpacity={0.8} style={styles.replaceView}>
              <View style={styles.redView}>
                <Text style={styles.btnTxt}>Replace</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDone} style={styles.absoluteView}>
              <Text style={styles.doneTxt}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </WrapperComp>
  );
};

export default RecordAudio;

const styles = StyleSheet.create({
  capturingTxt: {
    textAlign: 'center',
    color: colors.gray300,
    fontSize: textScale(19),
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    marginTop: 5,
  },
  bottomView: {
    marginBottom: 30,
  },
  timerTxt: {
    fontSize: textScale(45),
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    marginBottom: 40,
    textAlign: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  replaceView: {
    borderWidth: 3,
    height: moderateScale(60),
    width: 163,
    backgroundColor: 'transparent',
    borderColor: colors.white,
    borderRadius: 40,
    alignSelf: 'center',
    padding: 3,
  },
  redView: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.red,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: textScale(16),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.white,
  },
  absoluteView: {
    position: 'absolute',
    right: 30,
    bottom: 24,
  },
  doneTxt: {
    fontSize: textScale(19),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.blue,
  },
});
