import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../styles/colors";
import { Image, Platform, StyleSheet, View } from "react-native";
import imagePath from "../constants/imagePath";
import navigationStrings from "../constants/navigationStrings";
import Home from "../Screens/Home/Home";
import { textScale } from "../styles/responsiveSize";
import fontFamily from "../styles/fontFamily";
import Profile from "../Screens/Profile/Profile";
import Library from "../Screens/Library/Library";
import Setting from "../Screens/Setting/Setting";

const BottomTab = createBottomTabNavigator();

const TabRoutes = props => {
  return (
    <BottomTab.Navigator
      initialRouteName={navigationStrings.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: styles.labelStyle,
        tabBarStyle: {
          ...styles.customBottomtabsStyle,

          height: Platform.OS === "ios" ? 80 : 60,
          paddingBottom: Platform.OS === "ios" ? 30 : 8,
        },
      }}
    >
      <BottomTab.Screen
        name={navigationStrings.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={imagePath.homeTabIcon}
              style={{
                tintColor: focused ? colors.primary : colors.tabInactive,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={navigationStrings.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={imagePath.profileTabIcon}
              style={{
                tintColor: focused ? colors.primary : colors.tabInactive,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={navigationStrings.LIBRARY}
        component={Library}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={imagePath.libraryTabIcon}
              style={{
                tintColor: focused ? colors.primary : colors.tabInactive,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={navigationStrings.SETTINGS}
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={imagePath.settingTabIcon}
              style={{
                tintColor: focused ? colors.primary : colors.tabInactive,
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  customBottomtabsStyle: {
    backgroundColor: colors.darkBack,
    borderTopWidth: 0,
  },
  labelStyle: {
    fontSize: textScale(10),
    fontFamily: fontFamily.medium,
    fontWeight: "500",
    lineHeight: 13,
    textTransform: "capitalize",
  },
});

export default TabRoutes;
