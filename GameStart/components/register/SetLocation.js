import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, ImageBackground, SafeAreaView, FlatList} from 'react-native';
import axios from 'axios';

export default function SetLocation () {
  const [isLoading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [addressList, setAddressList] = useState([]);


  /*
  text input for address search
  on keystroke, filter through possible locations
  onSet -> set state for address and update user

  */
  const Item = ({address}) => (
    <TouchableOpacity>
      <Text> {address} </Text>
    </TouchableOpacity>
  )


  const getAddressList = (e) => {
    //query maps API for data
    //filter through the data to include anything that contains the query string
      //then set data to addressList

  }

  const renderAddress = ({}) => {

    return(
      <Item
        item={item}
        onPress={() => setLocation(item.address)}
        backgroundColor={}
        textColor={}
      />
    )
  }
  /*
  render out possible locations in flatlist
  */

  return(
    <View>
      <TextInput
        placeholder="Search Address..."
      />
      <View>
      <FlatList
        data={addressList}
        renderItem={renderAddress}
        keyExtractor={(key) => key.id}
        extraData={address}
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  addressCard: {


  },
  searchbar: {


  },
  container: {


  },
  listContainer: {


  },


})