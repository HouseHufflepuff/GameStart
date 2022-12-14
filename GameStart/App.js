import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Main from './components/Main.jsx';
// import CreateAccount from './components/register/CreateAccount.js';
// import RegisterConsoles from './components/register/RegisterConsoles.js';
// import ProfilePicture from './components/register/ProfilePicture.js';
// import RegisterGames from './components/register/RegisterGames.js';
import GameDetails from './GameDetails.js';
import Search from './Search.js'

function App() {
  const[gameId, setGameId] = useState('635220')

  // const Stack = createNativeStackNavigator();

  return (
    // <RegisterGames/>
    // <Search />
    <GameDetails gameId={gameId}/>
  //   <NavigationContainer>
  //     <Stack.Navigator screenOptions={{ headerShown: false }}>
  //       <Stack.Screen options={{ headerShown: false }} name="Login" component={Main} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  );
}

export default App;
