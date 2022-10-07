import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//ROUTE HAS BEEN MADE FOR PROFILE INFORMATION
//deployed server ip:8000/api/users/:userID(param)
//will call getUserProfile
  //data structure left inside of getUserProfile method in user controller

function ProfileScreen({ navigation }) {
  return (
    <View style={{
      flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#181818',
      color: '#fff',
    }}>
      <Text style={{ color: 'white' }}>Profile Screen</Text>
    </View>
  );
}

export default ProfileScreen;