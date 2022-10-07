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
import TradeModule from './TradeStack.js';
import Login from './LoginStuff/loginComponents/Login.js';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const Stack = createNativeStackNavigator();

  return (
    <>
      {/* // <NavigationContainer>
    //   <CreateStack />
    // </NavigationContainer> */}
      {isLogin && < Login />}

      {
        !isLogin && <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Main} />
          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  )
}

export default App;
