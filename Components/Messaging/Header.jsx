import React from 'react';
import { TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './MessagingStyles.js';
import axios from 'axios';

export default function Header({ otherUser, navigation }) {
const setTradeAsComplete = () => {
  axios.put('http://localhost:8000/api/trades', {tradeId: otherUser.id, status: 'completed'});
  navigation.navigate('TradeList');
}
  return (
    <View style={styles.styleHeader}>
      <TouchableOpacity style={{position: 'absolute', right: 0, backgroundColor: '#29446b', height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{alignSelf:'center', justifyContent: 'center', color: 'white', flexWrap: 'wrap', width: 100, textAlign: 'center'}} onPress={setTradeAsComplete}>Mark as Complete!</Text>
      </TouchableOpacity>
      <View style={{alignSelf:'center', justifyContent:'center', marginTop:'7%'}}>
        <Image style={{backgroundColor:'white', width: 50, height: 50 ,borderRadius:20, marginLeft: 25, marginBottom: 10}} source={{uri: otherUser.theirprofilepic}}>
        </Image>
        <Text style={styles.headerText}>{otherUser.theirusername}</Text>
      </View>
    </View>
  )
}