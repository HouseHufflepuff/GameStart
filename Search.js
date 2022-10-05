import React, { useState, useEffect } from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import { Card, Icon } from "@rneui/themed";
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

export default function Search() {
  const [text, setText] = useState('');
  const [games, setGames] = useState([]);

  const consoles = {
    'PC': 'https://cdn.freebiesupply.com/logos/large/2x/microsoft-windows-22-logo-png-transparent.png',
    'PlayStation': 'https://www.freepnglogos.com/uploads/playstation-png-logo/navy-playstation-png-logo-5.png',
    'Xbox': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1024px-Xbox_one_logo.svg.png',
    'Nintendo': 'https://www.freepnglogos.com/uploads/nintendo-logo-png/file-micrologo-nintendo-n-logo-circle-18.png',
    'iOS': 'https://alchemyimmersive.com/wp-content/uploads/sites/4/2020/04/apple-logo-transparent.png',
    'Android': 'https://cdn.freebiesupply.com/logos/large/2x/android-logo-png-transparent.png',
  }

  useEffect(() => {
    if(text.length>0) {
      axios.get('https://api.rawg.io/api/games', {
        params: {
          key: '2a79010bc4f244649e73a1fcc6658773',
          search: text
        }
      })
      .then((response) => {
        setGames(response.data.results)
        console.log('success!')
      })
      .catch((err) => console.log(err))
    } else {
      setGames([])
    }
  }, [text])

  const getYear = (date) => {
    const newDate = new Date(date)
    return newDate.getFullYear()
  }

  const getPlatforms = (platforms) => {
    if(platforms) {
      return platforms.map(p => {if(p.platform.name in consoles) {
        return (<Image style={styles.consoleIcon} source={{uri: consoles[p.platform.name]}}/>)
      }})
    }
    return ''
  }

  // console.log(games[0])
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder='Search games'
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        clearButtonMode='while-editing'
      ></TextInput>
      { text.length > 0 &&
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <View style={styles.item}>
              <Image style={styles.image} source={{uri: item.background_image}}/>
              <View style={styles.description}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>{`Release year: ${getYear(item.released)}`}</Text>
                <View style={styles.consoles}>{getPlatforms(item.parent_platforms)}</View>
              </View>
            </View>
          }
        />
      }
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'start',
  },
  search: {
    minHeight: 50,
    width: '90%',
    fontSize: 30,
    borderWidth: '1px',
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',

    // borderWidth: 1,
    // borderColor: 'black',
    // padding: 10,

    backgroundColor: '#90E0EF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 10,
  },
  top: {
    // flexDirection: 'row'
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    marginRight: 10
  },
  description: {
    width: '65%',
    // borderColor: 'red',
    // borderWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    numberOfLines: 2,
  },
  consoles: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  consoleIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
});