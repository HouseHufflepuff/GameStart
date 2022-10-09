import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, Image, ImageBackground, TouchableWithoutFeedback, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { auth } from '../../LoginStuff/loginUtils/firebase'
import {signInWithEmailAndPassword, updateProfile, getAuth, signInWithPopup,signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'

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
      email_address: email,
      fiyabase_authkey: null

    }
    handleSignUp(data.email_address, data.password)

      data.fiyabase_authkey = user.uid;
      axios.post('http://localhost:8000/api/users/register', data)
      .then(() => navigation.navigate('register-consoles', {userID: user.uid}))


    .catch((err) => {
      alert('error registering')
      console.log(err)
    })

    // setLoading(true);
    //firebase auth (?)
    // axios.post('http://13.57.240.106:8000/api/users/register', data)
    // .then(() => {
    //   axios.get(`http://13.57.240.106.8000/api/users/:${user}`)
    //   .then((id) => {
    //     setUserID(id)
    //     console.log('hitting here')
    //     setTimeout(() => {
    //       setLoading(false);
    //       console.log('set time out done')
          navigation.navigate('register-consoles', {userID: userID})
    //     }, 500)
    //   })
    // })
    // .catch((err) => {
    //   alert('error registering')
    //   console.log(err.response)
    //   setLoading(false);
    // })


  }
    //what are states? (setState{user: user, password: password, email: email, consoles: consoles, }), {isLoading},
    //5 step process ?
    //first, username, email, password (should set an accountID) -> loading transition
    //validate information
      //next, set address -> loading transition
        //next set consoles (two icons xbox and ps?) -> loading transition
          //any games you want to go ahead and add for listing (optional) -> send data to db
          //finish "quest complete!"

const handleSignUp =  (email, pass) => {
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      // navigation.navigate('register-consoles', {userID: user.uid})
      console.log(user)
    })
    .catch((error) => {
      alert(error.message);
    });
};


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
       {/* <LinearGradient
        style={{width: '100%'}}
        colors={['rgba(3,4,94,1)', 'rgba(0,119,182,1)', 'rgba(0,180,216,1)', 'rgba(40,192,222,1)', 'rgba(97,209,231,1)', 'rgba(202,240,248,1)']}
        start={{x: .25, y: 0.5}}
        end={{x: 0, y: 0}}> */}
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
          ? <TouchableWithoutFeedback style={styles.registerBtn}>
                        <Text style={{color: 'white'}}>Register</Text>
            </TouchableWithoutFeedback>
          :
            <TouchableWithoutFeedback style={styles.registerBtn} onPress={handleRegister}>
                <Text style={{color: 'white', backgroundColor: '#0077B6', padding: 10, paddingLeft: 20,
                  paddingRight: 20, borderRadius: 10, overflow: 'hidden', marginTop: 30}}>Register</Text>
            </TouchableWithoutFeedback>}
          </View>
      </TouchableWithoutFeedback>
      <StatusBar barStyle={'light-content'}/>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#181818'
  },

  firstNameGuide: {
    color: 'white',
    textAlign: 'left',
    width: 150
  },
  nameGuide: {
    color: 'white',
    width: 150
  },
  formGuide: {
    color: 'white',
    width: 300,
  },
  statement: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 120,
    width: 380,
    textAlign: 'justify',
    color: 'white',
    padding: 15,
    fontSize: 18
  },
  nameForms: {
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius:10,
    width: 150,
    paddingLeft: 15,

  },
  forms: {
    marginBottom: 10,
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
    height: 50,
    width: 200,
    color: 'white'
  },
  nameContainer: {
    flexDirection: 'row',
    width: 150
  },
  registerBtn: {
    borderColor: '#0077B6',
    borderWidth: 1,
  },
  logo: {
    marginTop: 15,
    height: 250,
    width: 350,
    marginBottom: 10
  }
})