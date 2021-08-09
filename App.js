import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [tentativas, setTentativas] = useState(0);

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
    content = <GameOverScreen />
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
