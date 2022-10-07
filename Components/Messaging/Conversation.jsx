import {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './MessagingStyles.js';
import Message from './Message.jsx';

export default function Conversation({conversation, username}) {
  console.log('CONVO RENDER');
  console.log(conversation.length);
  const renderMessage = ({item}) => {
    return (<Message key={item.id} message={item} sent={item.username === username}/>)
  };
  return(
    <View style={{flex:1}}>
      <FlatList
        data={conversation}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        inverted
        contentContainerStyle={{
          flexGrow: 1, justifyContent: 'flex-end',
        }}
      />
  </View>
  )
}