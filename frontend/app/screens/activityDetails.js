import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import {colors, globalStyles} from '../styles/global';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import moment from 'moment/min/moment-with-locales';
moment.locale('fr');
import UserItem from '../components/userItem';
import Api from '../api/api';
import CustomButton from '../components/customButton';
import Message from '../components/message';
import {Context as AuthContext} from '../context/authContext';

export default function ActivityDetails({navigation, route}) {
  const {activity} = route.params;
  const [activityData, setActivityData] = useState(activity);
  const [showParticipants, setShowParticipants] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState('');
  const {state,dispatch} = useContext(AuthContext);

  
  var timeout = null;

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (timeout != null)
        clearTimeout(timeout);
    });

    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    registrationCheck();
  },[registered]);

  const registrationCheck = () => {
    for(var i = 0; i < activityData.participants.length; i++){
      if(activityData.participants[i].id == state.id){
        setRegistered(true);
        return true;
      }
    }
    setRegistered(false);
    return false;
  }

  const register = async () => {
    let newActivity = {...activityData};
    newActivity.participants = [];
    for(var i = 0; i < activityData.participants.length; i++){
      if(activityData.participants[i].id == state.id){
        console.log('Already registered');
        return;
      }else{
        newActivity.participants = [...newActivity.participants, activityData.participants[i].id];
      }
    }
    newActivity.participants = [...newActivity.participants, parseInt(state.id)];
    var response = await Api.updateActivity(activityData.id, newActivity, state.token);
    if(response != null){
      setMessage('Activité mise à jour');
      setActivityData(response);
      setRegistered(true);
    }else{
      setMessage("Erreur dans l'inscription...");
    }
    timeout = setTimeout(() => {
      setMessage('');}, 1500);
  }

  const unregister = async() => {
    if(activityData.creator.id == state.id){
      setMessage("L'organisateur d'une activité ne peut pas s'en désinscrire !");
      timeout = setTimeout(() => {
        setMessage('');}, 1500);
      return;
    }
    var newActivity = {...activityData};
    newActivity.participants = [];
    for(var i = 0; i < activityData.participants.length; i++){
      if(activityData.participants[i].id != state.id){
        newActivity.participants = [...newActivity.participants, activityData.participants[i].id];
      }
    }
    var response = await Api.updateActivity(activityData.id, newActivity, state.token);
    if(response != null){
      setMessage('Activité mise à jour');
      setActivityData(response);
      setRegistered(false);
    }else{
      setMessage("Erreur dans la désinscription...");
    }
    timeout = setTimeout(() => {
      setMessage('');}, 1500);
  }

  const modalPressHandler = (id) => {
    if(id == state.id)
        unregister();
  }

  const deleteActivity = async () => {
    await Api.deleteActivity(activityData.id, state.token);
    navigation.goBack();
  }

  const createDeleteAlert = () => 
    Alert.alert(
      "Supprimer l'activité ?",
      "Appuyer sur supprimer effacera définitivement l'activité.",
      [
        {
          text: 'Annuler',
          style:'cancel',
        },
        {
          text:'Supprimer',
          onPress: () => deleteActivity(),
        }
      ]
    );
  return (
    <SafeAreaView style={globalStyles.container}>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.activityTitle}>
          <Text style={globalStyles.titleText}>{activityData.sport}</Text>
        </View>
        <View style={styles.activityDetails}>
          <View style={styles.activityItem}>
            <View>
              
            <Text style={styles.itemLabel}>Date</Text>
            </View>
            <View>
            <Text style={styles.itemData}>{moment(activityData.date.day).format('DD MMMM YYYY')}</Text>

            </View>
          </View>
          {
            activityData.date.hour != '' ? 
            (<View style={styles.activityItem}>
              <Text style={styles.itemLabel}>Heure</Text> 
              <Text style={styles.itemData}>{activityData.date.hour}</Text>
            </View>):
            (<View style={styles.activityItem}>
              <Text style={styles.itemLabel}>Journée entière</Text> 
            </View>)
          }
        </View>
        <View style={styles.activityDetails}>
          <View style={styles.activityItem}>
            <Text style={styles.itemLabel}>Prix</Text>
            {activityData.price != '0' ? 
            (<Text style={styles.itemData}>{activityData.price} .-</Text>) : 
            (<Text style={styles.itemLabel}>Gratuit</Text>) }
          </View>
        </View>
          
        <View style={styles.activityDetails}>
          <View style={styles.activityItem}>
            <Text style={styles.itemLabel}>Participants</Text>
            <TouchableOpacity onPress={() => setShowParticipants(true)}>
              <Text style={styles.itemData}>{activityData.participants.length}, <Text style={{fontStyle:'italic', textDecorationLine:'underline'}}>liste</Text></Text>
            </TouchableOpacity>
          </View>
          {activityData.comments != '' && <View>
            <View style={styles.comments}>
                <Text style={[styles.commentsItem, {fontWeight:'bold'}]}>Commentaires</Text>
                <Text style={styles.commentsItem}>{activityData.comments}</Text>
            </View>
          </View>}
        </View>
        <View style={styles.activityMap}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={false}
            scrollEnabled={false}
            initialRegion={{
              latitude: activityData.location.latitude,
              longitude: activityData.location.longitude,
              latitudeDelta:  0.01,
              longitudeDelta: 0.01}
            }
            onPress={(e) => {}}
          >
            <Marker key={0} coordinate={activityData.location}></Marker>
          </MapView>
        </View>
        {state.id == activityData.creator.id &&
          <TouchableOpacity style={{marginVertical:20}} onPress={createDeleteAlert}>
            <Text style={[globalStyles.errorText, {alignSelf:'center', fontSize:20, fontWeight:'normal'}]}>Supprimer l'activité</Text>
          </TouchableOpacity>
        }
      </ScrollView>

      <SafeAreaView >
        {!registered ? 
          (<CustomButton 
            style={{
              backgroundColor: colors.buttonsBackgroundLight,
              padding:10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth:1.5,
              borderColor: colors.textHighlight
            }} 
            title='Inscription' 
            onPress={register}/>):
          (<CustomButton 
            style={{
              backgroundColor: colors.inactiveButton,
              padding:10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            textStyle={{color: colors.textLight, fontSize:16}}
            title='Déjà inscrit' 
            onPress={unregister}/>)}
          
      </SafeAreaView>
      <Modal
          animationType="slide"
          transparent={true}
          visible={showParticipants}
        >
          <View style={globalStyles.modalView}>
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
                  onPress={() => setShowParticipants(false)}
                />
              </View>
            </View>
            <View style={globalStyles.modalContent}>
              <View >
                <FlatList 
                  data={activityData.participants}
                  keyExtractor={(item, index) => item.id.toString()}
                  renderItem={({item}) => 
                    <UserItem user={item} pressHandler={() => modalPressHandler(item.id)} marked={item.id == activityData.creator.id} creator={activityData.creator.id}/>
                  }
                />
              </View>
            </View>
            {message != '' && <Message text={message}/>}
          </View>
        </Modal>
        {message != '' && <Message text={message}/>}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  scrollContainer:{
    alignSelf:'center',
    flexDirection:'column',
    width:'100%',
  },
  activityTitle:{
      fontSize:40,
      padding:5,
      marginBottom:20,
      alignSelf:'center',
  },
  activityDetails:{
    flexDirection:'column',
    marginHorizontal:'6%',
  },
  activityItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical: 15,

  },
  itemData:{
    fontSize:18,
    margin: 5,
    color:colors.textLight,
  },
  itemLabel:{
    fontSize:18,
    margin: 5,
    color:colors.textLight,
    fontWeight:'bold',
  },
  comments:{
    flexDirection:'column',
    marginVertical: 10,
  },
  commentsItem:{
    fontSize:18,
    margin: 5,
    color:colors.textLight,
  },
  activityMap:{
    flex:1,
    padding:10,
    paddingBottom:100,
    paddingTop:100,
    margin:20,
    
  },
});