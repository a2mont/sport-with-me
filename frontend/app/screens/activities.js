
import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import {globalStyles} from '../styles/global';
import ActivityItem from '../components/activityItem';
import FloatingButton from '../components/floatButton';

export default function Activities({navigation}) {
  const [activities,setActivities] = useState([
    {sport: 'basketball', date: '14-06-2021', key:'1'},
    {sport: 'football', date: '05-12-2021', key:'2'},
    {sport: 'tennis', date: '08-03-2021', key:'3'},
    {sport: 'bilboquet', date: '14-10-2021', key:'4'},
  ]);

  const pressHandler = (key) => {
    const activity = activities.filter(activity => activity.key == key);
    navigation.navigate('Details', {activity: activity[0]});
  };

  return (
    <View style={globalStyles.container}>
        <View>
          <FlatList 
            data={activities}
            renderItem={({item}) => (
              <ActivityItem activity={item} pressHandler={pressHandler} />
            )}
          />
        </View>
        <FloatingButton/>
    </View>
  );
}