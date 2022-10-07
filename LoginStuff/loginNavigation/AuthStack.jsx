import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from './UserProfile.js';
import Login from './Login.js';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}