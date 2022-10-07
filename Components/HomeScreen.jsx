import React, { useState, useEffect } from 'react';
import {
  View, Button, Text, StyleSheet, Image, ScrollView, SectionList,
  SafeAreaView, Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { users } from './Map/mapHelpers/users.js';
import { getDistance, isPointWithinRadius } from 'geolib';
import axios from 'axios';
import * as Location from 'expo-location';
import GameCard from './Map/GameCard.jsx';
import TrendyCard from './Map/TrendyCard.jsx';



function HomeScreen({ navigation }) {
  const [closeGames, setCloseGames] = useState(users);
  const [trendGames, setTrendGames] = useState(users);
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [kilometers, setKilometers] = useState(5);

  useEffect(() => {


    getUsersData();


    // axios.get('https://localhost:8000/api/locations')
    //   .then((data) => {
    //     console.log(data.data);
    //   }).catch((err) => {
    //     console.log(err);
    //   })

    getMiles();

    let sorted = users.slice();
    sorted = sorted.sort(function (a, b) {
      return b.tradingCount - a.tradingCount;
    });
    setTrendGames(sorted);

    let sortGames = users.slice();
    sortGames = sortGames.sort(function (a, b) {
      return a.miles - b.miles;
    });
    setCloseGames(sortGames);
  }, [])

  const getMiles = () => {

    users.forEach((item) => {
      let data = getDistance(
        item.coordinate,
        { latitude: 37.783242, longitude: -122.443055 }
      )
      data = (data * 0.000621371192).toFixed(2);
      item.miles = data;
    })
  }

  const getUsersData = async () => {

    try {
      let response = await axios.get('http://13.57.240.106:8000/api/locations');

      console.log(response.data)
    } catch (error) {
      console.log('err', error);
    }




  }

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let data = await Location.getCurrentPositionAsync({});


      setLocation(
        {
          coordinate: {
            latitude: 37.783242,
            longitude: -122.443055
          }
        }
      );
    })();
  }, [location]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // conversion factor
  const factor = 0.621371;

  // calculate miles
  const miles = Math.floor(kilometers * factor);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Top Trending Games:</Text>
      <View>
        <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
          {trendGames.map((item, index) => {
            return (
              <TrendyCard
                key={index}
                style={{ height: 200 }}
                title={item.title}
                img={item.img}
                count={item.tradingCount}
                console={item.console}
                state={item.state}
              />
            )

          })}
        </ScrollView>
      </View>

      <Text style={styles.title}>Games in your area:</Text>
      <View>
        <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
          {closeGames.map((item, index) => {
            if (isPointWithinRadius(item.coordinate, {
              latitude: 37.783242,
              longitude: -122.443055
            }, 5000)) {
              return (
                <GameCard
                  key={index}
                  style={{ height: 200 }}
                  title={item.title}
                  img={item.img}
                  console={item.console}
                  coordinate={item.coordinate}
                  state={item.state}
                  miles={item.miles}
                />
              )
            }
          })}
        </ScrollView>
      </View>


      <Text style={styles.title}>Console Filter</Text>

      <View style={styles.consoleContainer}>
        <Button
          title="XBOX"
          style={{ flex: ' 0 0 33.333333%' }}
          onPress={() => alert('Simple Button pressed')}
        />
        <Button
          title="PS5"
          style={{ flex: ' 0 0 33.333333%' }}
          onPress={() => alert('Simple Button pressed')}
        />
        <Button
          title="XBOX"
          style={{ flex: ' 0 0 33.333333%' }}
          onPress={() => alert('Simple Button pressed')}
        />
        <Button
          title="XBOX ONE"
          style={{ flex: ' 0 0 33.333333%' }}
          onPress={() => alert('Simple Button pressed')}
        />

        <Button
          title="PS4"
          style={{ flex: ' 0 0 33.333333%' }}
          onPress={() => Alert.alert('Simple Button pressed')}
        />

        <Button
          title="OTHER"
          style={{ flex: ' 0 0 33.333333%' }}
          onPress={() => Alert.alert('Simple Button pressed')}
        />


      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#181818',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  consoleContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 0,
  },
  title: {
    margin: 10,
    fontSize: 20,
    color: '#90E0EF',
  },
  scrollView: {
    padding: 0,
    flexGrow: 0,
    height: 200,
    marginRight: 4,
    flexShrink: 0,
  },
});

export default HomeScreen;