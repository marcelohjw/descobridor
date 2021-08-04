import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import colors from '../constants/colors';

const StartGameScreen = props => {
    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Começar!</Text>
            <Card style={styles.inputContainer}>
                <Text>Coloque um número</Text>
                <Input style={styles.input} 
                blurOnSubmit 
                autoCapitalize="none" 
                autoCorrect={false} 
                keyboardType="number-pad"
                maxLength={2} />
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
    },
    input: {
        width: '10%',
        textAlign: 'center'
    }
});

export default StartGameScreen;