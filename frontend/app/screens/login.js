import React, {useState,useContext, useEffect} from 'react';
import {TextInput, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { globalStyles, colors } from '../styles/global.js';
import {Context as AuthContext} from '../context/authContext';
import CustomButton from '../components/customButton.js';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function Login({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(false);

    const {state, signin} = useContext(AuthContext);

    var timeout = null;

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
          if (timeout != null)
            clearTimeout(timeout);
        });
    
        return unsubscribe;
      }, [navigation]);

    const handleSignin = async ({email,password}) => {
            signin({email,password}).then(() => {
                timeout = setTimeout(() => {
                    if(state.token == null){
                        setResult(404);
                    }}, 500);
                
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
                    <Image style={{height:125, width:125, tintColor:colors.textLight}} source={require('../assets/pelops_logo.png')}/>
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
                {result && (
                    <View style={{marginVertical:10}}>
                        <Text style={[globalStyles.errorText, {textAlign:'center'}]}>Email ou mot de passe incorrect</Text>
                    </View>
                )}
                
            </View>
            
            <View style={{flex:2}}>
                <View style={{
                        marginTop:'5%',
                        marginBottom: '10%',
                    }}>
                    <CustomButton onPress={() => handleSignin({email,password})} title='CONNEXION'/>
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