import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {globalStyles} from '../styles/global';

export default function UserProfile() {
  return (
    <View style={globalStyles.container}>
      <Text>This is the user profile page !</Text>
    </View>
  );
}