import {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import styles from './MessagingStyles.js';
import axios from 'axios';

export default function ChatInput({conversationId, username}){

  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if(message.length === 0) return;
    axios.post('http://192.168.1.142:8000/api/messages', {username, body: message, conversationId, created_at: new Date().toJSON() });
    setMessage('');
  }

  return (
    <View style={{flexDirection:'row'}}>
      <TextInput
        style={{flex:1,backgroundColor:'#caf0f8'}} placeholder='Message...'
        onChangeText={setMessage}
        value={message}
      />
      <Button
        title="Send"
        color="#03045e"
        onPress={handleSendMessage}
      />
    </View>
  )
}