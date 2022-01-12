import React, {useContext, useState} from 'react';
import { StyleSheet, Button, TextInput, View, Text, ScrollView } from 'react-native';
import { globalStyles, colors } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Context as AuthContext} from '../context/authContext';
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import CustomButton from '../components/customButton.js';

const userSchema = yup.object({
    email: yup.string().email('Email invalide').required('Email obligatoire'),
    password: yup.string().required('Mot de passe obligatoire')
    .matches("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})", 
    'Le mot de passe doit contenir au moins 1 minuscule, 1 majuscale, 1 chiffre ainsi qu\'un caractère spécial (@, _, -, etc...)').min(8).max(32),
    firstname: yup.string().matches(/(^[A-Za-zÀ-ÿ]+(\-)?[A-Za-zÀ-ÿ]+)+$/, 'Prénom invalide').max(40).required('Prénom obligatoire'),
    lastname: yup.string().matches(/(^[A-Za-zÀ-ÿ]+(\-)?[A-Za-zÀ-ÿ]+)+$/, 'Nom invalide').max(40).required('Nom obligatoire'),
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
                    
                }}
            >
                {props => (
                    <ScrollView style={globalStyles.container}>
                        <View style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems: 'center',
                                marginVertical:'10%'
                            }}>
                            <Text style={globalStyles.titleText}>Créer un compte</Text>
                        </View>
                        <View style={{flex:2.5}}>
                            <View style={globalStyles.textInput}>
                            <AntDesign 
                                name='user'
                                size={22}
                                color={colors.textLight}
                                style={{marginVertical:5}}
                            />
                            <TextInput 
                                placeholder='Prénom'
                                placeholderTextColor={colors.textLight}
                                onChangeText={props.handleChange('firstname')}
                                onBlur={props.handleBlur('firstname')} 
                                value={props.values.firstname}
                                style={globalStyles.textInputContent}
                            />
                            </View>
                            <View>
                                <Text style={globalStyles.errorText}>{props.touched.firstname && props.errors.firstname}</Text>
                            </View>
                            <View style={globalStyles.textInput}>
                                <AntDesign 
                                    name='user'
                                    size={22}
                                    color={colors.textLight}
                                    style={{marginVertical:5}}
                                />
                                <TextInput 
                                    placeholder='Nom' 
                                    placeholderTextColor={colors.textLight}
                                    onChangeText={props.handleChange('lastname')}
                                    onBlur={props.handleBlur('lastname')} 
                                    value={props.values.lastname}
                                    style={globalStyles.textInputContent}
                                />
                            </View>
                            <View>
                                <Text style={globalStyles.errorText}>{props.touched.lastname && props.errors.lastname}</Text>
                            </View>
                            <View style={globalStyles.textInput}>
                                <MaterialCommunityIcons 
                                    name='email-outline'
                                    size={22}
                                    color={colors.textLight}
                                    style={{marginVertical:5}}
                                />
                                <TextInput 
                                    placeholder='Email' 
                                    placeholderTextColor={colors.textLight}
                                    onChangeText={props.handleChange('email')}
                                    onBlur={props.handleBlur('email')} 
                                    value={props.values.email}
                                    keyboardType='email-address'
                                    style={globalStyles.textInputContent}
                                />
                            </View>
                            <View>
                                <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>
                            </View>
                            <View style={globalStyles.textInput}>
                                <Feather 
                                    name='lock'
                                    size={22}
                                    color={colors.textLight}
                                    style={{marginVertical:5}}
                                />
                                <TextInput 
                                placeholder='Mot de passe' 
                                placeholderTextColor={colors.textLight}
                                onChangeText={props.handleChange('password')}
                                onBlur={props.handleBlur('password')} 
                                value={props.values.password}
                                secureTextEntry
                                style={globalStyles.textInputContent}
                            />
                            </View>
                            <View>
                                <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>
                            </View>
                            
                            
                            
                            
                            {result == 409 ? (
                                <View style={{marginVertical:10}}>
                                    <Text style={[globalStyles.errorText, {textAlign:'center'}]}>L'utilisateur existe déjà</Text>
                                </View>
                            ):(
                                <Text style={globalStyles.errorText}></Text>
                            )}
                            </View>
                        <View style={{flex:1}}>
                            <CustomButton onPress={props.handleSubmit} title="Let's go"/>
                        </View>
                        
                    </ScrollView>
                )}
            </Formik>
        </View>
    );
}