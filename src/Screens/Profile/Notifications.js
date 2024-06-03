import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import WrapperComp from '../../Components/WrapperComp';
import AuthHeader from '../../Components/AuthHeader';
import {textScale} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';

const Notifications = () => {
  const [notificationState, setNotificationState] = useState(false);
  const [offerState, setOfferState] = useState(false);

  const SwitchComp = ({isEnabled, onValueChange}) => {
    return (
      <Switch
        onValueChange={onValueChange}
        thumbColor={isEnabled ? colors.white : colors.thumbInactive}
        trackColor={{false: colors.trackInactive, true: colors.primary}}
        value={isEnabled}
      />
    );
  };

  return (
    <WrapperComp isInsets isBottomInsets>
      <AuthHeader headTxt={'Notifications'} />
      <View style={{flex: 1, marginTop: 40, marginHorizontal: 21}}>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Content notification</Text>
          <SwitchComp
            onValueChange={() => setNotificationState(!notificationState)}
            isEnabled={notificationState}
          />
        </View>

        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Promo offers</Text>
          <SwitchComp
            onValueChange={() => setOfferState(!offerState)}
            isEnabled={offerState}
          />
        </View>
      </View>
    </WrapperComp>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 34,
    marginBottom: 20,
  },
  titleTxt: {
    fontSize: textScale(16),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.white,
  },
});
