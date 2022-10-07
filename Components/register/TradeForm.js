import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Button, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';

//CAN CONDITIONALLY RENDER THE MODAL FORM ON TOP OF THE MODAL
  //TRADE NOW TOGGLES MODAL FORM
    //EXPANDS MODAL WINDOW SIZE WITH USER CARDS/CAROUSEL OF THEIR GAMES

    //if not enough room, we can definitely just navigate to a screen within this stack and pop it off afterwards
      //navigation.navigate('form') ==> submit form ==> pop screen off stack

//perhaps render this as a modal? similiar to the individual games modals
  //process could look like
  //click trade now
    //sends axios request games owned by REQUESTER + new column of consoleid transformed into actual console name
    //use that data to pass into tradeform
    //when rendering, we will create cards with the img/name of each game + console
    //after, user can decide which game to put against
    //onClick => the game will be decided/set for tradingGameID
    //onsubmit => axios post request to submit the trade via traderoute


    //is there a way to include gameid in modalData ?
      //if so, we can just include only modalData as our params
  //usergames will be the results of axios request to user games



  //handling favorites, can we add a button somewhere between line 164 - 173 of MapScreen? we have small 8bit heart icons that we can resize into appropriate sizes and attach an onPress to submit a quick post request to add it. We can conditionally render after to change heart to red.


export default function TradeForm ({setModalVisible, modalData, userGames}) {

  const [tradingGameID, setTradingGameID] = useState(0);

  const submitTrade = () => {
    axios.post('http://13.57.240.106:8000/api/trades', {
      partyGameID: placeholder, //either modalData.id OR pass in as props OR query filtering with item.user + item.title against getGamesTraded
      counterPartyGameID: placeholder
      //this would be retrieved through image render where each game card can be passed in props of their gameID
    })
      .then(() => {
        //should toggle modal closed
        setModalVisible(false)
      })
      .catch((err) => {
        console.log('could not submit trade')
      })
  }

  return (
    <Modal
      onRequestClose={() => setModalVisible(false)}>
        <View style={styles.opposingTrade}>
          <Image
            source={{uri: modalData.img}}
          />
        </View>

        <View style={styles.userTrade}>
          <View style={styles.gamesContainer}>
            {userGames.map(game => {
              /*
              usergames will be an array of objects with each individual game entry
              render each card with gameid, gametitle, photourl
              can either render a COMPONENT passing down game props to each
              or individually return these with the current game information on each

              touchableopacity can set state to prepare for submission
              when gameid state has been selected, card should reflect that it is selected game
              */
              return (
                <TouchableOpacity style={styles.button} onPress={() => tradingGameID(game.id)}>
                  <Image style={styles.image} source={{uri: game.photourl}}/>
                  <Text style={styles.cardText}> {game.gametitle} for {game.console} </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
    </Modal>
  )

}


const styles = StyleSheet.create({
  opposingTrade: {


  },
  userTrade: {


  },
  button: {
    //the container for each specific card

  },
  image: {
    //style added to each image

  },
  gamesContainer: {
    flexDirection: 'row',

  },
  cardText: {
    //style added to each card text

  }

})