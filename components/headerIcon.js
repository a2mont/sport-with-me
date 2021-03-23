import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {globalStyles} from '../styles/global'

export default function HeaderIcon({navigation}){
    return(
        <MaterialIcons 
        name='menu'
        size={28} 
        onPress={() => navigation.openDrawer()}
        style={globalStyles.headerIcon} />
    );
}
