import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Fim de jogo!</Text>
            <Text>Número de tentativas: {props.tentativas}</Text>
            <Text>O número escolhido foi: {props.userNumber}</Text>
            <Button title="Novo Jogo" onPress={props.onRestart}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;