import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import DefaultStyles from '../constants/default-styles';
import colors from '../constants/colors';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText style={DefaultStyles.bodyText}>Fim de jogo</TitleText>
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
        borderColor: colors.primary,
        marginVertical: 10
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
    }
});

export default GameOverScreen;