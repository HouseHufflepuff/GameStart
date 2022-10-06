import React, { useState, useEffect } from 'react';
import { Button, Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

let width = Dimensions.get('window').width; //full width

const consoles = {
  'PC': 'https://cdn.freebiesupply.com/logos/large/2x/microsoft-windows-22-logo-png-transparent.png',
  'PlayStation': 'https://www.freepnglogos.com/uploads/playstation-png-logo/navy-playstation-png-logo-5.png',
  'Xbox': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1024px-Xbox_one_logo.svg.png',
  'Nintendo': 'https://www.freepnglogos.com/uploads/nintendo-logo-png/file-micrologo-nintendo-n-logo-circle-18.png',
  // 'iOS': 'https://alchemyimmersive.com/wp-content/uploads/sites/4/2020/04/apple-logo-transparent.png',
  // 'Android': 'https://cdn.freebiesupply.com/logos/large/2x/android-logo-png-transparent.png',
}

const getYear = (date) => {
  const newDate = new Date(date)
  return newDate.getFullYear()
}

const getPlatformIcons = (platforms) => {
  if(platforms) {
    return platforms.map((p, i) => {if(p.platform.name in consoles) {
      return (<Image key={i} style={styles.consoleIcon} source={{uri: consoles[p.platform.name]}}/>)
    }})
  }
  return ''
}

export default function GameDetails( { gameId, callback, setView } ) {
  const [loading, setLoading] = useState(true)
  const [game, setGame] = useState({})
  const [image, setImage] = useState(true)
  const [showTitle, setShowTitle] = useState(true)

  useEffect(() => {
      axios.get(`https://api.rawg.io/api/games/${gameId}`, {
        params: {
          key: '2a79010bc4f244649e73a1fcc6658773'
        }
      })
      .then((response) => {
        setGame(response.data)
        setLoading(false)
        // console.log('success!')
      })
      .catch((err) => console.log(err))
  }, [])

  if (loading) {
    return <View></View>
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{position: 'relative'}}>
          <Pressable
            onPress={() => {
              setImage(!image)
              setShowTitle(true)
            }}
            onLongPress={() => setShowTitle(false)}
            // onPressOut={() => setShowTitle(true)}
          >
            <Image
              style={styles.image}
              resizeMode='contain'
              source={{
                uri: image ? game.background_image : game.background_image_additional
              }}/>
          </Pressable>
          <TouchableOpacity onPress={() => setView('searchBar')}>
            <View style={styles.button}>
              <Text style={{fontSize: 20, fontWeight: 'bold', fontColor: '#03045E'}}>Back to Search</Text>
            </View>
          </TouchableOpacity>
          {showTitle &&
            <View style={styles.title}>
              <Text style={styles.titleText}>{game.name}</Text>
              <View style={styles.consoles}>{getPlatformIcons(game.parent_platforms)}</View>
            </View>
          }
        </View>
        <View style={styles.buttonsBar}>
          <TouchableOpacity onPress={() => callback(game)}>
            <View style={styles.button}>
              <Text style={{fontSize: 20, fontWeight: 'bold', fontColor: '#03045E'}}>Post Game +</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.details}>
          <Text style={{fontWeight: 'bold', marginBottom: 5, fontColor: ''}}>Game Description</Text>
          <Text>{game.description_raw}</Text>
        </View>
        <View style={styles.details}>
          <Text style={{fontWeight: 'bold', marginBottom: 5,}}>Game Details:</Text>
          <Text>{`Title: ${game.name}`}</Text>
          <Text>{`Release year: ${getYear(game.released)}`}</Text>
          <Text>{`Metacritic rating: ${game.metacritic ? game.metacritic+'%' : 'N/A'}`}</Text>
          <Text>{`Genres: ${game.genres ? game.genres.map(g => g.name).join(', ') : 'N/A'}`}</Text>
          <Text>{`Platforms: ${game.platforms ? game.platforms.map(p => p.platform.name).join(', ') : 'N/A'}`}</Text>
          <Text>{`Publisher: ${game.publishers[0] ? game.publishers[0].name : 'N/A'}`}</Text>
          <Text>{`ESRB Rating: ${game.esrb_rating ? game.esrb_rating.name : 'N/A'}`}</Text>

        </View>
      </ScrollView>
    </SafeAreaView>

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
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  title: {
    // flex: 1,
    position: 'absolute',
    // maxWidth: '90%',
    alignSelf: 'flex-start',
    bottom: 80,
    right: 0,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    fontWeight: 'bold',
    backgroundColor: '#03045E'
  },
  titleText: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#90E0EF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  buttonsBar: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 30,
    paddingTop: 30
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 40,
    // width: 100
    padding: 10,
    // paddingHorizontal: 50,
    backgroundColor: '#90E0EF',
    fontSize: 40,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    padding: 30,
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