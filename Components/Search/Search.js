import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import GameDetails from '../GameDetails/GameDetails.js';
import SearchBar from './SearchBar.js'

function Search() {
  const[view, setView] = useState('searchBar')
  const[gameId, setGameId] = useState('635220')

  const handleGameSelect = (id) => {
    setView('gameDetails')
    setGameId(id)
  }

  const display = {
    searchBar: <SearchBar callback={handleGameSelect}/>,
    gameDetails: <GameDetails gameId={gameId} setView={setView}/>
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1, backgroundColor: '#121212'}}>
        {display[view]}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Search;
