import React from 'react';
import {View, Text} from 'react-native';
import styles from './MessagingStyles.js';

export default function Header({otherUser, incoming, outgoing}) {

  return (
    <View style={styles.styleHeader}>
      <View>
        <Text style={{ position: 'absolute', color:'white', padding:'3%', fontSize:35}}>&#x2039;</Text>
      </View>
      <View>
        <Text style={styles.headerText}>{otherUser}</Text>
      </View>
    </View>
  )
}