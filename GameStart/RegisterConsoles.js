import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity} from 'react-native';
import axios from 'axios';
import CardTiles from './CardTiles.js';

export default function RegisterConsoles () {
  const [consoles, setConsoles] = useState([]);
  const [list, setList] = useState({Xbox: false, Playstation: false, NintendoSwitch: false, Pc: false});
  const [isLoading, setLoading] = useState(false);

  console.log(consoles);
  console.log(list);


  const addConsole = (system) => {
    setConsoles(prev => [...prev, system])
    setList({
    ...list,
    [system]: true
    })
  }

  const removeConsole = (system) => {
    setConsoles(consoles.filter(item => item !== system));
    setList({
      ...list,
      [system]: false
    })
  }

  const submitConsoles = (e) => {
    //format data
    //get ready for send
  }


  return(
    <View style={styles.container}>
      <Text style={styles.statement}> Choose your equipment! </Text>
      <View style={styles.cardContainer}>
        <CardTiles system="Xbox" list={list.Xbox}addConsole={addConsole} removeConsole={removeConsole}/>
        <CardTiles system="Playstation" list={list.Playstation}addConsole={addConsole} removeConsole={removeConsole}/>
        <CardTiles system="NintendoSwitch" list={list.NintendoSwitch}addConsole={addConsole} removeConsole={removeConsole}/>
        <CardTiles system="Pc" list={list.Pc} addConsole={addConsole} removeConsole={removeConsole}/>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text>
          Proceed
        </Text>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '70%',
    width: '100%'

  },
  statement: {
    marginTop: 100,
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    height: '10%'
  },
  container: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    color: 'white',
    borderWidth: 25,
    borderRadius: 10,
    borderColor: '#00B4D8',
    width: '100%',
    height: '5%',
    marginBottom: 10
  }

})