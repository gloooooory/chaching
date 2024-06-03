import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import colors from '../styles/colors';
import imagePath from '../constants/imagePath';
import fontFamily from '../styles/fontFamily';
import TextInputWithLabel from './TextInputWithLabel';
import ButtonComp from './ButtonComp';

const EditTitleModal = ({onClose, isVisible, onSave}) => {
  return (
    <Modal
      onBackdropPress={() => Keyboard.dismiss()}
      avoidKeyboard
      isVisible={isVisible}>
      <View style={styles.mainView}>
        <View style={styles.rowView}>
          <Text style={styles.editTxt}>Edit Title</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
            <Image source={imagePath.close} />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 27, paddingHorizontal: 24, marginBottom: 40}}>
          <TextInputWithLabel
            label={'Title'}
            placeholder={'Enter title here'}
          />
          <ButtonComp
            btnStyle={{marginTop: 30}}
            btnText="Save"
            onPress={onSave}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EditTitleModal;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.darkBack,
    borderRadius: 12,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 53,
    borderBottomWidth: 1,
    borderColor: colors.dividerColor,
    paddingHorizontal: 15,
  },
  editTxt: {
    fontSize: 20,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.white,
  },
});
