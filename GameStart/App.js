import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Main from './components/Main.jsx';
import TradeModule from './TradeStack'

function App() {

  const Stack = createNativeStackNavigator();

  return (
    <TradeModule />
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen options={{ headerShown: false }} name="Login" component={Main} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App;
npm