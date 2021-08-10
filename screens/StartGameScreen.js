import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetNewValue = () => {
        setEnteredValue('');
        setSelectedNumber();
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Número inválido!", "O número precisa estar entre 1 e 99.", 
            [{text: 'Entendido', style: 'destructive', onPress: resetNewValue}]
            );
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
        
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.presentedNumber}>
                <Text>Número colocado</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="Iniciar" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        );
    }

    return(
        <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Vou descobrir seu número</Text>
                <Card style={styles.inputContainer}>
                    <BodyText>Coloque um número</BodyText>
                    <Input style={styles.input} 
                    blurOnSubmit 
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={numberInputHandler}
                    value={enteredValue} />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.button}>
                            <Button 
                                title="Recomeçar" 
                                color={colors.secondary}
                                onPress={resetNewValue}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button 
                                title="Confirmar" 
                                color={colors.primary}
                                onPress={confirmInputHandler}
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
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
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
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
    },
    presentedNumber: {
        marginTop: '5%',
        alignItems: 'center'
    }
});

export default StartGameScreen;