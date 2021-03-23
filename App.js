import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "./routes/tab";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}