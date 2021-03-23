
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {globalStyles} from '../styles/global';

export default function Activities({navigation}) {
  return (
    <View style={globalStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <Text>This is the Activities page !</Text>
      </TouchableOpacity>  
    </View>
  );
}