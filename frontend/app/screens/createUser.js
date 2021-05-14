import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import Api from '../api/api';

const userSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
    firstname: yup.string(),
    lastname: yup.string(),
  });

  export default function createUser({navigation}){
    return(
        <View style={globalStyles.container}>
            <Formik
                initialValues={{email:'email', password:'password',firstname:'firstname', lastname:'lastname'}}
                validationSchema={userSchema}
                onSubmit={(values, action) => {
                    action.resetForm();
                    var newUser = Api.createUser(values);
                    
                }}
            >
                {props => (
                    <View>
                        <TextInput 
                            placeholder='Email' 
                            onChangeText={props.handleChange('email')}
                            onBlur={props.handleBlur('email')} 
                            value={props.values.email}
                        />
                        <TextInput 
                            placeholder='password' 
                            onChangeText={props.handleChange('password')}
                            onBlur={props.handleBlur('password')} 
                            value={props.values.password}
                        />
                        <TextInput 
                            placeholder='firstname' 
                            onChangeText={props.handleChange('firstname')}
                            onBlur={props.handleBlur('firstname')} 
                            value={props.values.firstname}
                        />
                        <TextInput 
                            placeholder='lastname' 
                            onChangeText={props.handleChange('lastname')}
                            onBlur={props.handleBlur('lastname')} 
                            value={props.values.lastname}
                        />
                        <Button onPress={props.handleSubmit} title='Submit'/>
                    </View>
                )}
            </Formik>
        </View>
    );
}