import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './MessagingStyles.js';

export default function Header({otherUser, incoming, outgoing}) {

  return (
    <View style={styles.styleHeader}>
      <View>
        <Text style={{ position: 'absolute', color:'white', padding:'3%', fontSize:40}}>&#x2039;</Text>
      </View>
      <View style={{alignSelf:'center', justifyContent:'center', marginTop:'7%'}}>
        <Image style={{backgroundColor:'white', width: 35, height: 35 ,borderRadius:50}}>
        </Image>
        <Text style={styles.headerText}>{otherUser}</Text>
      </View>
    </View>
  )
}