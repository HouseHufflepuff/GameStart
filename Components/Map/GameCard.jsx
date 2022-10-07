import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { users } from './mapHelpers/users.js';
import { getDistance, isPointWithinRadius } from 'geolib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function GameCard({ title, img, console, state, coordinate, miles }) {

  useEffect(() => {
  }, [])



  return (
    <View style={styles.cardContainer} onStartShouldSetResponder={() => true}>
      <View>
        <Image style={styles.imageStyle} source={{ uri: img }} resizeMode='cover' />
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Icon style={styles.iconStyle} color='white' name={console} />
          <Text style={styles.stateStyle}>{state}</Text>
          <Text style={styles.bold}> <Text style={styles.countStyle}>{miles}</Text> miles away</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '10%',
    backgroundColor: '#06283D',
    color: 'white',
    marginRight: 10,
    marginLeft: 10,
    height: 170,
    borderRadius: 10,
  },
  imageStyle: {
    width: "100%",
    height: 100,
    padding: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    width: '100%',
    fontWeight: '800',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconStyle: {
    textAlign: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },
  stateStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 10,
    marginTop: 3,
  },
  bold: {
    textAlign: 'center',
    fontSize: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  countStyle: {
    textAlign: 'center',
    color: '#90E0EF',
    fontSize: 9,
  }
});

export default GameCard