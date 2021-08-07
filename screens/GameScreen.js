import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

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

    const nextGuessHandler = direction => {
        if ((direction === 'menor' && currentGuess < props.userChoice) || (direction === 'maior' && currentGuess > props.userChoice)) {
            Alert.alert('Não minta!')
        }
    };

    return (
        <View style={styles.screen}>
            <Text>Meu chute</Text>
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