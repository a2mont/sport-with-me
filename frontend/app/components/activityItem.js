
import React from 'react'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { colors } from '../styles/global';
import moment from 'moment/min/moment-with-locales';

export default function ActivityItem({ pressHandler, activity }) {
  return (
    <TouchableOpacity onPress={() => pressHandler(activity.id)}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{activity.sport}</Text>
        <Text style={styles.descriptionText}>
          Le {moment(activity.date.day).format('DD MMMM YYYY')} 
          , {activity.participants.length} {activity.participants.length > 1 ? ('inscrits'):('inscrit')}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textContainer:{
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginVertical:2,
    borderColor: colors.buttonsBackground,
    borderWidth: 1,
    borderRadius: 1,
    borderRadius: 10,
    backgroundColor:colors.textHighlight,
    justifyContent:'space-between',
    alignItems:'flex-start'
  },
  titleText:{
    marginHorizontal:5,
    fontSize:16,
    color: colors.textDark,
    fontWeight:'bold'
  },
  descriptionText:{
    marginHorizontal:5,
    fontSize:13,
    color: colors.textDark,
    alignSelf:'flex-end'
  },
});