import React, { useState, useEffect } from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import { Card, Icon } from "@rneui/themed";
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

let width = Dimensions.get('window').width; //full width


export default function GameDetails( { gameId } ) {
  const [loading, setLoading] = useState(true)
  const [game, setGame] = useState({})

  const consoles = {
    'PC': 'https://cdn.freebiesupply.com/logos/large/2x/microsoft-windows-22-logo-png-transparent.png',
    'PlayStation': 'https://www.freepnglogos.com/uploads/playstation-png-logo/navy-playstation-png-logo-5.png',
    'Xbox': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1024px-Xbox_one_logo.svg.png',
    'Nintendo': 'https://www.freepnglogos.com/uploads/nintendo-logo-png/file-micrologo-nintendo-n-logo-circle-18.png',
    'iOS': 'https://alchemyimmersive.com/wp-content/uploads/sites/4/2020/04/apple-logo-transparent.png',
    'Android': 'https://cdn.freebiesupply.com/logos/large/2x/android-logo-png-transparent.png',
  }

  const getYear = (date) => {
    const newDate = new Date(date)
    return newDate.getFullYear()
  }

  const getRating = (rating) => {
    if(rating) {
      return rating+'%'
    }
    return 'N/A'
  }

  const getPlatformIcons = (platforms) => {
    if(platforms) {
      return platforms.map((p, i) => {if(p.platform.name in consoles) {
        return (<Image key={i} style={styles.consoleIcon} source={{uri: consoles[p.platform.name]}}/>)
      }})
    }
    return ''
  }

  const getPlatforms = (platforms) => {
    if(platforms) {
      return platforms.map(p => p.platform.name).join(', ')
    }
    return 'N/A'
  }

  const getGenres = (genres) => {
    if(genres) {
      return genres.map(g => g.name).join(', ')
    }
    return 'N/A'
  }

  useEffect(() => {
      axios.get(`https://api.rawg.io/api/games/${gameId}`, {
        params: {
          key: '2a79010bc4f244649e73a1fcc6658773'
        }
      })
      .then((response) => {
        setGame(response.data)
        setLoading(false)
        console.log('success!')
      })
      .catch((err) => console.log(err))
  }, [])

  if (loading) {
    return <View></View>
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: game.background_image}}/>
      <Text>{game.name}</Text>
      <Text>{`Release year: ${getYear(game.released)}`}</Text>
      <View style={styles.consoles}>{getPlatformIcons(game.parent_platforms)}</View>
      <Text>{`Metacritic rating: ${getRating(game.metacritic)}`}</Text>
      <Text>{`Genres: ${getGenres(game.genres)}`}</Text>
      <Text>{`Platforms: ${getPlatforms(game.platforms)}`}</Text>
    </ScrollView>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'start',
  },
  image: {
    width: width,
    height: width,
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
})