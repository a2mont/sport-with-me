import React, {useContext, useState} from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import Api from '../api/api';
import {Context as AuthContext} from '../context/authContext';

const userSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
    .matches("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})", 
    'Password must contain at least 1 lowercase letter. 1 uppercase letter, 1 numeric character as well as a sepcial character').min(8).max(32),
    firstname: yup.string().matches(/(^[A-Za-zÀ-ÿ]+(\-)?[A-Za-zÀ-ÿ]+)+$/, 'Please enter a valid name').max(40).required(),
    lastname: yup.string().matches(/(^[A-Za-zÀ-ÿ]+(\-)?[A-Za-zÀ-ÿ]+)+$/, 'Please enter a valid name').max(40).required(),
  });

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}  
  export default function createUser({navigation}){
    const {state, signup, signin} = useContext(AuthContext);
    const [result,setResult] = useState(0);
    return(
        <View style={globalStyles.container}>
            <Formik
                initialValues={{email:'', password:'',firstname:'', lastname:''}}
                validationSchema={userSchema}
                onSubmit={(values, action) => {
                    values.firstname = capitalizeFirstLetter(values.firstname);
                    values.lastname = capitalizeFirstLetter(values.lastname);
                    //
                    signup(values).then(success => {
                        console.log(success);
                        if(success == 201){
                            action.resetForm();
                            navigation.navigate('Login');
                        }else if(success == 409){
                            console.log('User already exists');
                            setResult(success);
                        } else {
                            console.log('Error' + success);
                        }
                    });
                    
                    //navigation.navigate('Login');
                }}
            >
                {props => (
                    <View>
                        <TextInput 
                            placeholder='Email' 
                            onChangeText={props.handleChange('email')}
                            onBlur={props.handleBlur('email')} 
                            value={props.values.email}
                            keyboardType='email-address'
                        />
                        <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>
                        <TextInput 
                            placeholder='Password' 
                            onChangeText={props.handleChange('password')}
                            onBlur={props.handleBlur('password')} 
                            value={props.values.password}
                            secureTextEntry
                        />
                        <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>
                        <TextInput 
                            placeholder='Firstname' 
                            onChangeText={props.handleChange('firstname')}
                            onBlur={props.handleBlur('firstname')} 
                            value={props.values.firstname}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.firstname && props.errors.firstname}</Text>
                        <TextInput 
                            placeholder='Lastname' 
                            onChangeText={props.handleChange('lastname')}
                            onBlur={props.handleBlur('lastname')} 
                            value={props.values.lastname}
                        />
                        <Text style={globalStyles.errorText}>{props.touched.lastname && props.errors.lastname}</Text>
                        {result == 409 ? (
                            <Text style={globalStyles.errorText}>User already exists</Text>
                        ):(
                            <Text style={globalStyles.errorText}></Text>
                        )}
                        <Button onPress={props.handleSubmit} title='Submit'/>
                    </View>
                )}
            </Formik>
        </View>
    );
}