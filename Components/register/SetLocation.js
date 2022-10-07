import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, ImageBackground, SafeAreaView, FlatList} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function SetLocation ({navigation, route}) {
  const [isLoading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const {userID} = route.params;

  const GOOGLE_KEY = 'AIzaSyBX1mVE77vY6fsEYU__Pe2M83qKooIOhuk';

  const submitLocation = (address, userID) => {
    axios.put('http://13.57.240.106:8000/users/api/address', {
      address: address,
      userID: userID
    })
    .then(() => {
      console.log('success')
      navigation.navigate('profile-picture', {userID: userID})
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  const zipCodeSplit = (address) => {
    let temp = address.substring(0, address.length - 5)
    setLocation(temp);
  }

  return(
    <KeyboardAvoidingView style={styles.inputContainer}>
       <LinearGradient
        style={{width: '100%', height: '100%'}}
        colors={['black', '#03045E', 'black']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}>
       <ImageBackground
        style={styles.logo}
        imageStyle={{height: '100%'}}
        source={require('./icons/gamestart.png')}
      />
        <Text style={styles.text}> Enter your address </Text>
        <GooglePlacesAutocomplete
        placeholder="Search..."
        query={{
          key: GOOGLE_KEY,
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => zipCodeSplit(data.description)}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }}
      />
      <Button title="Submit" titleStyle={{fontSize: 20, marginBottom: '10%'}} onPress={() => submitLocation(location, userID)}></Button>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: 'pink'
  },
  header: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: '5%',
    height: '70%',
    borderWidth: 5,
    borderColor: 'green',
    textAlign: 'center'
  },
  text: {
    width: '100%',
    height: '5%',
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '200'
  },
  forms: {
    marginBottom: 30,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius:10,
    width: 300,
    paddingLeft: 15
  },
  listContainer: {
    width: '100%',
    height: '60%',
    borderWidth: 5,
    borderColor: 'blue'
  },
  inputContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 100,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  logo: {
    height: '30%',
    width: '100%',
    alignSelf: 'center',
    marginLeft: '5%',
  }
})