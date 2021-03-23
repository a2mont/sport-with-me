import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from '@expo/vector-icons';
import {globalStyles} from '../styles/global'
import About from "../screens/about";
import HeaderIcon from '../components/headerIcon'
import { Header } from 'react-native/Libraries/NewAppScreen';

const {Navigator, Screen} = createStackNavigator();
  
export default function AboutNavigator({navigation}){
    return(
        <Navigator >
            <Screen 
                name="About" 
                component={About}
                options={{
                    title:"About Sport With me",
                    headerLeft: () =>
                        <HeaderIcon navigation={navigation}/>
                }} 
            />
        </Navigator>
    );
}

