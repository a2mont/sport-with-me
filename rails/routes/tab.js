import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerNavigator from './drawer';
import Activities from '../screens/activities';
import UserProfile from '../screens/userProfile';

const {Navigator, Screen} = createBottomTabNavigator();

export default function BottomTabNavigator(){
    return(
        <Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch(route.name){
                    case 'Home':
                        iconName = focused
                        ? 'home'
                        : 'home-outline';
                        break;
                    case 'Activities':
                        iconName = 'list';
                        break;
                    case 'User Profile':
                        iconName = focused
                        ? 'person'
                        : 'person-outline';
                        break;
                }
    
                return <Ionicons name={iconName} size={size} color={color} />;
                },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showLabel:false,
            style:{
                backgroundColor: 'black',
            }
          }}
        >
            
            <Screen name='Activities' component={Activities} />
            <Screen name='Home' component={DrawerNavigator} />
            <Screen name='User Profile' component={UserProfile} />
        </Navigator>
    );
}
