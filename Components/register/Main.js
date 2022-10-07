import React, { useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './CreateAccount.js';
import ProfilePicture from './ProfilePicture.js';
import RegisterConsoles from './RegisterConsoles.js';
import SetLocation from './SetLocation.js';
import AccountComplete from './AccountComplete.js'
import {NavigationContainer} from '@react-navigation/native'


export default function MyStack({navigation}) {

  const Stack = createStackNavigator();

  return (

    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: '0%'
        }
      }}>
      <Stack.Screen name="account-info" component={CreateAccount}/>
      <Stack.Screen name="register-consoles" component={RegisterConsoles} />
      <Stack.Screen name="location" component={SetLocation} />
      <Stack.Screen name="profile-picture" component={ProfilePicture} />
      <Stack.Screen name="complete" component={AccountComplete} />
    </Stack.Navigator>
  );
}