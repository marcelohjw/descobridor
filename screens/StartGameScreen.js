import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Image, Dimensions } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
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
    let computerText = 'Vou descobrir seu número';

    if (confirmed) {
        computerText = '';
        confirmedOutput = (
            <Card style={styles.presentedNumber}>
                <Text>Número colocado</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>Iniciar</MainButton>
            </Card>
        );
    }

    return(
        <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.screen}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: 'https://i.pinimg.com/originals/ee/00/5f/ee005f7cca0279356a0799daae60bed2.jpg'}} 
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.title}>{computerText}</Text>
                <Card style={styles.inputContainer}>
                    <Text>Coloque um número para eu adivinhar</Text>
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
                                title="Apagar" 
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
        marginVertical: 15,
        //fontFamily: 'open-sans'
    },
    inputContainer: {
        width: '80%',
        //maxWidth: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        //width: '50%'
        width: Dimensions.get('window').width / 4 //25%
    },
    input: {
        width: '10%',
        textAlign: 'center'
    },
    presentedNumber: {
        marginTop: '5%',
        alignItems: 'center'
    },
    imageContainer: {
        flex: 0.5
    },
    image: {
        width: 250,
        height: 250
    }
});

export default StartGameScreen;