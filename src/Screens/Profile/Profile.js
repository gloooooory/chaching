import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import WrapperComp from "../../Components/WrapperComp";
import { moderateScaleVertical, textScale } from "../../styles/responsiveSize";
import colors from "../../styles/colors";
import fontFamily from "../../styles/fontFamily";
import imagePath from "../../constants/imagePath";
import { useNavigation } from "@react-navigation/native";
import navigationStrings from "../../constants/navigationStrings";
import LogOutModal from "../../Components/LogOutModal";

const Profile = () => {
  const navigation = useNavigation();
  const [isLogModal, setIsLogModal] = useState(false);

  const MenuRowView = ({ title, type = "", onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.rowView}
      >
        <Text
          style={[
            styles.itemTxt,
            { color: type === "logout" ? colors.primary : colors.white },
          ]}
        >
          {title}
        </Text>
        {type !== "logout" && <Image source={imagePath.next} />}
      </TouchableOpacity>
    );
  };

  const navigateToScreen = name => {
    navigation.navigate(name);
  };

  return (
    <WrapperComp isInsets>
      <View style={styles.headerView}>
        <View>
          <Text style={styles.nameTxt}>John Doe</Text>
          <Text style={styles.emailTxt}>johndoe320@gmail.com</Text>
        </View>

        <View>
          <TouchableOpacity>
            <Text style={styles.editTxt}>Edit profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, paddingTop: 40, paddingHorizontal: 22 }}>
        <MenuRowView
          title={"My Account"}
          onPress={() => navigateToScreen(navigationStrings.MY_ACCOUNT)}
        />
        <MenuRowView
          title={"Notifications"}
          onPress={() => navigateToScreen(navigationStrings.NOTIFICATIONS)}
        />
        <View style={styles.hLine} />
        <View style={{ marginTop: 12 }}>
          <MenuRowView
            title={"Support"}
            onPress={() => navigateToScreen(navigationStrings.SUPPORT)}
          />
          {/*   <MenuRowView
            title={'FAQ'}
            onPress={() => navigateToScreen(navigationStrings.FAQ)}
  /> */}
          <MenuRowView
            title={"Terms & Conditions"}
            onPress={() =>
              navigateToScreen(navigationStrings.TERMS_AND_CONDITION)
            }
          />
          <MenuRowView
            title={"Log out"}
            type={"logout"}
            onPress={() => setIsLogModal(true)}
          />
        </View>
      </View>
      <LogOutModal
        isVisible={isLogModal}
        onCancel={() => setIsLogModal(false)}
        onLogout={() => setIsLogModal(false)}
      />
    </WrapperComp>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: colors.primary,
    paddingVertical: moderateScaleVertical(24),
    paddingHorizontal: moderateScaleVertical(26),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // marginTop: 8,
  },
  nameTxt: {
    fontSize: textScale(29),
    fontFamily: fontFamily.semiBold,
    fontWeight: "600",
    color: colors.white,
    lineHeight: 36,
  },
  emailTxt: {
    fontSize: textScale(16),
    fontFamily: fontFamily.regular,
    fontWeight: "400",
    color: colors.white,
  },
  editTxt: {
    fontSize: textScale(16),
    fontFamily: fontFamily.regular,
    fontWeight: "400",
    color: colors.white,
  },
  rowView: {
    height: 40,
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  itemTxt: {
    fontSize: textScale(16),
    fontFamily: fontFamily.regular,
    fontWeight: "400",
    color: colors.white,
  },
  hLine: {
    height: 1,
    width: "100%",
    backgroundColor: colors.gray400,
    marginVertical: moderateScaleVertical(16),
  },
});
