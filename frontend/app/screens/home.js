
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/global';
import FloatingButton from '../components/floatButton';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Api from '../api/api';

export default function Home({navigation}) {
  const [userPos, setUserPos] = useState({
    location:{
      latitude:46.6,
      longitude:7.1,
    }
  });
  const [posLoaded,setPosLoaded] = useState(false);
  const [activities,setActivities] = useState([
    //{sport: 'basketball', date: '2021-06-14', location: {latitude:46.5, longitude:7.14}, key:'1'},
    //{sport: 'football', date: '2021-05-12', location: {latitude:46.806403, longitude:7.153656}, key:'2'},
    //{sport: 'tennis', date: '2021-08-03', location: {latitude:47.9, longitude:7.1}, key:'3'},
    //{sport: 'bilboquet', date: '2021-14-10',location: {latitude:46.7, longitude:7.16}, key:'4'},
  ]);

  const getCurrentLocation = () => {
    return new Promise((resolve,reject) => {
      navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
  }

  const pressHandler = (key) => {
    const activity = activities.filter(activity => activity.key == key);
    navigation.navigate('Details', {activity: activity[0]});
  };

  const requestLoc = async () => {
    getCurrentLocation().then(position =>   {
      if(position){
        setUserPos({
          location:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        })
      }
    });
  }

  const loadActivities = async () => {
    const allActivities = await Api.getAllActivities();
    setActivities(allActivities);
    //console.log(activities);
  }

  useEffect(() => {
    loadActivities()
  }, []);

  if (posLoaded){
    return (
      <View style={globalStyles.container}>
        <View style={styles.map}>
        <MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            initialRegion={{
              latitude: userPos.location.latitude,
              longitude: userPos.location.longitude,
              latitudeDelta: 0.0002,
              longitudeDelta: 0.0002}
            }
        >
          {activities.map(activity =>(
            <Marker
            key={activity.id}
            coordinate={activity.location}
            title={activity.sport}
            >
              <Callout onPress={() => pressHandler(activity.key)}>
                <Text>{activity.sport}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
        </View> 
        <FloatingButton pressHandler={() => console.log('button pressed')}/>
      </View>
    );
  }else{
    return(
      <AppLoading
        startAsync={requestLoc}
        onFinish={() => setPosLoaded(true)}
        onError={() => console.log('Error')}
      />
    );
  }

 
}

const styles = StyleSheet.create({
  map:{
    flex:1,
  }
});