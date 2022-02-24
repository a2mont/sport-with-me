import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from '@expo/vector-icons';
import {globalStyles,colors} from '../styles/global'
import About from "../screens/about";
import UserProfile from '../screens/userProfile';
import HeaderIcon from '../components/headerIcon'
import { Header } from 'react-native/Libraries/NewAppScreen';

const {Navigator, Screen} = createStackNavigator();
  
export default function AboutNavigator({navigation}){
    return(
        <Navigator >
            <Screen 
                name="User"
                component={UserProfile}
                options={{
                    headerShown:false
                }}
            
            />
            <Screen 
                name="About" 
                component={About}
                options={{
                    title:"Utiliser Pelops",
                    headerStyle:{
                        backgroundColor: colors.background,
                        shadowColor:'transparent',
                        elevation:0,
                    },
                    headerTitleStyle:{
                        color: colors.textLight,
                        fontSize:26,
                    },
                    headerTintColor: colors.inactive,
                }} 
            />
        </Navigator>
    );
}

