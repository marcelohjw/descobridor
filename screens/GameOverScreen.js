import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText style={DefaultStyles.bodyText}>Fim de jogo</TitleText>
            <Image source={require('../assets/success.png')} />
            <BodyText>Número de tentativas: {props.tentativas}</BodyText>
            <BodyText>O número escolhido foi: {props.userNumber}</BodyText>
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