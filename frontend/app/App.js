import { StatusBar } from 'expo-status-bar';
import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import {Provider as AuthProvider} from './context/authContext';
import {Context as AuthContext} from './context/authContext';

import StartNavigator from './routes/startStack';


function App({navigation}) {
  const state = useContext(AuthContext);
  console.log(state);
  return (
    <NavigationContainer>
      <StartNavigator userToken={null}/>
    </NavigationContainer>
  );
}

export default () => {
  return(
    <AuthProvider>
        <App />
    </AuthProvider>
  );
}