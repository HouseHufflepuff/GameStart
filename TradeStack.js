import * as React from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, SafeAreaView, Text, View, TouchableWithoutFeedback, FlatList, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TradeList, TradeView, TradeDetails, TradeHistory } from './TradeScreens.js';

const TradeStack = createStackNavigator();

function Trade () {
  return (
  <NavigationContainer independent={true}>
    <TradeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#121212' } }}>
      <TradeStack.Screen
        name="TradeList"
        component={TradeList}
        options={({ navigation, route }) => ({
          title: 'Trades List',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleStyle: {
            color: '#fff'
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("TradeHistory", route)}
              title="History"
              color="#CCC"
              />
          )
        })}
          />
      <TradeStack.Screen
        name="TradeView"
        component={TradeView}
        options={{
          title: 'Trade View',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleStyle: {
            color: '#fff'
          }
        }}
        />
      <TradeStack.Screen
        name="TradeDetails"
        component={TradeDetails}
        options={{
          title: 'Trades Details',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleStyle: {
            color: '#fff'
          }
        }}
        />
        <TradeStack.Screen
        name="TradeHistory"
        component={TradeHistory}
        options={{
          title: 'Trade History',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleStyle: {
            color: '#fff'
          }
        }}
        />
    </TradeStack.Navigator>
  </NavigationContainer>
  )
};

export default Trade;