
import React from 'react'
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function ActivityItem({ pressHandler, activity }) {
  return (
    <TouchableOpacity onPress={() => pressHandler(activity.key)}>
      <Text style={styles.item}>{activity.sport}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
  }
});