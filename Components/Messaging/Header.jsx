import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './MessagingStyles.js';

export default function Header({ otherUser }) {
const setTradeAs
axios.put('http://localhost:8000/api/trades', {tradeId: otherUser.id, status: 'completed'})
  return (
    <View style={styles.styleHeader}>
      <View style={{alignSelf:'center', justifyContent:'center', marginTop:'7%'}}>
        <Image style={{backgroundColor:'white', width: 50, height: 50 ,borderRadius:20, marginLeft: 25, marginBottom: 10}} source={{uri: otherUser.theirprofilepic}}>
        </Image>
        <Text style={styles.headerText}>{otherUser.theirusername}</Text>
      </View>
    </View>
  )
}