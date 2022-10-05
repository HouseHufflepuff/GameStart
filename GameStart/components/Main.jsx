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
import MapScreen3 from './MapScreen3';
import ProfileScreen from './ProfileScreen';
import TradeScreen from './TradeScreen';

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
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
            tabBarStyle: [
              {
                position: 'absolute',
                elevation: 1,
                backgroundColor: '#181818',
                height: 65,
              }
            ],
          }
        }>


        <Tab.Screen name={detailsName} component={DetailsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fontisto name='search' size={22} style={{
                  top: 5,
                  width: 30,
                  height: 30,
                  color: focused ? 'white' : '#748c94'
                }} />
              </View>
            )
          }}
        />


        <Tab.Screen name={tradeName} component={TradeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome5 name='exchange-alt' size={22} style={{
                  top: 5,
                  width: 30,
                  height: 30,
                  color: focused ? 'white' : '#748c94'
                }} />
              </View>
            )
          }}
        />





        <Tab.Screen name={homeName}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',

              }}>
                <Image
                  source={require('../assets/logo.png')}
                  resizeMode='contain'
                  style={{
                    bottom: 15,
                    width: 150,
                    heigth: 140,
                    color: focused ? 'white' : '#748c94',
                  }}
                />
              </View>
            )
          }}
        >
          {(props) => <HomeScreen  {...props} location={location} setLocation={setLocation} />}
        </Tab.Screen>


        <Tab.Screen name={mapName} component={MapScreen3}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Fontisto name='map-marker-alt' size={22} style={{
                  top: 5,
                  width: 30,
                  height: 30,
                  color: focused ? 'white' : '#748c94'
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
                  color: focused ? 'white' : '#748c94'
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
