import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, ImageBackground, SafeAreaView, Image} from 'react-native';
import PictureCard from './PictureCard.js';

export default function ProfilePicture ({authID}) {
  const [imageURL, setImageURL] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  const profiles = [
    {id: 1, url: 'https://pngimg.com/uploads/call_of_duty/call_of_duty_PNG75.png'},
    {id: 2, url: 'https://i.pinimg.com/originals/b3/19/84/b31984e724e190774d309ce2a0b2802c.png'},
    {id: 3, url: 'https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt804eabffbf15dc51/5f4defe95acde4265bb2da77/Champion_garen_HP.png'},
    {id: 4, url: 'https://image.pngaaa.com/930/1381930-middle.png'},
    {id: 5, url: 'https://www.clipartmax.com/png/middle/127-1274380_gamer-girl-by-saski-chan-gamer-girl-png.png'},
    {id: 6, url: 'https://e7.pngegg.com/pngimages/932/280/png-clipart-maplestory-video-games-nexon-character-maplestory-2-bunny-girl-game-computer-wallpaper-thumbnail.png'},
    {id: 7, url: 'https://e7.pngegg.com/pngimages/233/259/png-clipart-maplestory-dog-mammal-canidae-carnivora-maple-game-white-thumbnail.png'},
    {id: 8, url: 'https://spng.pngfind.com/pngs/s/159-1593204_gta-5-render-franklin-from-gta-v-hd.png'},
    {id: 9, url: 'https://w7.pngwing.com/pngs/426/131/png-transparent-the-legend-of-zelda-the-wind-waker-link-the-legend-of-zelda-breath-of-the-wild-the-legend-of-zelda-spirit-tracks-princess-zelda-chibi-mammal-carnivoran-chibi.png'},
    {id: 10, url: 'https://www.kindpng.com/picc/m/3-36382_small-mario-png-transparent-png.png'},
    {id: 11, url: 'https://image.pngaaa.com/656/905656-middle.png'},
    {id: 12, url: 'https://www.citypng.com/public/uploads/preview/-41603420202wiew9viqhz.png'}
  ]


  const selectImage = (url, id) => {
    // const imageObj = data.filter(image => id === image.id)
    setImageURL(url);
    setCurrentImage(id)
  }

  return(
    <SafeAreaView style={styles.container}>
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
      ? <Button title="Choose Image"></Button>
      : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'black'

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
    height: '10%',
    marginTop: '10%',
    fontSize: 25,
    fontWeight: '500'
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
    width: '100%',
    height: '20%',
    borderWidth: 5,
    borderColor: 'blue'
  }
})