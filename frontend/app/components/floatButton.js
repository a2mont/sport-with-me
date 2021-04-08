import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FloatingButton({pressHandler}){
    return(
        <View  style={styles.button}>
            <MaterialIcons 
            name='add' 
            onPress={() => pressHandler()} 
            size={25} 
            style={styles.buttonIcon}/>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
      width: 60,  
      height: 60,   
      borderRadius: 30,            
      backgroundColor: 'black',                                    
      position: 'absolute',                                          
      bottom: 10,                                                    
      right: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonIcon:{
        color:'white',
    }
  });