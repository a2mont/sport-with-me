import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerNavigator from './drawer';
import ActivitiesNavigator from './activityStack';
import AboutNavigator from "./aboutStack";
import HomeNavigator from "./homeStack";
import { globalStyles, colors } from "../styles/global";

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
            activeTintColor: colors.selected,
            inactiveTintColor: colors.inactive,
            showLabel:false,
            style:{
                backgroundColor: colors.buttonsBackground,
            }
          }}
        >
            
            <Screen name='Activities' component={ActivitiesNavigator} />
            {/*<Screen name='Home' component={DrawerNavigator} />*/}
            <Screen name='Home' component={HomeNavigator} options={({navigation}) => 
                ({ headerTitle: props => <Header navigation={navigation} {...props} /> })}
                />
            <Screen name='User Profile' component={AboutNavigator} />
        </Navigator>
    );
}
