import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, SafeAreaView, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native';
import { ListItem, Avatar, Card, Button, Icon } from '@rneui/themed';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#121212',
    color: 'white'
  },

  item: {
    backgroundColor: '#121212',
    color: 'white',
    flex: 1,
  },

  noItems: {
    color: '#CCC',
    alignSelf: 'center',
    padding: 55,
    flex: 1,
  },

  tradeNav: {
    flex: 0,
    flexDirection: 'row',
  },

  tradeTouchables: {
    height: 60,
    flex: 1,
    paddingBottom: 5,
    backgroundColor: '#121212',
    borderBottomWidth: .3,
    borderColor: '#ccc',
  },

  tradeTouchablesSelected: {
    height: 60,
    flex: 1,
    paddingBottom: 5,
    backgroundColor: '#121212',
    borderBottomWidth: 2,
    borderColor: '#90E0EF'
  },

  Touchables: {
    height: 60,
    flex: 1,
    backgroundColor: '#121212',
    borderColor: '#90E0EF',
    color: '#FFF',
    alignSelf: 'center',
    padding: 20,
  },

  Selected: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    borderColor: '#90E0EF',
    color: '#90E0EF',
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderColor: '#90E0EF',
  },

  mainTrade: {
    flex: 7,
    justifyContent: 'flex-end',
    borderBottomWidth: .3,
    borderColor: '#CCC'
  },

  mainTradeText: {
    flex: 1,
    backgroundColor: '#121212',
    color: '#000000',
  },

  tradeView: {
    flex: 1,
  },

  navigationBar: {
    flex: 1,
  },

  tradingItem: {
    flex: 3,
    backgroundColor: '#121212'
  },

  decision: {
    flex: 1,
    flexDirection: 'row',
  },

  decisionItem: {
    flex: 1,
    color: 'white',
    alignSelf: 'center',
    margin: 5
  },

  tradeCard: {
    backgroundColor: '#252525',
    borderWidth: 0,
    color: '#FFF'
  }
});

export const TradeList = ({ navigation }) => {
  const [trades, setTrades] = useState('incoming');
  const [incomingTrades, setIncomingTrades] = useState([]);
  const [outgoingTrades, setOutgoingTrades] = useState([]);

  // Need to connect to database and refine data to use from get request/post request
  useEffect(() => {
    setIncomingTrades([{id: 1, title: 'GTA6', condition: 'new', case: 'new', status: 'Trading', photoURL: '/Users/tonykang/Hack Reactor SEI/GameStart/GameStart/assets/cory.jpeg'},
      {id: 2, title: 'GTA5', condition: 'old', case: 'poor', status: 'Pending Accept', photoURL: '/Users/tonykang/Hack Reactor SEI/GameStart/GameStart/assets/cory.jpeg' }])
    setOutgoingTrades([{id: 3, title: 'HALO9', condition: 'new', case: 'new', photoURL: '/Users/tonykang/Hack Reactor SEI/GameStart/GameStart/assets/cory.jpeg'},
      {id: 4, title: 'HALO10', condition: 'old', case: 'poor', photoURL: '/Users/tonykang/Hack Reactor SEI/GameStart/GameStart/assets/cory.jpeg' }])
  }, [])

  const renderItem = ({ item }) => (
    <ListItem bottomDivider containerStyle={styles.item} onPress={() => navigation.navigate('TradeView')}>
      <Avatar source={{uri: item.photoURL}} size={'large'} />
      <ListItem.Content>
        {trades === 'incoming' ? <Text style={styles.item}>User: {item.id}</Text> : <Text style={styles.item}>Offering: {item.title}</Text>}
        {trades === 'incoming' ? <Text style={styles.item}>Offering: Cory in the House</Text> : <Text style={styles.item}>To User: {item.id}</Text>}
        {trades === 'incoming' ? <Text style={styles.item}>For: {item.title}</Text> : <Text style={styles.item}>For: Cory in the House</Text>}
        {trades === 'incoming' ? <Text style={styles.item}>Status: {item.status}</Text> : <Text style={styles.item}>Status: {item.status}</Text>}
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tradeNav}>
        <View style={trades === 'incoming' ? styles.tradeTouchablesSelected : styles.tradeTouchables }>
          <TouchableWithoutFeedback onPress={() => setTrades('incoming')}>
            <Text style={trades === 'incoming' ? styles.Selected : styles.Touchables}>Incoming</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={trades === 'outgoing' ? styles.tradeTouchablesSelected : styles.tradeTouchables }>
          <TouchableWithoutFeedback onPress={() => setTrades('outgoing')}>
            <Text style={trades === 'outgoing' ? styles.Selected : styles.Touchables}>Outgoing</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.mainTrade}>
        {trades === 'incoming' ?
        incomingTrades.length ?
        <FlatList
          data={incomingTrades}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        /> : <Text style={styles.noItems}>You have no incoming offers</Text> :
        outgoingTrades.length ?
        <FlatList
        data={outgoingTrades}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> : <Text style={styles.noItems}>Tap for details</Text>}
      </View>
      <View style={styles.navigationBar}>
        <Text>Navigation Bar</Text>
      </View>
      <StatusBar barStyle={'light-content'}/>
    </View>
  )
}

