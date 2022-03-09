import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import {globalStyles, colors} from '../styles/global';
import {AntDesign} from '@expo/vector-icons';
import {Context as AuthContext} from '../context/authContext';
import CustomButton from '../components/customButton';
import Message from '../components/message';
import Api from '../api/api';

export default function UserProfile({navigation}) {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState('');
  const {state, signout} = useContext(AuthContext);


  useEffect(() => {
    let mounted = true;
    if (mounted)
      loadInfos();
    return () => {mounted = false;}
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => loadInfos());

    return unsubscribe;
  }, [navigation]);

  const loadInfos = async () => {
    const userInfos = await Api.getUserInfos(state.id);
    const userActivities = await Api.getUserActivities(state.id);
    setUser(userInfos);
    setActivities(userActivities);
  }

  const deleteActivities = async () => {
    for (let i = 0; i < activities.length; i++) {
      
      await Api.deleteActivity(activities[i].id, state.token);
    }
    setActivities([]);
    setMessage("Activités supprimées");
    setTimeout(() => {
      setMessage('');}, 1500);
  }

  const createActivitiesAlert = () => 
    Alert.alert(
      "Supprimer vos activités ?",
      "Appuyer sur supprimer effacera définitivement vos activités.",
      [
        {
          text: 'Annuler',
          style:'cancel',
        },
        {
          text:'Supprimer',
          onPress: () => deleteActivities(),
        }
      ]
    );

  const deleteAccount = async () => {
    await deleteActivities();
    const success = await Api.deleteUser(state.id, state.token);
    if (success == 204)
      signout();
    else
      setMessage("Suppression impossible");
    setTimeout(() => {
      setMessage('');}, 1500);

  }

  const createUserAlert = () => 
    Alert.alert(
      "Supprimer votre compte ?",
      "Appuyer sur supprimer effacera définitivement votre compte ainsi que vos activités.",
      [
        {
          text: 'Annuler',
          style:'cancel',
        },
        {
          text:'Supprimer',
          onPress: () => deleteAccount(),
        }
      ]
    );

  return (
    <View style={globalStyles.container}>
      {user && 
        <View style={{alignItems:'center', justifyContent:'center', marginVertical:70}}>
          <View style={{backgroundColor:colors.buttonsBackground, borderRadius:50, padding:15, marginVertical:10,}}>
            <AntDesign name='user' size={55} color={colors.textLight}/>
          </View>
          <Text style={globalStyles.titleText}>{user.name.firstname} {user.name.lastname}</Text>
          <View style={styles.userItems}>
            <Text style={styles.item}>Email</Text>
            <Text style={styles.item}>{user.email}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('About')} style={{marginTop:'30%', marginBottom:'10%'}}>
            <Text style={[globalStyles.baseText, {fontSize:18,fontStyle:'italic',}]}>Comment utiliser Pelops ?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={createActivitiesAlert} style={{marginVertical:10}}>
            <Text style={[globalStyles.errorText, {fontSize:18, fontWeight:'normal'}]}>Supprimer mes activités</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={createUserAlert} style={{marginVertical:10}}>
            <Text style={[globalStyles.errorText, {fontSize:18, fontWeight:'normal'}]}>Supprimer mon compte</Text>
          </TouchableOpacity>
        </View>
      }
      <View style={{position:'absolute', alignSelf:'center', bottom:'3%'}}>
        <CustomButton onPress={() => signout()} title='Se déconnecter' textStyle={{fontSize:17,color: colors.textDark,}}/>
      </View>
      <View style={{position:'absolute', alignSelf:'center', bottom:'15%'}}>
        {message != '' && <Message text={message}/>}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize:22,
    margin:20,
  },
  userItems:{
    justifyContent:'space-between',
    flexDirection:'row'
  },
  item:{
    fontSize:18,
    marginVertical:10,
    marginHorizontal: 25,
    color:colors.textLight,
  },
});