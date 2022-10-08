import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Components/Main.jsx';
import CreateAccount from './Components/register/CreateAccount.js';
import RegisterConsoles from './Components/register/RegisterConsoles.js';
import ProfilePicture from './Components/register/ProfilePicture.js';
import RegisterGames from './Components/register/RegisterGames.js';
import SetLocation from './Components/register/SetLocation.js';
import CreateStack from './Components/register/Main.js';
import Login from './LoginStuff/loginComponents/Login.js';
import MyStack from './Components/register/Main.js'
import { useAuth } from './LoginStuff/loginUtils/useAuth.js';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

function App() {

  const { user } = useAuth();


  const [isLogin, setIsLogin] = useState(true);


  const Stack = createNativeStackNavigator();

  return (




 <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={Login}/>
            <Stack.Screen name="main" component={Main} />
            <Stack.Screen name='register' component={CreateStack} />
          </Stack.Navigator>
        </NavigationContainer>
  )
}

export default App;
