import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, Image, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function Register ({navigation}) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUsername] = useState('');
  const [pass, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState(0)

  useEffect(() => {
    console.log(userID);
  }, [userID])

  //validation functions
  const validate = (email) => {

    const criteria = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return criteria.test(String(email).toLowerCase());
  }

  const handleRegister = (e) => {

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

    setLoading(true);
    //firebase auth (?)
    axios.post('http://13.57.240.106:8000/api/users/register', data)
    .then(() => {
      axios.get(`http://13.57.240.106.8000/api/users/:${user}`)
      .then((id) => {
        setUserID(id)
        console.log('hitting here')
        setTimeout(() => {
          setLoading(false);
          console.log('set time out done')
          navigation.navigate('register-consoles', {userID: userID})
        }, 500)
      })
    })
    .catch((err) => {
      alert('error registering')
      console.log(err.response)
      setLoading(false);
    })

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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
       <LinearGradient
        style={{width: '100%'}}
        colors={['black', '#03045E', 'black']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{alignItems: 'center'}}>
      <ImageBackground
        style={styles.logo}
        source={require('./icons/gamestart.png')}
      />
      <Text style={styles.statement}>
        Join a community of gamers and streamers trading games to give life to second-hand games. Start trading games today!
      </Text>
      <View style={styles.guideContainer}>
        <Text style={styles.firstNameGuide}>
          First Name
        </Text>
        <Text style={styles.nameGuide}>
          Last Name
        </Text>
      </View>
        <View style={styles.guideContainer}>
        <TextInput
          style={styles.nameForms}
          id='first_name'
          placeholder='First'
          placeholderTextColor="gray"
          onChangeText={(name) => setFirstName(name)}
        />
        <TextInput
          style={styles.nameForms}
          id='last_name'
          placeholder='Last'
        placeholderTextColor="gray"
          onChangeText={(lastName) => setLastName(lastName)}
        />
        </View>
        <Text style={styles.formGuide}> Username </Text>
        <TextInput
          style={styles.forms}
          id='username'
          placeholder='Username'
        placeholderTextColor="gray"
          onChangeText={(username) => setUsername(username)}
        />
        <Text style={styles.formGuide}> Password </Text>
        <TextInput
          style={styles.forms}
          id='password'
          secureTextEntry="true"
          placeholder='Password'
        placeholderTextColor="gray"
          onChangeText={(password) => setPassword(password)}
        />
        <Text style={styles.formGuide}> Email </Text>
        <TextInput
          style={styles.forms}
          id='email'
          placeholder='Email'
        placeholderTextColor="gray"
          onChangeText={(email) => setEmail(email)}
        />
      <Text style={styles.terms}>
        By registering, you agree to GameStart's Terms of Service.
      </Text>
      {loading
      ? <Button
      style={styles.registerBtn} title="Creating account..." />
      : <Button
      style={styles.registerBtn}
      color='white' title="Register" onPress={handleRegister} />
      }
      </View>
      </TouchableWithoutFeedback>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    flexShrink: 1,
    backgroundColor: 'black'
  },
  firstNameGuide: {
    color: 'white',
    alignSelf: 'flex-start',
  },
  nameGuide: {
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: '18%',
    flexGrow: .25
  },
  formGuide: {
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: 70
  },
  statement: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 120,
    width: 380,
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  nameForms: {
    marginBottom: 30,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius:10,
    width: 150,
    paddingLeft: 15,

  },
  forms: {
    marginBottom: 30,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius:10,
    width: 300,
    paddingLeft: 15
  },
  guideContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  terms: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    height: 50,
    width: 200,
    color: 'white'
  },
  nameContainer: {
    flexDirection: 'row',
    width: 150
  },
  registerBtn: {
    backgroundColor: '#pink',
    borderRadius: 10,
    borderColor: '#0077B6',
    borderWidth: 1,
    fontSize: 30
  },
  logo: {
    marginTop: 15,
    height: 250,
    width: 400,
    marginBottom: 10
  }
})