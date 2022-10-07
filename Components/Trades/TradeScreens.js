import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, SafeAreaView, Text, View, TouchableWithoutFeedback, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Card, Button, Icon } from '@rneui/themed';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#121212',
    color: 'white',
    justifyContent: 'space-around',

  },

  item: {
    backgroundColor: '#121212',
    color: 'white',
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
    fontSize: 18
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
    fontSize: 18
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
    color: '#FFF',
    flex: 3
  },

  detailsCard: {
    flex: 6,
    backgroundColor: '#252525',
    borderWidth: 0,
    color: '#FFF'
  },
});

export const TradeList = ({ navigation }) => {
  const [trades, setTrades] = useState('incoming');
  const [incomingTrades, setIncomingTrades] = useState([]);
  const [outgoingTrades, setOutgoingTrades] = useState([]);
  const [locationData, setLocationData] = useState([]);


  const fetchData = () => {
    axios.get(`http://localhost:8000/api/trades/2`)
      .then((data) => {
        let inc = data.data.incoming.filter(trade => trade.trade_status.toLowerCase() === 'pending' || trade.trade_status.toLowerCase() === 'accepted');
        let out = data.data.outgoing.filter(trade => trade.trade_status.toLowerCase() === 'pending' || trade.trade_status.toLowerCase() === 'accepted');

        setIncomingTrades(inc)
        setOutgoingTrades(out)
      });
  }
  // need to define user who logged in
  useEffect(() => {
    fetchData();
      const willFocusSubscription = navigation.addListener('focus', () => {
        fetchData();
    });

    return willFocusSubscription;
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity>
    <ListItem bottomDivider containerStyle={styles.item} onPress={() => navigation.navigate('TradeView', {data: item, group: trades, trade_status: item.trade_status})}>
      <Avatar source={{uri: item.theirphotourl}} size={'large'} />
      <ListItem.Content>
        {trades === 'incoming' ? <Text style={styles.item}>User: {item.theirusername}</Text> : <Text style={styles.item}>Offering: {item.mygametitle}</Text>}
        {trades === 'incoming' ? <Text style={styles.item}>Offering: {item.theirgametitle}</Text> : <Text style={styles.item}>To User: {item.theirusername}</Text>}
        {trades === 'incoming' ? <Text style={styles.item}>For: {item.mygametitle}</Text> : <Text style={styles.item}>For: {item.theirgametitle}</Text>}
        {trades === 'incoming' ? <Text style={styles.item}>Status: {item.theirgamecondition}</Text> : <Text style={styles.item}>Status: {item.theirgamecondition}</Text>}
        {trades === 'incoming' ? <Text style={styles.item}>Trade Status: {item.trade_status}</Text> : <Text style={styles.item}>Trade Status: {item.trade_status}</Text>}
      </ListItem.Content>
      <ListItem.Chevron/>
    </ListItem>
    </TouchableOpacity>
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
          keyExtractor={(item) => item.id+item.theirgametitle+item.myid}
        /> : <Text style={styles.noItems}>You have no incoming offers</Text> :
        outgoingTrades.length ?
        <FlatList
        data={outgoingTrades}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + item.theirgametitle +item.theirid}
      /> : <Text style={styles.noItems}>You have no outgoing offers</Text>}
      </View>

      <StatusBar barStyle={'light-content'}/>
    </View>
  )
}

