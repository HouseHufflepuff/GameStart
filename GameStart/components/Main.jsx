import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

//Screen names
const homeName = "Home";
const detailsName = "Details";

const Tab = createBottomTabNavigator();

function Main() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline'
            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
        })
        }>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />


      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default Main;