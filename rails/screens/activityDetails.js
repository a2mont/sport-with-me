import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {globalStyles} from '../styles/global';

export default function ActivityDetails({navigation}) {
  return (
    <View style={globalStyles.container}>
      <Text>This is the activity page !</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}