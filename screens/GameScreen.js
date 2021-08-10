import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randoM = Math.floor(Math.random() * (max - min)) + min;
    if (randoM === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randoM;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

    const [tent, setTent] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(tent);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'menor' && currentGuess < props.userChoice) || (direction === 'maior' && currentGuess > props.userChoice)) {
            Alert.alert('Não minta!', 'Você sabe que é errado...', [{text: 'Desculpe', style: 'cancel'}])

            return;
        }
        if (direction === 'menor') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setTent(curTent => curTent + 1);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Meu chute</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Menor" onPress={nextGuessHandler.bind(this, 'menor')}/>
                <Button title="Maior" onPress={nextGuessHandler.bind(this, 'maior')}/>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;