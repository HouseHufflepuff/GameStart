import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Main from './components/Main.jsx';
import CreateAccount from './components/register/CreateAccount.js';
import RegisterConsoles from './components/register/RegisterConsoles.js';
import ProfilePicture from './components/register/ProfilePicture.js';
import RegisterGames from './components/register/RegisterGames.js';

function App() {

  const Stack = createNativeStackNavigator();

  return (
    // <RegisterGames />

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
