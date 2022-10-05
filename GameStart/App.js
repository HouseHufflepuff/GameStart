<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateAccount from './CreateAccount.js';
<<<<<<< HEAD
import RegisterConsoles from './RegisterConsoles.js';
import ProfilePicture from './ProfilePicture.js';
=======
=======
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/Main.jsx';

function App() {

  const Stack = createNativeStackNavigator();
>>>>>>> 740d3eba25fe2541ce94445fd57770987618faa7
>>>>>>> main

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <ProfilePicture />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
=======

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
>>>>>>> 740d3eba25fe2541ce94445fd57770987618faa7
