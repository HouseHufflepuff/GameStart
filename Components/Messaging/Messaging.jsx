import { StatusBar } from 'expo-status-bar';
import {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, Image, Button, Alert, ScrollView, FlatList} from 'react-native';
import axios from 'axios';
import Header from './Header.jsx';
import Conversation from './Conversation.jsx';
import ChatInput from './ChatInput.jsx';
import Message from './Message.jsx';
import styles from './MessagingStyles.js';
import io from 'socket.io-client';

export default function Messaging({navigation, route}) {
  const conversationMessages = useRef([]);
  const [conversation, setConversation] = useState(conversationMessages.current);
  const [convId, setConvId] = useState();
  const [userData, setUserData] = useState(route.params.data)

  useEffect(() => {

    axios.get(`http://localhost:8000/api/messages/${userData.id}`)
      .then((data) => {
        console.log(data.data[0].id)
        setConvId(data.data[0].id)
        console.log('testtesstesst', convId)
        axios.get(`http://localhost:8000/api/messages/conversations/${data.data[0].id}`)
        .then((response) => {
          if(response.data.length > conversation.length){
            console.log('updated');
            conversationMessages.current = response.data;
            setConversation(response.data);
            (function poll(){
              setTimeout(function(){
                axios.get(`http://localhost:8000/api/messages/conversations/${data.data[0].id}`)
                .then((response) => {
                  console.log(conversation);
                  if(response.data.length > conversation.length){
                    console.log('updated');
                    conversationMessages.current = response.data;
                    setConversation(response.data);
                  }
                  poll();
                });
             }, 300);
           })();
          }
        });
      })

  }, []);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header otherUser={userData}/>
        <Conversation conversation={conversation} username={userData}/>
        <ChatInput conversationId={convId} username={userData.myusername}/>
      </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
