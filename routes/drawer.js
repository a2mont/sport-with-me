import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './homeStack';
import AboutNavigator from './aboutStack';

const {Navigator, Screen} = createDrawerNavigator();

export default function DrawerNavigator(){
    return(
        <Navigator>
            <Screen name='Home' component={HomeNavigator} options={({navigation}) => 
                ({ headerTitle: props => <Header navigation={navigation} {...props} /> })}
                />
            <Screen name='About' component={AboutNavigator} />
        </Navigator>
    );
}