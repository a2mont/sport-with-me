
import React from 'react'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { AntDesign   } from '@expo/vector-icons';

export default function UserItem({ pressHandler, user, marked}) {
  return (
    <TouchableOpacity onPress={pressHandler}>
      {marked ? 
      (<View style={styles.markedItem}><Text style={styles.textElement}>{user.name.firstname} {user.name.lastname}</Text>
        <AntDesign name="user" size={18} style={styles.textElement}/>
        </View>):
      (<Text style={styles.simpleItem}>{user.name.firstname} {user.name.lastname}</Text>)}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  simpleItem: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
    flexDirection:'row',
  },
  markedItem:{
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
    backgroundColor:'green',
    flexDirection:'row',
  },
  textElement:{
    marginHorizontal:15,  
  },
});