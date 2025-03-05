import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersScreen from './main/Tabs/Dashboard/User';
import UserDetailsScreen from './main/Tabs/Dashboard/User/UserDetails';
import HomeScreen from './main/Tabs/Home';
import UsersAddScreen from './main/Tabs/Dashboard/User/UsersAdd';
import FarmTypesScreen from './main/Tabs/Dashboard/FarmType';
import CropsScreen from './main/Tabs/Dashboard/Crop';
import CropDetailsScreen from './main/Tabs/Dashboard/Crop/CropDetails';
import CropsAddScreen from './main/Tabs/Dashboard/Crop/CropAdd';

const Stack = createNativeStackNavigator();

const DashboardScreen = () => {
    return (
        <Stack.Navigator>
            {/* home */}
            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
            {/* User */}
            {/* <Stack.Screen name="User" component={UsersScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="UserAdd" component={UsersAddScreen} /> */}
            {/* Crops */}
            <Stack.Screen name="Crop" component={CropsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CropDetails" component={CropDetailsScreen} />
            <Stack.Screen name="CropAdd" component={CropsAddScreen} />

            <Stack.Screen name="FarmType" component={FarmTypesScreen} />

        </Stack.Navigator>
    );
};

export default DashboardScreen;
