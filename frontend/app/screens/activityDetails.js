import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {globalStyles} from '../styles/global';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import moment from 'moment';
import UserItem from '../components/userItem';
import Api from '../api/api';
import {Context as AuthContext} from '../context/authContext';

export default function ActivityDetails({navigation, route}) {
  const {activity} = route.params;
  const [showParticipants, setShowParticipants] = useState(false);
  const {state,dispatch} = useContext(AuthContext);
  console.log(activity.participants);


  const Register = () => {
    let newActivity = {...activity};
    for(var i = 0; i < activity.participants.length; i++){
      console.log(activity.participants[i]);
      if(activity.participants[i].id == state.id){
        console.log('Already registered');
        return;
      }else{
        newActivity.participants = [...newActivity.participants, activity.participants[i].id];
      }
    }
    newActivity.participants = [...newActivity.participants, state.id];
    console.log(newActivity);
    Api.updateActivity(activity.id, newActivity, state.token);
  }


  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={globalStyles.container}>
        <View style={styles.activityTitle}>
          <Text style={styles.titleText}>{activity.sport}</Text>
        </View>
        <View style={styles.activityDetails}>
          <View style={styles.activityItem}>
            <Text style={styles.itemText}>Date</Text>
            <Text style={styles.itemText}>{moment(activity.date.day).format('YYYY-MM-DD')}</Text>
          </View>
          {
            activity.date.hour != '' ? 
            (<View style={styles.activityItem}>
              <Text style={styles.itemText}>Heure</Text> 
              <Text style={styles.itemText}>{activity.date.hour}</Text>
            </View>):
            (<View style={styles.activityItem}>
              <Text style={styles.itemText}>Journée entière</Text> 
            </View>)
          }
        </View>
        {
        <View style={styles.activityMap}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={false}
            scrollEnabled={false}
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
            <TouchableOpacity onPress={() => setShowParticipants(true)}>
              <Text style={styles.itemText}>{activity.participants.length} voir</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.itemText}>Prix</Text>
            {activity.price != '0' ? 
            (<Text style={styles.itemText}>{activity.price} .-</Text>) : 
            (<Text style={styles.itemText}>Gratuit</Text>) }
          </View>
          {activity.comments != '' && <View>
            <View style={styles.activityItem}>
              <Text style={styles.itemText}>Commentaires</Text></View>
            <View style={styles.activityItem}>
              <Text style={styles.itemText}>{activity.comments}</Text></View>
          </View>}
        </View>
      </ScrollView>
      <View>
          <Button title='Inscription' onPress={Register}/>
        </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={showParticipants}
        >
          <View style={globalStyles.modalView}>
            <View style={globalStyles.modalIcon}>
              <MaterialIcons 
                name='close'
                size={24}
                onPress={() => setShowParticipants(false)}
              />
            </View>
            <View style={globalStyles.modalContent}>
              <View style={{paddingBottom:50}}>
                <FlatList 
                  data={activity.participants}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({item}) => 

                    item.id == activity.creator.id ?
                    (<UserItem user={item} pressHandler={() => console.log(item)} marked={true}/>):
                    (<UserItem user={item} pressHandler={() => console.log(item)} marked={false}/>)
                  }
                />
              </View>
            </View>
          </View>
        </Modal>
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