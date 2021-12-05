import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Activities from "../screens/activities";
import ActivityDetails from "../screens/activityDetails";


const {Navigator, Screen} = createStackNavigator();
  
export default function ActivitiesNavigator({navigation}){
    return(
        <Navigator >
            <Screen 
                name="Activities" 
                component={Activities}
                options={{
                    title:"Activités",
                }} 
            />
            <Screen
                name='Details'
                component={ActivityDetails}
                options={{title:''}}
            />
        </Navigator>
    );
}

