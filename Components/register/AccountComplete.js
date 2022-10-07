import React, { useState, useEffect } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

export default function AccountComplete ({navigation, route}) {

  const {userID} = route.params;

  return(
    <SafeAreaView style={styles.container}>
       <LinearGradient
        style={{width: '100%', height: '100%'}}
        colors={['black', '#03045E', 'black']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}>
      <Image source={require('./icons/gamestart.png')} />
      <Text style={styles.text}> Congratulations!</Text>
      <Text style={styles.text}> You're ready for your journey! </Text>
      <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={['#03045E', 'green', 'black']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 1}}
          style={styles.button}>
          <Text style={{color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 25, marginTop: 15}}> Dive into GameStart </Text>
        <TouchableOpacity style={styles.button}>
        </TouchableOpacity>
        </LinearGradient>
      </View>
      </LinearGradient>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(90deg, rgba(0,0,0,1) 9%, rgba(2,69,139,1) 70%, rgba(0,180,216,1) 100%)',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },

  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 5,
    textShadowColor: '#90E0EF',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 4,
    backgroundColor: 'transparent'
  },

  buttonContainer: {
    width: '60%',
    height: '25%',
    marginTop: '15%',
    borderRadius: 5,
    alignItems: 'center'
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
    height: '20%'
  },

  button: {
    width: '130%',
    height: '30%',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: '70%'
  }
})