import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { colors, globalStyles } from '../styles/global';

export default function Message({text}){
    return(
        <View style={styles.content}>
            <Text style={{alignSelf:'center', padding:10, fontSize:15, color: `${colors.textDark}ef`}}>{text}</Text>
          </View>
    );
}

const styles = StyleSheet.create({
    content:{
        backgroundColor:`${colors.textHighlight}c8`, 
        position:'absolute', 
        alignSelf:'center', 
        justifyContent:'center',
        bottom:'10%',
        borderRadius:10,
        
    },
  });