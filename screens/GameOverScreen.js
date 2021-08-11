import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText style={DefaultStyles.bodyText}>Fim de jogo</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/success.png')} 
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
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
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        marginVertical: 10
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 150
    }
});

export default GameOverScreen;