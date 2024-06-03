import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import WrapperComp from "../../Components/WrapperComp";
import AuthHeader from "../../Components/AuthHeader";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import ButtonComp from "../../Components/ButtonComp";
import colors from "../../styles/colors";
import fontFamily from "../../styles/fontFamily";
import { moderateScale, textScale, width } from "../../styles/responsiveSize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAdvertise } from "../../redux/actions/promoCodeAction";
import navigationStrings from "../../constants/navigationStrings";

const EnterCode = ({ navigation }) => {
  const onClear = () => {
    setValue("");
  };

  const CELL_COUNT = 7;

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (value?.length < 7) {
      setErrorMsg("Input correct code.");
      return;
    }
    setErrorMsg("");

    try {
      setIsLoading(true);
      console.log("[code] = ", value);
      const res = await getAdvertise(value);
      setIsLoading(false);

      navigation.navigate(navigationStrings.SUCCESS, {
        msg: "Found Advertisement",
        url: res.url,
      });
    } catch (error) {
      navigation.navigate(navigationStrings.FAILED);
      setIsLoading(false);
    }
  };

  return (
    <WrapperComp isInsets isBottomInsets>
      <AuthHeader headTxt={"Enter 7-digit code"} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            marginTop: moderateScale(60),
            paddingHorizontal: 20,
            flexDirection: "column",
            gap: 16,
          }}
        >
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={val => {
              setValue(val.toUpperCase());
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            // keyboardType="number-pad"
            textContentType="oneTimeCode"
            // autoComplete={Platform.select({
            //   android: "sms-otp",
            //   default: "one-time-code",
            // })}
            // testID="my-code-input"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          {errorMsg != "" && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {errorMsg}
            </Text>
          )}
        </View>

        <View style={styles.bottomView}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <ButtonComp
              btnText="Submit"
              btnStyle={{ width: 140, marginBottom: 20 }}
              onPress={handleSubmit}
            />
          )}

          <TouchableOpacity onPress={onClear}>
            <Text style={styles.clearTxt}>Clear</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </WrapperComp>
  );
};

export default EnterCode;

const styles = StyleSheet.create({
  bottomView: {
    paddingBottom: 30,
    alignSelf: "center",
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: width / 9,
    height: 60,
    lineHeight: 60,
    fontSize: 22,
    borderWidth: 2,
    borderColor: "#3A3A3A",
    textAlign: "center",
    borderRadius: 12,
    // marginRight: 17,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  focusCell: {
    borderColor: "#3A3A3A",
  },
  clearTxt: {
    color: colors.primary,
    fontFamily: fontFamily.medium,
    fontWeight: "500",
    fontSize: textScale(21),
    textAlign: "center",
  },
});
