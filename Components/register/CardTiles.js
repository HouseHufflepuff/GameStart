import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, TouchableOpacity, ImageBackground} from 'react-native';

export default function CardTiles ({system, url, addConsole, removeConsole, list}) {

  if (list[system]) {
    return (
      <TouchableOpacity style={styles.selectedCard} onPress={() => removeConsole(system)}>
      <ImageBackground
        style={styles.image}
        imageStyle={{borderRadius: 50}}
        source={{uri: url}}
      />
    </TouchableOpacity>
    )
  } else {
    return(
      <TouchableOpacity style={styles.card} onPress={() => addConsole(system)}>
        <ImageBackground
          style={styles.image}
          imageStyle={{borderRadius: 50}}
          source={{uri: url}}
        />
      </TouchableOpacity>
    )
  }
  }




const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#0077b6',
    width: '45%',
    height: '30%',
    borderRadius: 50,
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white'
  },
  text: {
    color: 'white',
    height: 30,
    width: '100%',
    textAlign: 'center'
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: 'red',
    width: '45%',
    height: '30%',
    borderRadius: 50,
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white'
  }
})