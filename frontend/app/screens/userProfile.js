import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {globalStyles} from '../styles/global';
import {Context as AuthContext} from '../context/authContext';

export default function UserProfile() {
  const {state, signout} = useContext(AuthContext);
  return (
    <View style={globalStyles.container}>
      <Text>This is the user profile page !</Text>
      <Button onPress={() => signout()} title='Se deconecter'/>
    </View>
  );
}