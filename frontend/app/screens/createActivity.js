import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';

const activitySchema = yup.object({
    sport: yup.string()
      .required()
      .min(4),
    date: yup.date().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
  });


export default function ActivityForm({addActivity}){
    return(
        <View style={globalStyles.container}>
            <Formik
                initialValues={{sport:'', date:'', latitude:'', longitude:''}}
                validationSchema={activitySchema}
                onSubmit={(values, action) => {
                    action.resetForm();
                    addActivity(values);
                }}
            >
                {props => (
                    <TextInput 
                        placeholder='Sport' // Pas sur de garder cette forme
                        onChangeText={props.handleChange('sport')}
                        onBlur={props.handleBlur('sport')} 
                        value={props.values.sport}
                    />
                )}
            </Formik>
        </View>
    );
}