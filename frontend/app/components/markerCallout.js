import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, globalStyles } from '../styles/global';

export default function MarkerCallout({textComponent}){
    return(
        <View style={{marginTop:50, paddingHorizontal:10, justifyContent:'center'}}> 
            <View style={{backgroundColor:colors.background, borderRadius:5, alignSelf:'center', padding:10, borderWidth: 1 ,borderColor: colors.textLight}}>
                {textComponent}
            </View>
            <View style={{alignSelf:'center', borderWidth:10, marginTop:-0.5, backgroundColor:'transparent', borderColor:'transparent', borderTopColor:colors.textLight}} />
            <View style={{alignSelf:'center', borderWidth:10, marginTop:-22, backgroundColor:'transparent', borderColor:'transparent', borderTopColor:colors.background}} />
        </View>
    );
}

const styles = StyleSheet.create({
    
  });


