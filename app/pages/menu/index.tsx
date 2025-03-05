import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersScreen from './main/Tabs/Dashboard/Users';
import UserDetailsScreen from './main/Tabs/Dashboard/Users/UserDetailsScreen';
import HomeScreen from './main/Tabs/HomeScreen';
import UsersAddScreen from './main/Tabs/Dashboard/Users/UsersAddScreen';

const Stack = createNativeStackNavigator();

const DashboardScreen = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Users" component={UsersScreen}  options={{ headerShown: false }}/>
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="UserAdd" component={UsersAddScreen} />
        </Stack.Navigator>
    );
};

export default DashboardScreen;
