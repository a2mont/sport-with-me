import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import ActivityDetails from "../screens/activityDetails";
import HeaderIcon from '../components/headerIcon';

const {Navigator, Screen} = createStackNavigator();

export default function HomeNavigator({navigation}) {
    return(
        <Navigator  mode='modal'>
            <Screen 
                name="Home" 
                component={Home}
                options={{
                    headerLeft: () =>
                    <HeaderIcon navigation={navigation}/>
                }}/>
            <Screen 
                name="Details" 
                component={ActivityDetails} 
                options={{title:''}}/>
        </Navigator>
    );
}