import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from './tab';
import LoginNavigator from './loginStack';
import HeaderIcon from '../components/headerIcon';

const {Navigator, Screen} = createStackNavigator();

export default function StartNavigator({navigation, userToken}) {
    return(
        <Navigator>
            {userToken == null ? (
                <Screen name="SignIn" component={LoginNavigator} />
            ) : (
                <Screen name="Home" component={BottomTabNavigator} />
            )}
        </Navigator>
    );
}