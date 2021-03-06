import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import colors from '../constants/colors';

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

const renderListItem = (tentx) => (
<View key={tentx} style={styles.listItem}>
    <BodyText>Eu acho que é </BodyText>
    <BodyText>{tentx}!</BodyText>
</View>);

const GameScreen = props => {
    const initialTent = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialTent);
    const [tents, setTent] = useState([initialTent]);
    //const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height);
            //setAvailableDeviceWidth(Dimensions.get('window').width);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        };
    });

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(tents.length);
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
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setTent(curTent => curTent + 1);
        setTent(curTents => [nextNumber ,...curTents]);
    };

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Meu chute</Text>
                <View style={styles.buttonViewPortait}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'menor')}>
                        <Ionicons 
                            name="md-remove"  
                            size={24}
                            color="white"
                        />
                    </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'maior')}>
                        <Ionicons 
                            name="md-add"
                            size={24}
                            color="white"
                        />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    {/*You can use flatlist here to render more than 20 items*/}
                    <ScrollView contentContainerStyle={styles.list}>
                        {tents.map((tentx, index) => renderListItem(tentx))}
                    </ScrollView>
                </View>
            </View>
        );
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
                    <MainButton onPress={nextGuessHandler.bind(this, 'menor')}>
                        <Ionicons 
                            name="md-remove"  
                            size={24}
                            color="white"
                        />
                    </MainButton>
                    <MainButton onPress={nextGuessHandler.bind(this, 'maior')}>
                        <Ionicons 
                            name="md-add"
                            size={24}
                            color="white"
                        />
                    </MainButton>
                </Card>
                <View style={styles.listContainer}>
                    {/*You can use flatlist here to render more than 20 items*/}
                    <ScrollView contentContainerStyle={styles.list}>
                        {tents.map((tentx, index) => renderListItem(tentx))}
                    </ScrollView>
                </View>
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
        marginTop: Dimensions.get('window').height > 600 ? 10 : 5,
        width: 300,
        maxWidth: '80%'
    },
    imageContainer: {
        flex: 0.5,
        paddingBottom: 150
    },
    image: {
        width: 250,
        height: 250
    },
    listContainer: {
        paddingTop: 25,
        //width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        width: '50%',
        flex: 1
    },
    list: {
        alignItems: 'center',
        //flex: 1,
        //flexGrow: 1,
        //justifyContent: 'flex-end'
        //trying to test git 
    },
    listItem: {
        marginVertical: 2,
        borderColor: colors.primary,
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonViewPortait: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
});

export default GameScreen;