import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import WrapperComp from '../../Components/WrapperComp';
import AuthHeader from '../../Components/AuthHeader';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import fontFamily from '../../styles/fontFamily';
import InputWithIcon from '../../Components/InputWithIcon';

const Faq = () => {
  const [clickInd, setClickInd] = useState(null);
  const [searchTxt, setSearchTxt] = useState('');

  const onPressBox = ind => {
    if (ind === clickInd) {
      setClickInd(null);
    } else {
      setClickInd(ind);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPressBox(index)}
        style={[
          styles.boxView,
          {
            backgroundColor:
              clickInd === index ? colors.primary : 'transparent',
            borderColor:
              clickInd === index ? colors.primaryBase : colors.darkBack,
          },
        ]}>
        <View style={styles.rowView}>
          <View style={{flex: 1, marginRight: 10}}>
            <Text
              style={[
                styles.headTxt,
                {color: clickInd === index ? colors.white : colors.textGray},
              ]}>
              What does LOREM mean?
            </Text>
          </View>
          <Image source={clickInd === index ? imagePath.up : imagePath.down} />
        </View>
        {clickInd === index && (
          <Text style={styles.descTxt}>
            ‘Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete
            text) is dummy text that is not meant to mean anything. It is used
            as a placeholder in magazine layouts, for example, in order to give
            an impression of the finished document.
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const onChangeText = txt => {
    setSearchTxt(txt);
  };

  return (
    <WrapperComp isInsets isBottomInsets>
      <AuthHeader headTxt={'FAQ'} />

      <View style={{marginTop: 40, marginBottom: 35, marginHorizontal: 21}}>
        <InputWithIcon
          leftIcon={imagePath.search}
          placeholder={'Search...'}
          onChangeText={onChangeText}
          value={searchTxt}
        />
      </View>

      <View style={{flex: 1, marginHorizontal: 21}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={['', '', '', '', '', '', '', '', '', '', '', '']}
          renderItem={_renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </WrapperComp>
  );
};

export default Faq;

const styles = StyleSheet.create({
  boxView: {
    minHeight: moderateScale(58),
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: moderateScaleVertical(16),
  },
  rowView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headTxt: {
    fontSize: textScale(14),
    fontFamily: fontFamily.medium,
    fontWeight: '500',

    lineHeight: 20,
  },
  descTxt: {
    fontSize: textScale(14),
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.white,
    marginTop: 16,
    lineHeight: 20,
  },
});