export const TradeView = ({ navigation, route }) => {
  const [tradeData, setTradeData] = useState([]);
  const [tradeGroup, setTradeGroup] = useState('incoming')

  useEffect(() => {

  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.tradingItem}>
      <Card containerStyle={styles.tradeCard} wrapperStyle={styles.tradeCard}>
          <Card.Title style={{color: 'white'}}>THEIR: Cory in the House</Card.Title>
          <Card.Divider color='white'/>
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
            onPress={() => navigation.navigate('TradeDetails', {id: 'test'})}
          />
          <Text style={{color: 'white', alignSelf: 'center', paddingTop: 10}}>Tap for details</Text>
        </Card>
      </View>
      <View style={styles.decision}>
          {tradeStatus === 'incoming' ?
          <React.Fragment>
          <Button containerStyle={styles.decisionItem} title="Accept" color='secondary'/>
          <Button containerStyle={styles.decisionItem} title="Deny" color='error'/></React.Fragment> :
          <Button containerStyle={styles.decisionItem} title="Cancel" color='error'/> }
      </View>
      <View style={styles.tradingItem}>
      <Card containerStyle={styles.tradeCard} wrapperStyle={styles.tradeCard}>
          <Card.Title style={{color: 'white'}}>YOUR: GTA 6</Card.Title>
          <Card.Divider color='white'/>
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
            onPress={() => navigation.navigate('TradeDetails', {id: 'test'})}
          />
          <Text style={{color: 'white', alignSelf: 'center', paddingTop: 10}}>Tap for details</Text>
        </Card>
      </View>
      <View style={styles.navigationBar}>

</View>
    </View>
  )
}

export const TradeDetails = ({ navigation, route }) => {
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    setGameData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>{route.params.id}</Text>
    </View>
  )
}

export const TradeHistory = ({ navigation, route }) => {
  const [tradeData, setTradeData] = useState([]);

  // Need to connect to database and refine data to use from get request
  useEffect(() => {
    setTradeData([{id: 1, title: 'GTA6', condition: 'new', case: 'new', status: 'Trading', photoURL: '/Users/tonykang/Hack Reactor SEI/GameStart/GameStart/assets/cory.jpeg'},
    {id: 2, title: 'GTA5', condition: 'old', case: 'poor', status: 'Pending Offer', photoURL: '/Users/tonykang/Hack Reactor SEI/GameStart/GameStart/assets/cory.jpeg' },
    {id: 3, title: 'HALO9', condition: 'new', case: 'new', photoURL: '/Users/tonykang/Hack Reactor SEI/GameStart/GameStart/assets/cory.jpeg'},
    {id: 4, title: 'HALO10', condition: 'old', case: 'poor', photoURL: '/Users/tonykang/Hack Reactor SEI/GameStart/GameStart/assets/cory.jpeg'}])
  }, [])

  const renderItem = ({ item }) => (
    <ListItem bottomDivider containerStyle={styles.item}>
    <Avatar source={{uri: item.photoURL}} size={'large'} />
    <ListItem.Content>
      {<Text style={styles.item}>User: Gene Lo</Text>}
      {<Text style={styles.item}>Traded: Cory in the House</Text>}
      {<Text style={styles.item}>For: HALO 2</Text>}
      {<Text style={styles.item}>Trade Date: Some Date</Text>}
    </ListItem.Content>
  </ListItem>
  );

  return (
    <View style={styles.container}>
    <FlatList
      data={tradeData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  </View>
  )
}


