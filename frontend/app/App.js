import { StatusBar } from 'expo-status-bar';
import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import {Provider as AuthProvider} from './context/authContext';

import StartNavigator from './routes/startStack';


export default function App({navigation}) {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StartNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

