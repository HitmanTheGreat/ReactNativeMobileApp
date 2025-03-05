import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '..';
import ProfileScreen from '../main/Tabs/Profile';
import SettingsScreen from '../main/Tabs/Settings';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Hide the header
                tabBarStyle: {
                    backgroundColor: '#2D732E', // Sidebar background color
                    borderTopWidth: 0,
                    height: 60,
                },
                tabBarActiveTintColor: '#FFD700', // Active icon color (gold like sidebar text)
                tabBarInactiveTintColor: '#C0C0C0', // Inactive icons color (silver/gray)
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                tabBarItemStyle: {
                    borderTopWidth: 1, // Creates a horizontal line between tabs
                    borderTopColor: '#74C369', // Light green divider
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings-outline';
                    }

                    return <Icon name={iconName!} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
            
        </Tab.Navigator>
    );
};

export default BottomTabs;
