
import React, {useContext, useState} from 'react'
import {StyleSheet, TouchableOpacity, Text, View, SafeAreaView} from 'react-native';
import { MaterialIcons   } from '@expo/vector-icons';
import {Context as AuthContext} from '../context/authContext';
import { colors } from '../styles/global';

export default function UserItem({ pressHandler, user, marked, creator}) {
  const [unsub, setUnsub] = useState(false);
  const {state,dispatch} = useContext(AuthContext);

  const unsubscribeHandler = () => {
    if(unsub){
      pressHandler();
    }
    setUnsub(!unsub);
  }
  return (
    <TouchableOpacity onPress={() => {
      if(unsub)
        setUnsub(false);
      
    }} 
    >
      <View style={{justifyContent:'center', marginVertical:5}}>
        {marked ? 
      (<View style={styles.markedItem}>
        <Text style={styles.markedTextElement}>{user.name.firstname} {user.name.lastname}, <Text style={{fontSize:12, fontStyle:'italic'}}>Organisateur.trice</Text></Text>
      </View>):
      (
        <View style={styles.simpleItem}>
        <Text style={styles.simpleTextElement}>{user.name.firstname} {user.name.lastname}</Text>
        <TouchableOpacity onPress={unsubscribeHandler}>
          {(user.id == state.id || state.id == creator) && 
            (!unsub ? 
              (<MaterialIcons name="close" size={20} style={[styles.simpleTextElement, {fontSize:20}]}/>): 
              (<Text style={[styles.simpleTextElement, {color:colors.error, fontSize: 15}]}>{user.id == state.id ? "Se désinscrire ?" : "Supprimer"}</Text>))}
        </TouchableOpacity>
      </View>
      )}
      </View>
      
      
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  simpleItem: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderColor: colors.textHighlight,
    borderWidth: 1,
    borderRadius: 1,
    borderRadius: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  markedItem:{
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderColor: colors.buttonsBackground,
    borderWidth: 1,
    borderRadius: 1,
    borderRadius: 10,
    backgroundColor:colors.buttonsBackgroundLight,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  simpleTextElement:{
    marginHorizontal:10,
    fontSize:16,
    color:colors.textLight,
  },
  markedTextElement:{
    marginHorizontal:15,
    fontSize:16,
    color:colors.textDark,
  },
});