import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, ImageBackground, SafeAreaView, FlatList} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';

export default function SetLocation () {
  const [isLoading, setLoading] = useState(false);
  const [location, setLocation] = useState('');

  const GOOGLE_KEY = 'AIzaSyBX1mVE77vY6fsEYU__Pe2M83qKooIOhuk';

  const submitLocation = (address, userID) => {
    //toggle loading...
    axios.put('http://localhost:8000/users/api/address', {
      address: address,
      userID: userID
    })
    .then(() => {
      //de-toggle loading
      //change view
    })
  }

  const zipCodeSplit = (address) => {
    let temp = address.substring(0, address.length - 5)
    setLocation(temp);
  }

  return(
    <View style={styles.inputContainer}>
        <Text style={styles.text}> Enter your address </Text>
        <GooglePlacesAutocomplete
        placeholder="Search"
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
      <Button title="submit" onPress={() => submitLocation(location, 1)}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    width: '100%',
    height: '100%',
    flexShrink: 1,
    backgroundColor: 'black',
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
    marginTop: '20%',
    color: 'white',
    textAlign: 'center'
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
    backgroundColor: 'black',
  }
})