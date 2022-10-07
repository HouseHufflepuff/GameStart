import {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './MessagingStyles.js';
import Message from './Message.jsx';

export default function Conversation({conversation, username}) {

  const renderMessage = ({item}) => {

    return (<Message key={item.id} message={item} sent={item.username === username.myusername}/>)
  };
  return(
    <View style={{marginTop: 40, height: 550, overflow: 'scroll'}}>
      <FlatList
        data={conversation}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        inverted
        contentContainerStyle={{
          flexGrow: 1, justifyContent: 'flex-end'
        }}
      />
  </View>
  )
}