import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
    <View>
      {display[view]}
    </View>
  );
}

export default Search;
