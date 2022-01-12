import React, {useState,useContext} from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles, colors } from '../styles/global.js';
import {Context as AuthContext} from '../context/authContext';
import CustomButton from '../components/customButton.js';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function Login({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(0);

    const {state, signin} = useContext(AuthContext);


    const handleSignin = async ({email,password}) => {
            signin({email,password}).then(() => {
                if(state.token != null){
                    console.log('Wrong password/email');
                    setResult(404);
                }
            });
    }

    return(
        <ScrollView style={[globalStyles.container]}>
            <View style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems: 'center',
                    marginTop:'20%'
                }}>
                    <Text style={globalStyles.baseText}>LOGO</Text>
                </View>
            <View style={{
                flex:2
            }}>
                <View style={{marginTop:'20%'}}>
                    <View style={globalStyles.textInput}>
                        <AntDesign 
                            name='user'
                            size={22}
                            color={colors.textLight}
                            style={{marginVertical:5}}
                        />
                        <TextInput 
                            placeholder='Email'
                            placeholderTextColor={colors.textLight}
                            onChangeText={setEmail}
                            value={email}
                            keyboardType='email-address'
                            style={globalStyles.textInputContent}
                        />
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
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                        style={globalStyles.textInputContent}
                    />
                    </View>
                </View>
                {result != 0 ? (
                    <View style={{marginVertical:10}}>
                        <Text style={[globalStyles.errorText, {textAlign:'center'}]}>Email ou mot de passe incorrect</Text>
                    </View>
                ):(
                    <Text style={globalStyles.errorText}></Text>
                )}
                
            </View>
            
            <View style={{flex:2}}>
                <View style={{
                        marginTop:'5%',
                        marginBottom: '10%',
                    }}>
                    <CustomButton onPress={() => handleSignin({email,password})} title='CONNECTION'/>
                </View>
                    
                <View style={{
                    alignItems: 'center',
                    flexDirection:'row',
                    justifyContent: 'center'
                }}>
                    <Text style={globalStyles.baseText}>Pas encore de compte ? </Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('Register')}}>
                        <Text style={globalStyles.highlightedText}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}