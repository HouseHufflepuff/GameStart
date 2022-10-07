import {useState} from 'react';
import {Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import styles from './MessagingStyles.js';
import axios from 'axios';

export default function ChatInput({conversationId, username}){

  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if(message.length === 0) return;
    axios.post('http://localhost:8000/api/messages', {username, body: message, conversationId, created_at: new Date().toJSON() });
    setMessage('');
  }

  return (
    <View style={{flexDirection:'row', position: 'absolute', bottom: 90, flex: 1, left: 0, color: 'white'}}>
      <TextInput
        style={{flex:1,backgroundColor:'#252525', height: 38, color: 'white'}}
        placeholderTextColor="#CCC"
        placeholder='  Message...'
        selectionColor="white"
        onChangeText={setMessage}
        value={message}
      />
      <TouchableOpacity style={{position: 'absolute', backgroundColor: 'white', right: 0, bottom: 0}}>
      <Button
        title="Send"
        color="#03045e"
        onPress={handleSendMessage}
      />
      </TouchableOpacity>
    </View>
  )
}