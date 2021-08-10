import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'openSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'openSansBold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [tentativas, setTentativas] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const startNewGameHandler = () => {
    setTentativas(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setTentativas(0);
  };

  const gameOverHandler = numeroTentativas => {
    setTentativas(numeroTentativas);
  };

  let content = <StartGameScreen onStartGame={startGameHandler}/>

  if (userNumber && tentativas <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  } else if(tentativas > 0) {
    content = <GameOverScreen tentativas={tentativas} userNumber={userNumber} onRestart={startNewGameHandler}/>
  }

  return (
    <View style={styles.screen}>
      <Header title="Descobridor"/>
      {content}
      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
