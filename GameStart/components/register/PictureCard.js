import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, ImageBackground, SafeAreaView, Image} from 'react-native';

export default function PictureCard ({img, selectImage, currentImage}) {


  if (currentImage === img.id) {
    return (
      <TouchableOpacity style={styles.cardSelected} onPress={() => selectImage(img.url, img.id)}>
        <Image style={{width: '100%', height: '100%'}} source={{uri: img.url}}/>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={styles.cards} onPress={() => selectImage(img.url, img.id)}>
      <Image style={{width: '100%', height: '100%', backgroundColor: 'white'}} source={{uri: img.url}}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'pink'

  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 5,
    borderColor: 'red',
    width: '100%',
    height: '80%'

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
    borderColor: '#00B4D8',
    width: '28%',
    height: '22%',
    margin: 10
  },
  cardSelected: {
    borderWidth: 5,
    borderColor: 'red',
    width: '28%',
    height: '22%',
    margin: 10
  },
  images: {
    width: '100%',
    height: '100%'
  }
})