import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, ImageBackground, SafeAreaView, Image} from 'react-native';
import PictureCard from './PictureCard.js';
import {LinearGradient} from 'expo-linear-gradient'
import axios from 'axios';

export default function ProfilePicture ({navigation}) {
  const [imageURL, setImageURL] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  const profiles = [
    {id: 1, url: 'https://i.ibb.co/tspt9x6/animal-cross.png'},
    {id: 2, url: 'https://i.ibb.co/0t4L2Bg/animal-cross2.png'},
    {id: 3, url: 'https://i.ibb.co/tLcctHf/ash.png'},
    {id: 4, url: 'https://i.ibb.co/r6yKNMt/master-chief.png'},
    {id: 5, url: 'https://i.ibb.co/d6WWmGB/cod.png'},
    {id: 6, url: 'https://i.ibb.co/YX6VnRM/deadpool.png'},
    {id: 7, url: 'https://i.ibb.co/gR7QPfq/draven.png'},
    {id: 8, url: 'https://i.ibb.co/r577B91/garen.png'},
    {id: 9, url: 'https://i.ibb.co/VwcF13g/john-wall.png'},
    {id: 10, url: 'https://i.ibb.co/80mvdxr/My-project.png'},
    {id: 11, url: 'https://i.ibb.co/3Tqy0t3/link.png'},
    {id: 12, url: 'https://i.ibb.co/5R3gcwT/mario.png'}
  ]


  const selectImage = (url, id) => {

    setImageURL(url);
    setCurrentImage(id)
  }

  const submitImage = (imageURL, userID) => {
    axios.put('http://13.57.240.106:8000/api/users/profilepic', {
      imageURL: imageURL,
      userID: userID
    })
    .then(() => {
      console.log('success')
      navigation.navigate('complete')
    })
    .catch((err) => {
      console.log('fail', err.response)
    })
  }

  return(
    <View style={styles.container}>
       <LinearGradient
        style={{width: '100%', height: '100%', borderWidth: 1, borderColor: 'pink'}}
        colors={['black', '#03045E', 'black']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}>
      <Text style={styles.text}>
        Select your hero!
      </Text>
      <View style={styles.imageContainer}>
      {profiles.map(image => {
      return(
        <PictureCard img={image} key={image.id} selectImage={selectImage} currentImage={currentImage}/>
      )
    })}
      </View>
      {currentImage !== 0
       ? <TouchableOpacity style={styles.button} onPress={() => submitImage(imageURL, 1)}>
          <Text style={{color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 25, marginTop: 4}}> Choose Image </Text>
        </TouchableOpacity>
      : null}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 100,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',

  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '78%',

  },
  text: {
    color: 'white',
    height: '5%',
    marginTop: '9%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '800',
    textShadowColor: '#90E0EF',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 4
  },
  cards: {
    borderWidth: 5,
    borderColor: '#03045E',
    width: '28%',
    height: '22%',
    margin: 10
  },
  images: {
    width: '100%',
    height: '100%'
  },
  button: {
    width: '50%',
    height: '5%',
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'pink',
    backgroundColor: '#0077B6'
  }
})