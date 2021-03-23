import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {globalStyles} from '../styles/global';

export default function ActivityDetails({navigation, route}) {
  const {activity} = route.params;
  return (
    <View style={globalStyles.container}>
      <View>
        <Text>This is the activity page !</Text>
        <Text>{activity.sport}</Text>
      </View>
      <View>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    </View>
  );
}