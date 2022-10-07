import React, { useState, useEffect } from 'react';
import { Button, Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { ListItem } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getDistance, isPointWithinRadius } from 'geolib';

import { users } from '../Map/mapHelpers/users.js';
import GameCard from '../Map/GameCard.jsx';
import { getDefaultAppConfig } from '@firebase/util';

let width = Dimensions.get('window').width; //full width

const consoles = {
  // 'PC': 'https://cdn.freebiesupply.com/logos/large/2x/microsoft-windows-22-logo-png-transparent.png',
  // 'PlayStation': 'https://www.freepnglogos.com/uploads/playstation-png-logo/navy-playstation-png-logo-5.png',
  // 'Xbox': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1024px-Xbox_one_logo.svg.png',
  // 'Nintendo': 'https://www.freepnglogos.com/uploads/nintendo-logo-png/file-micrologo-nintendo-n-logo-circle-18.png',
  // 'iOS': 'https://alchemyimmersive.com/wp-content/uploads/sites/4/2020/04/apple-logo-transparent.png',
  // 'Android': 'https://cdn.freebiesupply.com/logos/large/2x/android-logo-png-transparent.png',
  'PlayStation': <MaterialCommunityIcons color='#CAF0F8' name="sony-playstation" size={20} />,
  'Xbox': <MaterialCommunityIcons color='#CAF0F8' name="microsoft-xbox" size={20} />,
  'Nintendo': <MaterialCommunityIcons color='#CAF0F8' name="nintendo-switch" size={20} />,
}

const getYear = (date) => {
  const newDate = new Date(date)
  return newDate.getFullYear()
}

const getPlatformIcons = (platforms) => {
  if(platforms) {
    return platforms.map((p, i) => {if(p.platform.name in consoles) {
      return consoles[p.platform.name]
    }})
  }
  return ''
}

