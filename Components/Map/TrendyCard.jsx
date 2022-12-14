import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { users } from './mapHelpers/users.js';
import { getDistance, isPointWithinRadius } from 'geolib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function TrendyCard({ title, img, count }) {


  return (
    <View style={styles.cardContainer}>
      <View >
        <Image style={styles.imageStyle} source={{ uri: img }} resizeMode='cover' />
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.bold}>Times Traded: </Text><Text style={styles.countStyle}>{count}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    backgroundColor: '#06283D',
    color: 'white',
    marginRight: 10,
    marginLeft: 10,
    height: 170,
    borderRadius: 2,
  },
  imageStyle: {
    width: "100%",
    height: 100,
    padding: 0,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
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
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  countStyle: {
    textAlign: 'center',
    color: '#90E0EF',
    fontSize: 25,
  }
});

export default TrendyCard