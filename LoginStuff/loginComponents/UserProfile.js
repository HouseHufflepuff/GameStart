import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, SafeAreaView, ImageBackground, Button } from 'react-native';
import logo from './assets/gamestartneon2.png'
import { auth } from './firebase'
import {signInWithEmailAndPassword, updateProfile, signOut} from 'firebase/auth'
import React, {useState} from 'react'
import { useAuth } from './loginUtils/useAuth.js';



export default function UserProfile() {
  const { user } = useAuth();
  //const id = user.uid
  // const photo = user.photoURL

  const [trades, setTrades] = useState('') //placeholder for trades
  const [profilePic, setProfilePic] = useState('') //placeholder for pic
  const [description, setDescription] = useState('') //placeholder

  //add button and submit to send description to db


  return (
    <View style={styles.container}>
    <Image source={profilePic ? profilePic : { uri: "https://www.jokesforfunny.com/wp-content/uploads/2021/06/0596bdb89b60fe771acd2f5972a9d3e3-905x1200.jpg" }} style={{ width: 200, height: 200, marginTop:20 }} />
      <Text style={styles.text}>Welcome, {user.displayName ? user.displayName : user.email}!</Text>
      <View >
      <Text style={styles.text}>You have completed {trades ? trades : 5} trades!</Text>
      <Text style={styles.text}>Your description goes here</Text>
      {/* <TextInput
        placeholder="Add a description"
        style={styles.input}
        value={description}
        onChangeText={text => setDescription(text)}
      /> */}
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => signOut(auth)}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
    </View>

  )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
    marginBottom:10,
    padding:30,
    width: '60%'
  },
  button: {
    backgroundColor: '#0077B6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 242
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0077B6',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0077B6',
    fontWeight: '700',
    fontSize: 16,
  },
  textLink: {
    color:'#90E0EF',
    padding: 50,
    marginLeft: 10
  },
  text:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 60,
    color: 'white',
    fontSize: 18
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: '60%'
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 8,
    width:244
  },
})