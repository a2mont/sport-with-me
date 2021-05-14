import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/login';
import CreateUser from '../screens/createUser';
import HeaderIcon from '../components/headerIcon';

const {Navigator, Screen} = createStackNavigator();

export default function LoginNavigator({navigation}) {
    return(
        <Navigator>
            <Screen 
                name="Login" 
                component={Login}
                options={{title:''}}
            />
            <Screen 
                name="Register" 
                component={CreateUser} 
                options={{title:'S\'inscrire', headerShown:false}}/>
        </Navigator>
    );
}