export const TradeView = ({ navigation, route }) => {
  const [tradeData, setTradeData] = useState([]);
  const [tradeGroup, setTradeGroup] = useState(route.params.group);
  const [tradeStatus, setTradeStatus] = useState(route.params.trade_status)

  useEffect(() => {
    setTradeData(route.params.data)
    setTradeGroup(route.params.group)
  }, [])

  const openMessaging = async (conversationId=null) => {
    if(conversationId === null){
      conversationId = await axios.get(`http://localhost:8000/api/messages/conversations/id/${tradeData.id}`)
      console.log('ALAJSDF:LKASJDF:ALJSDF:LAJDSFL:AJS:JDFL');
      console.log(conversationId);
    }
    console.log('FFFFFFFFFFFFFFFFFFF');
    console.log(tradeData)
    console.log(conversationId);
    navigation.navigate('Messaging', {conversationId: conversationId, user: tradeData.myusername, otherUser : tradeData.theirusername, profilepic: tradeData.theirprofilepic});
  };

  const createConversation = () => {
     axios.post('http://localhost:8000/api/messages/conversations', {tradeId : tradeData.id})
     .then((response) => {
      console.log(response.data.id);
      openMessaging(response.data.id)
     });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tradingItem}>
      <Card containerStyle={styles.tradeCard}>
          <Card.Title style={{color: 'white'}}>THEIR GAME: {tradeData.theirgametitle}</Card.Title>
          <Card.Divider color='white'/>
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri: tradeData.theirphotourl
            }}
            onPress={() => navigation.navigate('TradeDetails', {id: tradeData.theirgameid, gametitle: tradeData.theirgametitle,
              photourl: tradeData.theirphotourl, profilepic: tradeData.theirprofilepic, gamecondition: tradeData.theirgamecondition,
              casestatus: tradeData.theircasestatus, username: tradeData.theirusername})}
          />
          <Text style={{color: 'white', alignSelf: 'center', paddingTop: 10}}>Tap for details</Text>
        </Card>
      </View>
      <View style={styles.decision}>
          {tradeStatus === 'accepted' ?
          <React.Fragment>
            <Button containerStyle={styles.decisionItem} title="Message" color='#00B4d8'
            onPress={() => navigation.navigate('Messaging', {data: tradeData})}/>
            <Button
              containerStyle={styles.decisionItem}
              title="Cancel"
              color='error'
              onPress={() => {
              axios.put('http://localhost:8000/api/trades', {tradeId: tradeData.id, status: 'cancelled'})
                .then(() => {
                  {navigation.pop()}
                });
              }}/>
          </React.Fragment>
          :
          tradeGroup === 'incoming' ?
          <React.Fragment>
            <Button containerStyle={styles.decisionItem} title="Accept" color='#00B4d8'
              onPress={() => {
                axios.put('http://localhost:8000/api/trades', {tradeId: tradeData.id, status: 'accepted'})
                  .then(() => {
                    navigation.navigate('Messaging', {data: tradeData})
                  });
              }}
            />
            <Button
              containerStyle={styles.decisionItem}
              title="Deny"
              color='error'
              onPress={() => {
                axios.put('http://localhost:8000/api/trades', {tradeId: tradeData.id, status: 'rejected'})
                  .then(() => {
                    {navigation.pop()}
                  });
              }}/>
          </React.Fragment> :
          <Button
            containerStyle={styles.decisionItem}
            title="Cancel Trade Offer"
            color='error'
            onPress={() => {
              axios.put('http://localhost:8000/api/trades', {tradeId: tradeData.id, status: 'cancelled'})
                .then(() => {
                  navigation.navigate('TradeDetails', {id: tradeData.mygameid, gametitle: tradeData.mygametitle,
                    photourl: tradeData.myphotourl, profilepic: tradeData.myprofilepic, gamecondition: tradeData.mygamecondition,
                    casestatus: tradeData.mycasestatus, username: tradeData.myusername})
                });
            }}/>
          }
      </View>
      <View style={styles.tradingItem}>
      <Card containerStyle={styles.tradeCard}>
          <Card.Title style={{color: 'white'}}>YOUR GAME: {tradeData.mygametitle}</Card.Title>
          <Card.Divider color='white'/>
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri: tradeData.myphotourl
            }}
            onPress={() => navigation.navigate('TradeDetails', {id: tradeData.mygameid, gametitle: tradeData.mygametitle,
              photourl: tradeData.myphotourl, profilepic: tradeData.myprofilepic, gamecondition: tradeData.mygamecondition,
              casestatus: tradeData.mycasestatus, username: tradeData.myusername})}
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
    setGameData(route.params)
  }, [])

  return (
    <View style={styles.container}>
        <Card containerStyle={styles.detailsCard} wrapperStyle={styles.detailsCard}>
          <Card.Title style={{ marginBottom: 10, color: 'white', alignSelf: 'center' }}>{gameData.gametitle}</Card.Title>
          <Card.Image
            style={{ padding: 0, height: 355 }}
            source={{uri: gameData.photourl }}
          />
          <Text style={{ marginBottom: 10, marginTop: 10, color: 'white', alignSelf: 'center' }}>
              Game Condition: {gameData.gamecondition}
          </Text>
          <Text style={{  marginBottom: 10, marginTop: 10, color: 'white', alignSelf: 'center' }}>
              Case Condition: {gameData.casestatus}
          </Text>
          <Card.Divider />
          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title={`${gameData.username}'s Profile`}
          />
         <Avatar
            containerStyle={{marginTop: 20, alignSelf: 'center', borderColor: 'white', borderWidth: 1}}
            size={120}
            rounded
            source={{uri: gameData.profilepic}}
            key={gameData.id}
            />
        </Card>
        <View style={styles.navigationBar}>
        <Text>Navigation Bar</Text>
      </View>
    </View>
  )
}

export const TradeHistory = ({ navigation, route }) => {
  const [tradeData, setTradeData] = useState([]);

  // Need to connect to database and refine data to use from get request
  useEffect(() => {
    axios.get(`http://localhost:8000/api/trades/2`)
      .then((data) => {
        let inc = data.data.incoming.filter(trade => trade.trade_status.toLowerCase() === 'complete');
        let out = data.data.outgoing.filter(trade => trade.trade_status.toLowerCase() === 'complete' && trade.theirownerid === 2);
        setTradeData([...inc, ...out])
      })
  }, [])

  const renderItem = ({ item }) => (
    <ListItem bottomDivider containerStyle={styles.item}>
    <Avatar source={{uri: item.theirphotourl}} size={'large'} />
    <ListItem.Content>
      {<Text style={styles.item}>User: {item.theirusername}</Text>}
      {<Text style={styles.item}>Traded: {item.mygametitle}</Text>}
      {<Text style={styles.item}>For Your: {item.theirgametitle}</Text>}
      {<Text style={styles.item}>Traded: {item.created_at.toString().slice(0, 10)}</Text>}
    </ListItem.Content>
  </ListItem>
  );

  return (
    <View style={styles.container}>
    <FlatList
      data={tradeData}
      renderItem={renderItem}
      keyExtractor={(item) => item.myid + item.theirgametitle + item.theirid + item.id}
    />
  </View>
  )
}


