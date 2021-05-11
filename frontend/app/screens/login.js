import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';

const loginSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  export default function Login(){
    return(
        <View style={globalStyles.container}>
            <Formik
                initialValues={{email:'email', password:'password',}}
                validationSchema={loginSchema}
                onSubmit={(values, action) => {
                    action.resetForm();
                    console.log(values);
                }}
            >
                {props => (
                    <TextInput 
                        placeholder='Email' // Pas sur de garder cette forme
                        onChangeText={props.handleChange('sport')}
                        onBlur={props.handleBlur('sport')} 
                        value={props.values.sport}
                    />
                )}
            </Formik>
        </View>
    );
}