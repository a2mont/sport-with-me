import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {globalStyles} from '../styles/global';

export default function About() {
  return (
    <View style={globalStyles.container}>
      <Text>This is the about page !</Text>
    </View>
  );
}