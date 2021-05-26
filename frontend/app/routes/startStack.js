import React, { useContext } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from './tab';
import LoginNavigator from './loginStack';
import HeaderIcon from '../components/headerIcon';
import {Context as AuthContext} from '../context/authContext';

const {Navigator, Screen} = createStackNavigator();

export default function StartNavigator({navigation}) {
    const {state} = useContext(AuthContext);
    return(
        <Navigator>
            {/*console.log(state.token)*/}
            {state.token == null ? (
                <Screen name="SignIn" component={LoginNavigator} options={{headerShown:false}}/>
            ) : (
                <Screen name="Home" component={BottomTabNavigator} options={{headerShown:false}}/>
            )}
        </Navigator>
    );
}