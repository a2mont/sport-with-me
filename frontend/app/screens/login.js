import React, {useState,useContext} from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global.js';
import Api from '../api/api';
import {Context as AuthContext} from '../context/authContext';

export default function Login({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const {state, signin} = useContext(AuthContext);
    return(
        <View style={globalStyles.container}>
            <View>
                <TextInput 
                    placeholder='Email' 
                    onChangeText={() => setEmail('email')}
                />
                <TextInput 
                    placeholder='password' 
                    onChangeText={() => setPassword('password')}
                    secureTextEntry
                />
                <Button onPress={() => /*signin({email,password})*/{}} title='Submit'/>
                <View>
                    <Text >Dont have an account? </Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('Register')}}>
                        <Text >Sign up Here.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}