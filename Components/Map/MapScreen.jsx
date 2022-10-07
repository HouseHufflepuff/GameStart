import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Button,
  StatusBar
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, CalloutSubview } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { users } from './mapHelpers/users';
import MapStyle from './mapHelpers/mapStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import axios from 'axios';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.6;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function MapScreen3() {
  const [usersData, setUsersData] = useState();
  const [currentUsers, setCurrentUsers] = useState();
  const [modalData, setModalData] = useState({
    title: '',
    user: '',
    console: '',
    img: '',
  });

  useEffect(() => {
    getUsersData();
  }, [])



  const [modalVisible, setModalVisible] = useState(false);

  const [region, setRegion] = useState({
    latitude: 33.750769,
    longitude: -117.825262,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })



  const getUsersData = async () => {
    try {
      let response = await axios.get('http://13.57.240.106:8000/api/locations');
      if (response.data) console.log('yes');
      setCurrentUsers(response.data);
      setUsersData(response.data);
      return;
    } catch (error) {
      console.log('err', error);
    }
  }

  const [mapState, setMapState] = useState({
    categories: [
      {
        name: 'Playstation 5',
        consoleIcon: 'sony-playstation',
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name="sony-playstation" size={18} />,
      },
      {
        name: 'Xbox One',
        consoleIcon: 'microsoft-xbox',
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name="microsoft-xbox" size={15} />,
      },
      {
        name: 'Nintendo Switch',
        consoleIcon: 'nintendo-switch',
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name="nintendo-switch" size={15} />,
      },
      {
        name: 'Nintendo Wii U',
        consoleIcon: 'nintendo-wiiu',
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name="nintendo-wiiu" size={15} />,
      },
      {
        name: 'Nintendo DS',
        consoleIcon: 'nintendo-game-boy',
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name="nintendo-game-boy" size={15} />,
      },
      {
        name: 'All consoles',
        consoleIcon: 'back',
        icon: <AntDesign style={styles.chipsIcon} name="back" size={15} />,
      },
    ],
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  });

  const consoleFilter = (consoleName) => {
    if (consoleName === 'back') {
      setCurrentUsers(usersData);
    } else {
      let filter = usersData.filter((item) => item.consoleicon === consoleName);
      setCurrentUsers(filter);
    }
  }



  const _map = useRef(null);
  const _scrollView = useRef(null);

  const toggleModal = (title, state, name, lastname, user, console, img) => {

    setModalData({
      title,
      state,
      name,
      lastname,
      user,
      console,
      img,
    })

    setModalVisible(!modalVisible);


  };


  let findDuplicates = [];


  return (
    <View style={styles.container}>


      <MapView
        ref={_map}
        style={styles.container}
        customMapStyle={MapStyle[0]}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={region}
      >

        {/* Markers in map */}
        {currentUsers &&
          currentUsers.map((item, index) => {
            if (findDuplicates.includes(item.longitude)) {
              return;
            } else {
              findDuplicates.push(item.longitude);
              return (
                <Marker
                  key={index}
                  coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                  pinColor='green'
                  onPress={() => toggleModal(item.gametitle, item.gamecondition, item.first_name, item.last_name, item.username, item.consoleicon, item.photourl)}
                >

                  <View style={{ backgroundColor: "green", padding: 10, borderRadius: '5%' }}>
                    <Text style={{ color: 'white' }}>{item.gametitle}</Text>
                    <Text style={{ color: '#D3D3D3', textAlign: 'center' }}>{item.gamecondition === null ? 'Fair' : item.gamecondition}</Text>



                    <Modal animationType={'slide'} visible={modalVisible} transparent={true} onRequestClose={() => { setModalVisible(false) }}>
                      <TouchableOpacity
                        style={styles.container}
                        activeOpacity={1}
                        onPressOut={() => { setModalVisible(false) }}
                      >
                        <View style={styles.modalContainer}>
                          <View style={styles.card}>
                            <Image
                              source={{ uri: modalData.img }}
                              style={styles.cardImage}
                              resizeMode='cover' />
                            <View style={styles.textContent}>
                              <Text numberOfLines={1} style={styles.cardTitle}>{modalData.title}</Text>
                              <Text numberOfLines={1} style={styles.cardDescription}>{modalData.name} {modalData.lastname} "{modalData.user}"</Text>
                              <MaterialCommunityIcons style={styles.chipsIcon} name={modalData.console} size={18} />
                              <View style={styles.button}>
                                <TouchableOpacity
                                  onPress={() => { }}
                                  style={[styles.tradeContainer, {
                                    borderColor: 'green',
                                    borderWidth: 1
                                  }]}>
                                  <Text style={[styles.tradeText, {
                                    color: 'green'
                                  }]}>Trade Now</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Modal>
                  </View>
                </Marker>

              )


            }


          })

        }




      </MapView>

      <View style={styles.searchBox}>
        <TextInput placeholder='Search here' placeholderTextColor='#000' autoCapitalize='none' style={{ flex: 1, padding: 0 }} />
        <Ionicons name='ios-search' size={20} />
      </View>

      {/* console scrollview */}
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 20
        }}
        contentContainerStyle={{
          paddingRight: 0
        }}
      >
        {mapState.categories.map((item, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem} onPress={() => consoleFilter(item.consoleIcon)}>
            {item.icon}
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      <StatusBar barStyle={'light-content'}/>

    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  searchBox: {
    position: 'absolute',
    marginTop: 60,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: 110,
    paddingHorizontal: 10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 10,
    marginTop: 3,
    marginHorizontal: 8,
    height: 36,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    bottom: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 30,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardImage: {
    flex: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  tradeContainer: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  tradeText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});