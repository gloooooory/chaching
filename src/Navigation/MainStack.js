import React from "react";
import navigationStrings from "../constants/navigationStrings";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Onboarding, Splash } from "../Screens";
import Signup from "../Screens/Signup/Signup";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";
import CreatePassword from "../Screens/CreatePassword/CreatePassword";
import Success from "../Screens/Success/Success";
import TabRoutes from "./TabRoutes";
import Fingerprint from "../Screens/Home/Fingerprint";
import Failed from "../Screens/Home/Failed";
import MyAccount from "../Screens/Profile/MyAccount";
import Notifications from "../Screens/Profile/Notifications";
import Support from "../Screens/Profile/Support";
import Faq from "../Screens/Profile/Faq";
import TermsAndCondition from "../Screens/Profile/TermsAndCondition";
import ListenMusic from "../Screens/Home/ListenMusic";
import EnterCode from "../Screens/Home/EnterCode";

export default function () {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={navigationStrings.SPLASH}>
      <Stack.Screen
        name={navigationStrings.SPLASH}
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.ONBOARDING}
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SIGNUP}
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.CREATE_PASSWORD}
        component={CreatePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SUCCESS}
        component={Success}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.TAB_BAR}
        component={TabRoutes}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={navigationStrings.FINGERPRINT}
        component={Fingerprint}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.MY_ACCOUNT}
        component={MyAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.NOTIFICATIONS}
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.SUPPORT}
        component={Support}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.FAQ}
        component={Faq}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.TERMS_AND_CONDITION}
        component={TermsAndCondition}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.LISTEN_MUSIC}
        component={ListenMusic}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.ENTER_CODE}
        component={EnterCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.FAILED}
        component={Failed}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
