import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button} from 'react-native';
import axios from 'axios';

export default function Register () {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUsername] = useState('');
  const [pass, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  //validation functions
  const validate = (email) => {
    const criteria = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return criteria.test(String(email).toLowerCase());
  }

  const handleRegister = (e) => {
    console.log(firstName, lastName, user, pass, email);

    if (!validate(email)) {
      alert('The email provided is not valid. Please insert valid email');
      return;
    }

    if (user.length > 14) {
      alert('Username can not be longer than 14 characters')
      return;
    }

    if (pass.length < 8) {
      alert('Please use password with at least 8 characters');
      return;
    }

    const data = {
      first_name: firstName,
      last_name: lastName,
      username: user,
      password: pass,
      email_address: email
    }

    console.log(data);

    setLoading(true);
    //firebase auth (?)
    axios.post('/api/users/register', data)
    .then(() => {
      setTimeOut(() => {
        setLoading(false);
      }, 500)
    })
    .catch((err) => {
      alert('error registering')
      console.log(err)
      setLoading(false);
    })
    //send form data to database/firebase to create account

  }
    //what are states? (setState{user: user, password: password, email: email, consoles: consoles, }), {isLoading},
    //5 step process ?
    //first, username, email, password (should set an accountID) -> loading transition
    //validate information
      //next, set address -> loading transition
        //next set consoles (two icons xbox and ps?) -> loading transition
          //any games you want to go ahead and add for listing (optional) -> send data to db
          //finish "quest complete!"


  return (

    <View>
      <TextInput id='first_name' placeholder='First Name' onChangeText={(name) => setFirstName(name)} />
      <TextInput id='last_name' placeholder='Last Name' onChangeText={(lastName) => setLastName(lastName)} />
      <TextInput id='username' placeholder='Username' onChangeText={(username) => setUsername(username)} />
      <TextInput id='password' placeholder='password' onChangeText={(password) => setPassword(password)} />
      <TextInput id='email' placeholder='email' onChangeText={(email) => setEmail(email)} />
      <Text> By registering, you agree to GameStart's Terms of Service. </Text>
      {loading
      ? <Button title="Creating account..." />
      : <Button title="Register" onPress={handleRegister} />
      }
    </View>
  )
}