import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import ActivityDetails from "../screens/activityDetails";
import { colors } from '../styles/global';

const {Navigator, Screen} = createStackNavigator();

export default function HomeNavigator({navigation}) {
    return(
        <Navigator  mode='modal'>
            <Screen 
                name="Home" 
                component={Home}
                options={{
                    headerShown:false
                }}/>
            <Screen 
                name="Details" 
                component={ActivityDetails} 
                options={{
                    title:'',
                    headerStyle:{
                        backgroundColor: colors.background,
                        shadowColor:'transparent',
                        elevation:0,
                    },
                    headerTintColor: colors.inactive,
                }}/>
        </Navigator>
    );
}