export default function GameDetails( { gameId, callback, setView } ) {
  const [loading, setLoading] = useState(true)
  const [game, setGame] = useState({})
  const [image, setImage] = useState(true)
  const [showTitle, setShowTitle] = useState(true)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const [detailsExpanded, setDetailsExpanded] = useState(false)
  const [closeGames, setCloseGames] = useState([]);

  const getData = async () => {
    try {
      let gameData = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
        params: {
          key: '2a79010bc4f244649e73a1fcc6658773'
        }
      });
      setGame(gameData.data);
      let listingData = await axios.get('http://13.57.240.106:8000/api/locations');
      // console.log('listingdata =====================================', listingData.data[0].gameid);
      // console.log('gamedataid =====================================', gameData.data.id);
      let filteredListingData = listingData.data.filter((listing) => listing.gameid === gameData.data.id)
      // console.log('filteredListingData =====================================', filteredListingData);
      setCloseGames(filteredListingData);
      setLoading(false)
    } catch (error) {
      console.log('err', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  // useEffect(() => {
  //     axios.get(`https://api.rawg.io/api/games/${gameId}`, {
  //       params: {
  //         key: '2a79010bc4f244649e73a1fcc6658773'
  //       }
  //     })
  //     .then((response) => {
  //       setGame(response.data)
  //       setLoading(false)
  //       // console.log('success!')
  //     })
  //     .catch((err) => console.log(err))
  // }, [])

  const addGame = (gameObj, userID) => {
    //working on postman local server but not on deployed server...
    //need to update?? not sure but should work
    //need to just pass in userID to stack
    //denature gameObj
    const {id, name, background_image} = gameObj
    console.log(userID, id, name, background_image)
    //set data structure for server request
    axios.post('http://13.57.240.106:8000/api/games/post', {
      ownerid: userID,
      gameid: id,
      gametitle: name,
      photourl: background_image
    })
      .then(() => {
        alert('game successfully added for trade');
      })
      .catch((err) => {
        console.log('game was unable to be added')
      })
  }

  if (loading) {
    return <View></View>
  }

  return (
    <SafeAreaView >
      <ScrollView>
        <View style={{backgroundColor: 'rgba(0,0,0,.7)', height: '5%', flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 7}} onStartShouldSetResponder={() => true}>
          <TouchableOpacity style={{position: 'absolute', left: 5, top: 0, bottom: 0}} onPress={() => setView('searchBar')}>
            <View style={{position: 'absolute', left: 0, top: 0, bottom: 0, flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Feather
                name='chevron-left'
                size={18}
                style={{
                  color: 'white'
                }}
              />
              <Text style={{fontSize: 18, color: 'white'}}>Search</Text>
            </View>
          </TouchableOpacity>
          <Text style={{fontSize: 18, color: 'white'}}>Game Overview</Text>
        </View>
        <View style={{position: 'relative'}} onStartShouldSetResponder={() => true} >
          <Pressable
            onPress={() => {
              setImage(!image)
              // setShowTitle(true)
            }}
            onLongPress={() => setShowTitle(false)}
            onPressOut={() => setShowTitle(true)}
          >
            <Image
              style={styles.image}
              resizeMode='contain'
              source={{
                uri: image ? game.background_image : game.background_image_additional
              }}/>
          </Pressable>
          {/* {showTitle &&
            <LinearGradient style={styles.backButtonGradient} start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={['#CAF0F8', '#90e0EF', '#00B4D8', '#0077B6', '#03045E' ]}>
              <TouchableOpacity style={styles.backButton} onPress={() => setView('searchBar')}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Feather
                    name='chevron-left'
                    size={22}
                    style={{
                      color: '#90E0EF'
                    }}
                  />
                  <Fontisto
                    name='search'
                    size={22}
                    style={{
                      marginLeft: 5,
                      color: '#90E0EF'
                    }} />
                </View>
              </TouchableOpacity>
            </LinearGradient>
          } */}
          {showTitle &&
            <LinearGradient style={styles.titleGradient} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#CAF0F8', '#90e0EF', '#00B4D8', '#0077B6', '#03045E' ]}>
              <View style={styles.title}>
                <Text style={styles.titleText}>{game.name}</Text>
                <View style={styles.consoles}>{getPlatformIcons(game.parent_platforms)}</View>
              </View>
            </LinearGradient>
          }
        </View>
        <View style={styles.buttonsBar} onStartShouldSetResponder={() => true} >
          <TouchableOpacity onPress={() => addGame(game, 11)}>
            <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#CAF0F8', '#90e0EF', '#00B4D8', '#0077B6', '#03045E' ]}>
              <Text style={{fontSize: 20, fontWeight: 'bold', fontColor: '#03045E'}}>Post Game +</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View onStartShouldSetResponder={() => true} >
          <ListItem.Accordion
            containerStyle={styles.accordian}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={{color: 'white'}}>Game Description</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={descriptionExpanded}
            onPress={() => {setDescriptionExpanded(!descriptionExpanded)}}
          >
            <View style={{padding: 10, backgroundColor: '#242526', width: '95%', paddingBottom: 40,}}>
              <Text style={{fontWeight: 'bold', marginBottom: 15, color: 'white'}}>Game Description</Text>
              <Text style={{color: 'white'}}>{game.description_raw}</Text>
            </View>
          </ListItem.Accordion>
        </View>
        <View onStartShouldSetResponder={() => true} >
          <ListItem.Accordion
            containerStyle={styles.accordian}
            content={
              <>
                <ListItem.Content >
                  <ListItem.Title style={{color: 'white'}}>Game Details</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={detailsExpanded}
            onPress={() => {setDetailsExpanded(!detailsExpanded)}}
          >
            <View style={{padding: 10, backgroundColor: '#242526', width: '95%', paddingBottom: 40,}}>
              <Text style={{fontWeight: 'bold', marginBottom: 15, color: 'white'}}>Game Details:</Text>
              <Text style={{color: 'white'}}>{`Title: ${game.name}`}</Text>
              <Text style={{color: 'white'}}>{`Release year: ${getYear(game.released)}`}</Text>
              <Text style={{color: 'white'}}>{`Metacritic rating: ${game.metacritic ? game.metacritic+'%' : 'N/A'}`}</Text>
              <Text style={{color: 'white'}}>{`Genres: ${game.genres ? game.genres.map(g => g.name).join(', ') : 'N/A'}`}</Text>
              <Text style={{color: 'white'}}>{`Platforms: ${game.platforms ? game.platforms.map(p => p.platform.name).join(', ') : 'N/A'}`}</Text>
              <Text style={{color: 'white'}}>{`Publisher: ${game.publishers[0] ? game.publishers[0].name : 'N/A'}`}</Text>
              <Text style={{color: 'white'}}>{`ESRB Rating: ${game.esrb_rating ? game.esrb_rating.name : 'N/A'}`}</Text>
            </View>
          </ListItem.Accordion>
        </View>
        <Text style={{fontSize: 18, color: 'white', margin: 10, marginBottom: 30, marginTop: 20,}}>Game Listings In Your Area</Text>
        <View >
          <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
            {closeGames.map((item, index) => {
              if (isPointWithinRadius({latitude: item.latitude, longitude: item.longitude}, {
                latitude: 33.804474,
                longitude: -118.03948
              }, 5000)) {
                return (
                  <GameCard
                    key={index}
                    style={{ height: 200}}
                    title={item.gametitle}
                    img={item.photourl}
                    console={item.consoleicon}
                    coordinate={{latitude: item.latitude, longitude: item.longitude}}
                    state={item.gamecondition}
                    miles={item.miles}
                  />
                )
              }
            })}
          </ScrollView>
        </View>
        <View style={{height: 100}}></View>
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
  titleGradient: {
    position: 'absolute',
    minWidth: '40%',
    bottom: 20,
    right: 0,
    padding: 5,
  },
  title: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-start',
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20,
    fontWeight: 'bold',
    backgroundColor: '#03045E',
  },
  titleText: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#90E0EF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    shadowColor: '#CAF0F8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  backButtonGradient: {
    position: 'absolute',
    top: 20,
    left: -30,
    padding: 5,
    borderRadius: 100,
  },
  backButton: {
    paddingLeft: 30,
    padding: 20,
    fontWeight: 'bold',
    backgroundColor: '#03045E',
    color: '#90E0EF',
    borderRadius: 100,
  },
  buttonsBar: {
    flex: 1,
    minWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    flex: 1,
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#90E0EF',
    fontSize: 40,
    // borderRadius: 10,
  },
  accordian: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    width: '95%',
    marginBottom: 5,
  },
  consoles: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  consoleIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  scrollView: {
    padding: 0,
    flexGrow: 0,
    height: 200,
    marginRight: 4,
    flexShrink: 0,
  },
})