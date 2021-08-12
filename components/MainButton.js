import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../constants/colors';

const MainButton = props => {
    return (
    <TouchableOpacity onPress={props.onPress}>
        <View style={styles.buttonView}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonView: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
});

export default MainButton;