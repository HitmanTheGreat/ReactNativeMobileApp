import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersScreen from './screens/users/UsersScreen';
import UserDetailsScreen from './screens/users/UserDetailsScreen';
import HomeScreen from './screens/tabs/HomeScreen';
import UsersAddScreen from './screens/users/UsersAddScreen';

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
