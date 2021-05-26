import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';
import {globalStyles} from '../styles/global';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import moment from 'moment';

export default function ActivityDetails({navigation, route}) {
  const {activity} = route.params;
  //console.log(activity);
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={globalStyles.container}>
        <View style={styles.activityTitle}>
          <Text style={styles.titleText}>{activity.sport}</Text>
        </View>
        <View style={styles.activityDetails}>
          <View style={styles.activityItem}>
            <Text style={styles.itemText}>Date</Text>
            <Text style={styles.itemText}>{moment(activity.date).format('YYYY-MM-DD')}</Text>
          </View>
          {
            activity.time && 
            <View style={styles.activityItem}>
              <Text style={styles.itemText}>Heure</Text> 
              <Text style={styles.itemText}>{activity.time}</Text>
            </View>
          }
        </View>{
        <View style={styles.activityMap}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={false}
            initialRegion={{
              latitude: activity.location.latitude,
              longitude: activity.location.longitude,
              latitudeDelta:  0.01,
              longitudeDelta: 0.01}
            }
            onPress={(e) => {}}
          >
            <Marker key={0} coordinate={activity.location}></Marker>
          </MapView>
        </View>
        }
        <View style={styles.activityDetails}>
          <View style={styles.activityItem}>
            <Text style={styles.itemText}>Participants</Text>
            <Text style={styles.itemText}>X voir(hyperlien)</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.itemText}>Prix</Text>
            {activity.price ? 
            (<Text style={styles.itemText}>{activity.price}</Text>) : 
            (<Text style={styles.itemText}>Gratuit</Text>) }
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  activityTitle:{
      fontSize:40,
      alignItems:'center',
      padding:5,
      marginBottom:20,
  },
  activityDetails:{
    alignItems:'flex-start',
  },
  activityItem:{
    padding:10,
    margin:20,
    flexDirection:'row',
  },
  itemText:{
    fontSize:18,
    width:'50%'
  },
  titleText:{
    fontSize:25,
  },
  activityMap:{
    flex:1,
    padding:10,
    paddingBottom:100,
    paddingTop:100,
    margin:20,
    
  },
});