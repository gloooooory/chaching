import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import colors from '../../styles/colors';
import {scale, textScale, width} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import {addAlpha} from '../../helper/helperFunctions';
import ButtonComp from '../../Components/ButtonComp';
import imagePath from '../../constants/imagePath';
import GetStartedModal from '../../Components/GetStartedModal';
import WrapperComp from '../../Components/WrapperComp';

const Onboarding = () => {
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const slides = [
    {
      key: 1,
      title: 'Title 1',
      text: 'Description.\nSay something cool',

      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',

      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",

      backgroundColor: '#22bcb5',
    },
  ];

  const _renderItem = ({item, index}) => {
    return (
      <View style={{width: width, paddingHorizontal: 32}}>
        <Text style={styles.mainTxt}>
          {'Unlock the Power of Audio Fingerprinting for Targeted Advertising'}
        </Text>
      </View>
    );
  };

  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setSwipeIndex(roundIndex);
  }, []);

  return (
    <WrapperComp>
      <ImageBackground
        source={imagePath.onboardBack}
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{minHeight: 230}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            data={slides}
            renderItem={_renderItem}
            onScroll={onScroll}
          />
        </View>
        <View
          style={{flexWrap: 'wrap', flexDirection: 'row', marginBottom: 80}}>
          {slides.map((item, index) => {
            return (
              <View
                style={
                  swipeIndex === index ? styles.dotStyle : styles.inactiveDot
                }
                key={index}
              />
            );
          })}
        </View>

        <ButtonComp
          btnStyle={styles.btnStyle}
          btnText="Get Started"
          onPress={() => setIsModalVisible(!isModalVisible)}
        />

        <GetStartedModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      </ImageBackground>
    </WrapperComp>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  mainTxt: {
    fontSize: textScale(38),
    fontWeight: '500',
    fontFamily: fontFamily.medium,
    color: colors.textWhite,
    textAlign: 'center',
  },
  dotStyle: {
    height: 5,
    backgroundColor: colors.primary,
    width: 60,
    marginLeft: 12,
    borderRadius: 10,
  },
  inactiveDot: {
    height: 5,
    backgroundColor: addAlpha(colors.primary, 0.2),
    width: 60,
    marginLeft: 12,
    borderRadius: 10,
  },
  btnStyle: {
    width: width / 1.7,
    height: 60,
  },
});
