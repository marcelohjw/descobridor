import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
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
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: 'https://i.pinimg.com/originals/ee/00/5f/ee005f7cca0279356a0799daae60bed2.jpg'}} 
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <Text style={DefaultStyles.title}>Meu chute</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'menor')}>Menor</MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'maior')}>Maior</MainButton>
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
    },
    imageContainer: {
        flex: 0.5
    },
    image: {
        width: 250,
        height: 250
    }
});

export default GameScreen;