
import React, { useState, useEffect, useContext } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {globalStyles} from '../styles/global';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import Api from '../api/api';
import CreateActivity from './createActivity';
import {Context as AuthContext} from '../context/authContext';
import FloatingButton from '../components/floatButton';

export default function Home({navigation}) {
  var delta = 0.01;
  const [userPos, setUserPos] = useState({
    latitude:46.8,
    longitude:7.17,
  });
  const [posLoaded,setPosLoaded] = useState(false);
  const [activities,setActivities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [marker, setMarker] = useState(null);
  const [region, setRegion] = useState({
    latitude:46.8,
    longitude:7.17,
    latitudeDelta: delta,
    longitudeDelta: delta
  });

  
  const {state,dispatch} = useContext(AuthContext);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      return await Location.getCurrentPositionAsync({});
  }

  const pressHandler = (id) => {
    const activity = activities.filter(activity => activity.id === id);
    navigation.navigate('Details', {activity: activity[0]});
  };

  const requestLoc = async () => {
    getCurrentLocation().then(position =>   {
      //console.log(position)
      if(position){
        setUserPos({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: delta,
          longitudeDelta: delta
        })
      }
    });
  }

  const loadActivities = async () => {
    const allActivities = await Api.getAllActivities();
    setActivities(allActivities);
    //console.log(activities);
  }

  const addActivity = async (activity) => {
    //console.log(state);
    await Api.createActivity(state.id, activity, state.token).then(status => {
      if(status == 201){
        setModalVisible(false);
        setMarker(null);
        loadActivities();
      }else{
        throw new Error('Could not create activity');
      }
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadActivities();
    });
    return unsubscribe;
  },[navigation]);

  if (posLoaded){
    //console.log(userPos);
    const data = require('../app.json');
    return (
      <View style={globalStyles.container}>
            <View style={styles.map}>
              <MapView
                  style={{ flex: 1 }}
                  provider={PROVIDER_GOOGLE}
                  showsUserLocation={true}
                  initialRegion={{
                    latitude: userPos.latitude,
                    longitude: userPos.longitude,
                    latitudeDelta: delta,
                    longitudeDelta: delta
                  }}
                  region={region}
                  onPress={(e) => {
                    setMarker({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude, 
                    });
                    //console.log(marker)
                  }
                  }
              >
            {
              marker && 
              <Marker 
                coordinate={marker} 
                title='Create activity'
              >
                <Callout onPress={(e) => {
                  setModalVisible(true);
                  setRegion({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude, 
                    latitudeDelta: delta,
                    longitudeDelta: delta
                  });
                  }}>
                  <Text>Create activity</Text>
                </Callout>
              </Marker>
            }
            {activities.map(activity =>(
              <Marker
              key={activity.id}
              coordinate={activity.location}
              title={activity.sport}
              >
                <Callout onPress={() => pressHandler(activity.id)}>
                  <Text>{activity.sport}</Text>
                </Callout>
              </Marker>
            ))
            }
          </MapView>

        </View> 
        {<SafeAreaView  style={{flex:1, position:'absolute', top:'5%', left: '5%', width:'90%'}}>
              <GooglePlacesAutocomplete
                placeholder='Chercher un lieu'
                fetchDetails={true}
                GooglePlacesSearchQuery={{rankby:'distance'}}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  setRegion({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: delta,
                    longitudeDelta: delta
                  });
                }}
                query={{
                  key:process.env.PLACES_API,
                  language:'fr',
                  radius: 30000,
                  location: `${region.latitude}, ${region.longitude}`
                  }}
                />
            </SafeAreaView >}
        <FloatingButton pressHandler={() => setRegion({
          latitude: userPos.latitude,
          longitude: userPos.longitude,
          latitudeDelta: delta,
          longitudeDelta: delta
        })}/>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.modalView}>
            <View style={styles.modalIcon}>
              <MaterialIcons 
                name='close'
                size={24}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={styles.modalContent}>
              <CreateActivity addActivity={addActivity} activityLocation={marker}/>
            </View>
          </View>
        </Modal>
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
  },
  modalView: {
    flex:1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalIcon:{
    alignItems: "flex-start",
  },
  modalContent:{
    flex:1,
  }
});