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
    // const imageObj = data.filter(image => id === image.id)
    setImageURL(url);
    setCurrentImage(id)
  }

  const submitImage = (imageURL, userID) => {
    //set loading toggle
    axios.put('http://localhost:8000/api/users/profilepic', {
      imageURL: imageURL,
      userID: userID
    })
    .then(() => {
      console.log('success')
      navigation.navigate('location')
    })
    .catch((err) => {
      console.log('fail', err.response)
    })
  }

  return(
    <SafeAreaView style={styles.container}>
       <LinearGradient
        colors={['black', '#03045E', 'black']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}>
      <Text style={styles.text}>
        Select your hero!
      </Text>
      </LinearGradient>
      <View style={styles.imageContainer}>
      {profiles.map(image => {
      return(
        <PictureCard img={image} key={image.id} selectImage={selectImage} currentImage={currentImage}/>
      )
    })}
      </View>
      {currentImage !== 0
       ? <LinearGradient
          colors={['#00b4d8', '#03045E', 'black']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={styles.button}
        >
          <TouchableOpacity style={styles.button} onPress={() => submitImage(imageURL, 1)}>
              <Text style={{color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 25, marginTop: 20}}> Choose Image </Text>
          </TouchableOpacity>
        </LinearGradient>
      : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(90deg, rgba(0,0,0,1) 9%, rgba(2,69,139,1) 70%, rgba(0,180,216,1) 100%)'

  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '80%',
    marginBottom: 10

  },
  text: {
    color: 'white',
    height: '9%',
    marginTop: '10%',
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
    width: '120%',
    height: '40%',
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'grey'
  }
})