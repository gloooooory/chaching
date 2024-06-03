import { LogBox, StyleSheet } from "react-native";
import React from "react";
import Routes from "./src/Navigation/Routes";
import { SafeAreaProvider } from "react-native-safe-area-context";

LogBox.ignoreLogs([
  "Warning: ...",
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <SafeAreaProvider>
      <Routes />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
