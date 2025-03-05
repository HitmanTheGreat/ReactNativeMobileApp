import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersScreen from './main/User';
import UserDetailsScreen from './main/User/UserDetails';
import HomeScreen from './main/Tabs/Home';
import UsersAddScreen from './main/User/UsersAdd';
import FarmTypesScreen from './main/Tabs/Dashboard/FarmType';

const Stack = createNativeStackNavigator();

const DashboardScreen = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="User" component={UsersScreen}  options={{ headerShown: false }}/>
            {/* <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="UserAdd" component={UsersAddScreen} />

            <Stack.Screen name="FarmType" component={FarmTypesScreen} /> */}

        </Stack.Navigator>
    );
};

export default DashboardScreen;
