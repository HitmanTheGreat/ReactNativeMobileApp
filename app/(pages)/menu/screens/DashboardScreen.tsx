import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersScreen from './users/UsersScreen';
import UserDetailsScreen from './users/UserDetailsScreen';
import HomeScreen from './HomeScreen';
import UsersAddScreen from './users/UsersAddScreen';

const Stack = createNativeStackNavigator();

const DashboardScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="UserAdd" component={UsersAddScreen} />
        </Stack.Navigator>
    );
};

export default DashboardScreen;
