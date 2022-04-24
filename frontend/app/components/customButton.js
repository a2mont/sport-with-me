import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../styles/global';

export default function CustomButton({onPress, title, style, textStyle}){
    return(
        <View  style={style == null ? styles.button : style}>
            <TouchableOpacity onPress={onPress}>
                <Text style={textStyle == null ? styles.buttonText : textStyle}>{title}</Text>
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
        fontSize: 16,
        color: colors.textDark,
    }
  });