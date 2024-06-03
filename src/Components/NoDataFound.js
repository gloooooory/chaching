
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textScale } from '../styles/responsiveSize';
import colors from '../styles/colors';
import strings from '../constants/lang';

const NoDataFound = ({
    text = strings.NO_DATA_FOUND,
    containerStyle,
    textStyle,
}) => {
    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <Text style={{ ...styles.textStyle, ...textStyle }}>{text}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: textScale(17),
        color: colors.grayLight
    }
});

export default NoDataFound;
