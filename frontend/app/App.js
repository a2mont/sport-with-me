import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {Provider as AuthProvider} from './context/authContext';

import StartNavigator from './routes/startStack';


export default function App({navigation}) {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StartNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

