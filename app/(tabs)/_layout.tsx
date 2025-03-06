import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // LinearGradient for custom background
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; // Import icons
import TabsScreen from '@/components/ui/TabsScreen';
import CropsScreen from '../screens/Crop';

// Create a Drawer Navigator
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={styles.drawerContainer}>
      <LinearGradient
        colors={['#74C369', '#2D732E']}
        style={styles.gradientBackground}
      >
        {/* Logo Section */}
        <View style={styles.heroSection}>
          <Image source={require('@/assets/images/farm-logo.png')} style={styles.logo} />
        </View>

        {/* Drawer Items */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('home')}>
          <MaterialCommunityIcons name="home" size={24} color="#FFD700" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={24} color="#FFD700" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <MaterialCommunityIcons name="settings" size={24} color="#FFD700" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color="#FFD700" />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={24} color="#FFD700" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Drawer.Navigator
    screenOptions={{
      headerShown: true, // Show the header
      headerStyle: {
        backgroundColor: '#2D732E', // Green background for the header
      },
      drawerStyle: {
        width: '70%', // Adjust drawer width if needed
      },
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
      {/* Drawer Screen for Tabs (Stack Navigator here) */}
      <Drawer.Screen
        name="home"
        component={TabsScreen}
        options={{
          title: 'Home',
        }}
      />

      {/* Additional Drawer Menu Screens */}
      <Drawer.Screen
        name="Profile"
        component={CropsScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={CropsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={CropsScreen}
        options={{
          title: 'Notifications',
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    paddingTop: 50, // Padding for the top of the drawer to avoid overlap with the logo
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: 'rgba(255,215,0,0.2)',
  },
  logoutText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
