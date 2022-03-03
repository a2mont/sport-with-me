
import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {globalStyles, colors} from '../styles/global';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {PLACES_API} from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import Api from '../api/api';
import CreateActivity from './createActivity';
import {Context as AuthContext} from '../context/authContext';
import FloatingButton from '../components/floatButton';
import MarkerCallout from '../components/markerCallout';

export default function Home({navigation}) {
  const [delta, setDelta] = useState(0.01);
  const [userPos, setUserPos] = useState({
    latitude:46.8,
    longitude:7.17,
  });
  const [posLoaded,setPosLoaded] = useState(false);
  const [activities,setActivities] = useState([]);
  const [update,setUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [marker, setMarker] = useState(null);
  const [region, setRegion] = useState({
    latitude:46.8,
    longitude:7.17,
    latitudeDelta: delta,
    longitudeDelta: delta
  });

  const {state,dispatch} = useContext(AuthContext);

  const mapRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    if (mounted)
      loadActivities();
    return () => {mounted = false;}
  },[update]);
  useEffect(() => {
    let mounted = true;
    if (mounted)
      requestLoc();
    return () => {mounted = false;}
  },[posLoaded]);
  useEffect(() => {
    let mounted = true;
    if (mounted)
      setRegion({
        latitude: userPos.latitude,
        longitude: userPos.longitude,
        latitudeDelta: delta,
        longitudeDelta: delta
      });
    return () => {mounted = false;}
  }, [userPos]);

  useEffect(() => {
    let mounted = true;
    if (mounted)
      mapRef.current.animateToRegion(region, 0.5 * 1000);
    return () => {mounted = false;}
  },[region]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => loadActivities());

    return unsubscribe;
  }, [navigation]);

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
    if(!posLoaded){
      getCurrentLocation().then(position => {
        if(position){
          setUserPos({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setPosLoaded(true);
        }
      });
    }
    
  }

  const loadActivities = async () => {
    const allActivities = await Api.getAllActivities();
    setActivities(allActivities);
  }

  const addActivity = async (activity) => {
    await Api.createActivity(state.id, activity, state.token).then(status => {
      if(status == 201){
        setModalVisible(false);
        setMarker(null);
        setUpdate(!update);
      }else{
        throw new Error('Could not create activity');
      }
    });
  }

  

return (
    <View style={globalStyles.container}>
          <View style={styles.map}>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={region}
                onPress={(e) => {
                  setMarker({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude, 
                  });
                  setRegion({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude, 
                    latitudeDelta: delta,
                    longitudeDelta: delta
                  });
                }
                }
                showsMyLocationButton={false}
            >
          {
            marker && 
            <Marker 
              coordinate={marker} 
              title='Create activity'
              pinColor='blue'
            >
              <Callout onPress={(e) => {
                setModalVisible(true);
                setRegion({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude, 
                  latitudeDelta: delta,
                  longitudeDelta: delta
                });
                }}
                tooltip={true}
                >
                  <MarkerCallout textComponent={<Text style={globalStyles.baseText}>Nouvelle activité</Text>}/>
              </Callout>
            </Marker>
          }
          {activities.map(activity =>{
          if((Math.abs(activity.location.latitude - region.latitude) < delta ) && (Math.abs(activity.location.longitude - region.longitude) < delta))
          
            {return(
            <Marker
              key={activity.id}
              coordinate={activity.location}
              title={activity.sport}
            >
              <Callout onPress={() => pressHandler(activity.id)} tooltip>
                <MarkerCallout textComponent={
                  <View>
                    <Text style={[globalStyles.baseText, {fontSize:17, fontWeight:'bold'}]}>{activity.sport}</Text>  
                    <Text style={globalStyles.baseText}>{activity.participants.length} {activity.participants.length > 1 ? ('inscrits'):('inscrit')} </Text>
                  </View>
                  
                }/>
              </Callout>
            </Marker>
          )}})
          }
        </MapView>

      </View> 
      {<SafeAreaView  style={{flex:1, position:'absolute', top:'5%', left: '5%', width:'90%'}}>
            <GooglePlacesAutocomplete
              placeholder='Chercher un lieu'
              fetchDetails={true}
              GooglePlacesSearchQuery={{rankby:'distance'}}
              onPress={(data, details = null) => {
                setRegion({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: delta,
                  longitudeDelta: delta
                });
              }}
              query={{
                key:PLACES_API,
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
        <View style={{flex:1, marginTop:50}}>
          <View
              style={{
                flex:0.1,
                backgroundColor:colors.background,
                borderTopLeftRadius:100,
                borderTopRightRadius: 100,
                width: 150,
                height: 80,
                alignSelf:'center'
              }}
            >
              <View style={[globalStyles.modalIcon, {alignSelf:'center'}]}>
              <Ionicons 
                name='remove-outline'
                size={60}
                color={colors.buttonsBackgroundLight}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
            
          <View style={globalStyles.modalView}>
            
            <View style={globalStyles.modalContent}>
              <CreateActivity addActivity={addActivity} activityLocation={marker}/>
            </View>
          </View>
        </View>
        
      </Modal>
    </View>
  );


 
}

const styles = StyleSheet.create({
  map:{
    flex:1,
  },
});