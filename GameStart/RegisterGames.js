import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, FlatList} from 'react-native';
import axios from 'axios';

export default function RegisterGames () {
  const [gamesList, setGamesList] = useState([]);
  const [initialBatch, setInitialBatch] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/games/gamelist')
    .then((games) => {
      setInitialBatch(games.results)
    })
    .catch((err) => {
      console.log(err)
    })
  })

  const handleSearch = (query) => {
    setGamesList(initialBatch.filter(game => game.name.includes(query)))
  }

  const Item = ({item, onPress, textColor, backgroundColor}) => (
    <TouchableOpacity
     onPress={onPress}>
      <Text style={{textColor}}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {

    const backgroundColor = '#03045E'
    const textColor = 'white'

    return(
      <Item
        item={item}
        onPress={() => setLocation(item.address)}
        backgroundColor={{backgroundColor}}
        textColor={{textColor}}
      />
    )
  }

//breakdown of this component:
//users can search for a game to add (optional)
  //search through the games
    //select a game and you can add game for listing
    //optional
    //if game has been added, add a "Game has been added message"
  //continue on
  //flatlist here

  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.text}> Search for a game! </Text>
        <TextInput style={styles.forms}> </TextInput>
      </View>
      <View>
        <FlatList
         data={gamesList}
         renderItem={renderItem}
         keyExtractor={(key) => key.id}
         extraData={gamesList}
        />
      </View>
      <Button title="Next"/>
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    width: '100%',
    height: '100%',
    flexShrink: 1
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  }
  text: {
    width: '25%',
    height: '20%',
    color: 'white'
  },
  forms: {
    marginBottom: 30,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius:10,
    width: 300,
    paddingLeft: 15
  }
})