import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '../modules/dashboard/dashboard.screen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ title: 'Dev Productivity' }}
      />
    </Stack.Navigator>
  );
}
