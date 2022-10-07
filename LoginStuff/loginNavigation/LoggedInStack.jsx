import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from './UserProfile';

const Stack = createNativeStackNavigator();

export default function LoggedInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}