import React, { useState, useContext, useEffect } from 'react';
import {
  View, Button, Text, StyleSheet, Image, ScrollView, SectionList,
  SafeAreaView, Alert, TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Screens
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import Search from './Search/Search.js';
import MapScreen from './Map/MapScreen';
import ProfileScreen from './ProfileScreen';
import Trade from './Trades/TradeStack.js';

//Screen names
const homeName = "Home";
const detailsName = "Details";
const mapName = "Map";
const profileName = "Profile";
const tradeName = 'Trade';


const Tab = createBottomTabNavigator();

export const GameStartContext = React.createContext();

export function useGameStart() {
  const { location, setLocation } = useContext(GameStartContext);

  return { location, setLocation, };
}

function Main({ navigation }) {
  const [logoImg, setlogoImg] = useState();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const staticImage = require('../assets/logo.png');
  const staticImageW = require('../assets/logo-white.png');

  return (
    <GameStartContext.Provider
      value={{
        location: [location, setLocation],
      }}
    >

      <Tab.Navigator
        screenOptions={
          {
            headerShown: false,
            tabBarShowLabel: false,
            keyboardHidesTabBar: true,
            tabBarStyle: [
              {
                position: 'absolute',
                backgroundColor: '#181818',
                height: 65
              }
            ],
          }
        }>


        <Tab.Screen name={detailsName} component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fontisto name='search' size={22} style={{
                  top: 5,
                  width: 30,
                  height: 30,
                  color: focused ? '#90E0EF' : '#748c94'
                }} />
              </View>
            )
          }}
        />


        <Tab.Screen name={tradeName} component={Trade}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome5 name='exchange-alt' size={22} style={{
                  top: 5,
                  width: 30,
                  height: 30,
                  color: focused ? '#90E0EF' : '#748c94'
                }} />
              </View>
            )
          }}
        />





        <Tab.Screen name={homeName} component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (

              <View style={{
                alignItems: 'center',
                justifyContent: 'center',

              }}>
                <Image
                  source={focused ? staticImage : staticImageW}
                  resizeMode='contain'
                  style={{
                    width: 100,
                    heigth: 100,
                    color: focused ? '#90E0EF' : '#748c94',
                  }}
                />
              </View>
            )
          }}
        >

        </Tab.Screen>


        <Tab.Screen name={mapName} component={MapScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Fontisto name='map-marker-alt' size={22} style={{
                  top: 5,
                  width: 30,
                  height: 30,
                  color: focused ? '#90E0EF' : '#748c94'
                }} />
              </View>
            )
          }}
        />

        <Tab.Screen name={profileName} component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                <FontAwesome5 name='user-alt' size={22} style={{
                  top: 5,
                  width: 30,
                  height: 30,
                  color: focused ? '#90E0EF' : '#748c94'
                }} />
              </View>
            )
          }}
        />


      </Tab.Navigator>
    </GameStartContext.Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;