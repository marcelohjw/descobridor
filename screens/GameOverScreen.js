import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';
import colors from '../constants/colors';

const GameOverScreen = props => {

    let finalText = "Achei muito fácil!"

    if(props.tentativas >= 6) {
        finalText = "Talvez na próxima seja mais difícil...";
    }

    if (props.tentativas >= 10) {
        finalText = "Ralei pra adivinhar esse! boa!";
    }

    return (
            <View style={styles.screen}>
                <TitleText style={DefaultStyles.bodyText}>Fim de jogo</TitleText>
                <BodyText style={styles.finalText}>{finalText}</BodyText>
                <View style={styles.imageContainer}>
                    <Image 
                        //source={require('../assets/success.png')}
                        source={{uri: 'https://segredosdomundo.r7.com/wp-content/uploads/2021/03/trollface-origem-significado-e-polemicas-em-torno-do-meme-960x596.jpg'}} 
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText>Acertei em <Text style={styles.tentativas}>{props.tentativas}</Text> tentativas</BodyText>
                    <BodyText>O número escolhido foi: {props.userNumber}</BodyText>
                </View>
                <MainButton onPress={props.onRestart}>Novo Jogo</MainButton>
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
        //width: Dimensions.get('window').width * 0.7,
        height: 300,
        //height: Dimensions.get('window').height * 0.7,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: colors.primary,
        marginVertical: 10
        //marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 150
    },
    tentativas: {
        color: colors.primary
    },
    resultContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    finalText: {
        marginVertical: 5
    }
});

export default GameOverScreen;