import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text } from 'react-native';
import Activities from "../screens/activities";
import ActivityDetails from "../screens/activityDetails";
import { colors } from '../styles/global';


const {Navigator, Screen} = createStackNavigator();
  
export default function ActivitiesNavigator({navigation}){
    return(
        <Navigator >
            <Screen 
                name="Activities" 
                component={Activities}
                options={{
                    title:"Activités",
                    headerStyle:{
                        backgroundColor: colors.background,
                    }
                }} 
            />
            <Screen
                name='Details'
                component={ActivityDetails}
                options={{
                    title:'',
                    headerStyle:{
                        backgroundColor: colors.background,
                        shadowColor:'transparent',
                        elevation:0,

                    },
                    headerTintColor: colors.inactive,
                    
                }}
            />
        </Navigator>
    );
}

