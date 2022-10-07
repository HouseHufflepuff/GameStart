import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


//MOST LIKELY NOT USING
//DO NOT USE DIS
export default function RegisterGames () {
  const [gamesList, setGamesList] = useState([]);
  const [games, setGames] = useState([]);

  const API_KEY = 'da02a6537a9b4428b7fa21d5df695e98'
  const API_BASE_URL = 'https://api.rawg.io/api'


  const handleSearch = (query) => {
    if (query.length > 2) {
      console.log(query)
      axios.get(`${API_BASE_URL}/games?key=${API_KEY}&search=${query}&page_size=10`)
        .then((games) => {
          console.log(games.data.results)
          let container = [];
          games.data.results.map(game => {
            let gameData = {
              game: game.name,
              id: game.id,
            }
            container.push(gameData)
          })
          setGamesList(container)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const favoriteItem = (gameID) => {
    axios.post('')
  }


  const addGame = (gameObj) => {
    axios.post('http://13.57.240.106:8000/api/games/post', gameObj)
      .then(() => {
        res.sendStatus(201)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  return(

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}> Add a game! </Text>
        <TextInput style={styles.forms} onChangeText={(query) => handleSearch(query)}> </TextInput>
      </View>
      <View style={styles.listContainer}>
        <FlatList
         data={gamesList}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         extraData={games}
        />
      </View>
      <Button title="Next"/>
    </SafeAreaView>
  )
}

//getGame

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    width: '100%',
    height: '100%',
    flexShrink: 1,
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: 'pink'
  },
  header: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: '30%',
    height: '10%',
    borderWidth: 5,
    borderColor: 'green',
    textAlign: 'center'
  },
  text: {
    width: '100%',
    height: '40%',
    marginTop: 0,
    color: 'white',
    borderWidth: 5,
    borderColor: 'red',
    textAlign: 'center'
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
  },
  listContainer: {
    width: '100%',
    height: '60%',
    borderWidth: 5,
    borderColor: 'blue'
  },
  inputContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 100,
    backgroundColor: 'black',
  }
})