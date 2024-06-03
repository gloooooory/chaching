import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import WrapperComp from '../../Components/WrapperComp';
import AuthHeader from '../../Components/AuthHeader';
import AudioListComp from '../../Components/AudioListComp';
import EditTitleModal from '../../Components/EditTitleModal';
import SuccessModal from '../../Components/SuccessModal';

const RecordingFiles = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const onSave = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsSuccessModal(true);
    }, 400);
  };

  return (
    <WrapperComp isInsets isBottomInsets>
      <AuthHeader headTxt={'Recording files'} />
      <View style={{paddingTop: 10, flex: 1, marginHorizontal: 20}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
          ]}
          renderItem={({item, index}) => {
            return (
              <AudioListComp
                item={item}
                index={index}
                onPressEdit={() => setIsModalVisible(true)}
              />
            );
          }}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{paddingTop: 20, paddingBottom: 20}}
        />
      </View>
      <EditTitleModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={onSave}
      />
      <SuccessModal
        isVisible={isSuccessModal}
        onPressOk={() => setIsSuccessModal(false)}
      />
    </WrapperComp>
  );
};

export default RecordingFiles;

const styles = StyleSheet.create({});
