import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import BottomTabs from './BottomTabs';
import { Divider } from 'react-native-paper';
import UsersScreen from '../screens/UsersScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = ({ navigation }: { navigation: any }) => {
    const { colors } = useTheme();


    // Logout function
    const handleLogout = async () => {
        try {
            await AsyncStorage.clear(); // Clears all stored data
            navigation.reset({
                index: 0,
                routes: [{ name: '/' }], // Redirects to login or home screen
            });
        } catch (error) {
            console.error("Logout Error:", error);
        } finally {
            navigation.reset({
                index: 0,
                routes: [{ name: '/' }], // Redirects to login or home screen
            });
        }
    };

    return (
        <LinearGradient colors={["#74C369", "#2D732E"]} style={styles.drawerContainer}>
            {/* Close Drawer Button */}
            <Animated.View entering={FadeInRight.duration(800)} style={styles.closeIcon}>
                <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                    <Ionicons name="close-circle" size={32} color="#FFD700" />
                </TouchableOpacity>
            </Animated.View>

            {/* Hero Section */}
            <Animated.View entering={FadeInUp.duration(1000)} style={styles.heroSection}>
                <Image source={require('@/assets/images/farm-logo.png')} style={styles.logo} />
            </Animated.View>


            {/* Navigation Links */}
            <DrawerItem icon="home" label="Home" navigation={navigation} screen="Home" />
            <Divider style={styles.divider} />

            <DrawerItem icon="tree" label="Farm Types" navigation={navigation} screen="FarmTypes" />
            <DrawerItem icon="tractor" label="Farm" navigation={navigation} screen="Farm" />
            <DrawerItem icon="seedling" label="Crops" navigation={navigation} screen="Crops" />

            <Divider style={styles.sectionDivider} />

            <DrawerItem icon="users" label="Users" navigation={navigation} screen="Users" />

            <Divider style={styles.mainDivider} />

            {/* Logout */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <MaterialIcons name="logout" size={24} color="#FFD700" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

// Drawer Item Component
const DrawerItem = ({ icon, label, navigation, screen }: { icon: string, label: string, navigation: any, screen: string }) => {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(screen)}>
            <FontAwesome5 name={icon} size={22} color="#FFD700" />
            <Text style={styles.menuText}>{label}</Text>
        </TouchableOpacity>
    );
};

// Stack Navigator with Menu Button
const MainStack = ({ navigation }: { navigation: any }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#2D732E' },
                headerTintColor: '#FFD700',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                        <Ionicons name="menu" size={32} color="#FFD700" />
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ title: 'AgriConnect' }} />
        </Stack.Navigator>
    );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: { width: 280, backgroundColor: '#1B4721', borderRadius: 20 },
                headerShown: false,
            }}
        >
            <Drawer.Screen name="Main" component={MainStack} />

        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        padding: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: 25,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 15,
    },
    logo: {
        width: 110,
        height: 110,
        resizeMode: 'contain',
    },
    closeIcon: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        marginVertical: 5,
    },
    menuText: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    divider: {
        marginVertical: 5,
        backgroundColor: '#FFD700',
        height: 1.5,
    },
    sectionDivider: {
        marginVertical: 10,
        backgroundColor: '#DAA520',
        height: 2,
    },
    mainDivider: {
        marginVertical: 20,
        backgroundColor: '#8B4513',
        height: 2,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(255,215,0,0.2)',
        marginTop: 20,
    },
    logoutText: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    menuButton: {
        marginLeft: 15,
    },
});

export default DrawerNavigator;
