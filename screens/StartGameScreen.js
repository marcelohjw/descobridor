import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import Card from '../components/Card';
import colors from '../constants/colors';

const StartGameScreen = props => {
    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Começar!</Text>
            <Card style={styles.inputContainer}>
                <Text>Selecione um número</Text>
                <TextInput />
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <Button title="Recomeçar" color={colors.secondary}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirmar" color={colors.primary}/>
                    </View>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: '50%'
    }
});

export default StartGameScreen;