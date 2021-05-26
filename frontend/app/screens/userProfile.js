import React, { useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {globalStyles} from '../styles/global';
import {Context as AuthContext} from '../context/authContext';
import Api from '../api/api';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const {state, signout} = useContext(AuthContext);


  const loadInfos = async () => {
    const userInfos = await Api.getUserInfos(state.id);
    setUser(userInfos);
    //console.log(user);
  }

  useEffect(() => {
    loadInfos()
  }, []);
  return (
    <View style={globalStyles.container}>
      {user && 
        <View style={{alignItems:'center', justifyContent:'center', marginBottom:50}}>
          <Text style={styles.title}>{user.name.firstname} {user.name.lastname}</Text>
          <View style={styles.userItems}>
          <Text style={styles.item}>Email</Text>
          <Text style={styles.item}>{user.email}</Text>
          </View>
        </View>
      }
      <Button onPress={() => signout()} title='Se deconnecter'/>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize:22,
    margin:20,
  },
  userItems:{
    marginLeft:60,
    flexDirection:'row'
  },
  item:{
    fontSize:18,
    width:'50%',
  },
});