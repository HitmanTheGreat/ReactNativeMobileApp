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
import FarmersScreen from './main/Tabs/Dashboard/Farmer';
import FarmerDetailScreen from './main/Tabs/Dashboard/Farmer/FarmerDetails';
import FarmerAddScreen from './main/Tabs/Dashboard/Farmer/FarmerAdd';
import FarmerTypeDetails from './main/Tabs/Dashboard/FarmType/FarmTypeDetails';
import FarmTypeAdd from './main/Tabs/Dashboard/FarmType/FarmTypeAdd';
import FarmTypeDetails from './main/Tabs/Dashboard/FarmType/FarmTypeDetails';

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
            {/* <Stack.Screen name="Crop" component={CropsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CropDetails" component={CropDetailsScreen} />
            <Stack.Screen name="CropAdd" component={CropsAddScreen} /> */}
            {/* Farmer */}
            {/* <Stack.Screen name="Farmer" component={FarmersScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FarmerDetails" component={FarmerDetailScreen} />
            <Stack.Screen name="FarmerAdd" component={FarmerAddScreen} /> */}
            {/* FarmType */}
            <Stack.Screen name="FarmType" component={FarmTypesScreen} />
            {/* <Stack.Screen name="FarmTypeDetails" component={FarmTypeDetails} /> */}
            <Stack.Screen name="FarmTypeAdd" component={FarmTypeAdd} />

        </Stack.Navigator>
    );
};

export default DashboardScreen;
