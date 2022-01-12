import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors, globalStyles } from '../styles/global';

export default function CustomButton({onPress, title}){
    return(
        <View  style={styles.button}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{           
      backgroundColor: colors.buttonsBackgroundLight,
      padding:10,
      marginHorizontal:'30%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:20,
      borderWidth:1.5
    },
    buttonText:{
        fontSize: 15,
        color: colors.textDark,
    }
  });