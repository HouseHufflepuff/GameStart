import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, TouchableOpacity, ImageBackground} from 'react-native';

export default function CardTiles ({system, addConsole, removeConsole, list}) {

  //need to fix consoles images
  if (list) {
    return (
      <TouchableOpacity id="xbox" style={styles.card} onPress={() => removeConsole(system)}>
      <Text style={styles.text}>
        {system} ✓
      </Text>
      <ImageBackground
        style={styles.image}
        source={require(`./icons/Xbox.png`)}
      />
    </TouchableOpacity>
    )
  }



  return(
    <TouchableOpacity id="xbox" style={styles.card} onPress={() => addConsole(system)}>
      <Text style={styles.text}>
        {system}
      </Text>
      <ImageBackground
        style={styles.image}
        source={require(`./icons/Xbox.png`)}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'white',
    width: 175,
    height: 200,
    borderWidth: 1,
    borderColor: '#90E0EF',
    borderRadius: 20,
    alignItems: 'center',
    margin: 10,
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
    width: '100%',

  }
})