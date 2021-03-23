
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/global';
import FloatingButton from '../components/floatButton';

export default function Home({navigation}) {
  return (
    <View style={globalStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <Text>This is the Home page !</Text>
      </TouchableOpacity>  
      <FloatingButton />
    </View>
  );
}

const styles = StyleSheet.create({
  button:{
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: '#ee6e73',                                    
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});