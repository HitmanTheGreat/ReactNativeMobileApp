import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabsScreen from '@/components/ui/TabsScreen';
import CropsScreen from '../screens/Crop';
import FarmerScreen from '../screens/Farmer';
import FarmTypeScreen from '../screens/FarmType';
import UserScreen from '../screens/User';

// Create a Drawer Navigator
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  const handleLogout = () => {
    console.log("Logging out...");
    navigation.replace('Login');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Image source={require('@/assets/images/farm-logo.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>johndoe@email.com</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <IconSymbol size={24} name="logout" color="#FFD700" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default function TabLayout() {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />} 
      screenOptions={{
        headerShown: true,
        drawerStyle: styles.drawerStyle,
        drawerActiveTintColor: "#FFD700",
        drawerInactiveTintColor: "#FFF",
        drawerLabelStyle: styles.drawerLabel,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabsScreen}
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => <IconSymbol size={24} name="home" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Crops"
        component={CropsScreen}
        options={{
          title: 'Crops',
          drawerIcon: ({ color }) => <IconSymbol size={24} name="seedling" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Farmer"
        component={FarmerScreen}
        options={{
          title: 'Farmer',
          drawerIcon: ({ color }) => <IconSymbol size={24} name="person.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="FarmType"
        component={FarmTypeScreen}
        options={{
          title: 'Farm Type',
          drawerIcon: ({ color }) => <IconSymbol size={24} name="tree" color={color} />,
        }}
      />
      <Drawer.Screen
        name="User"
        component={UserScreen}
        options={{
          title: 'Users',
          drawerIcon: ({ color }) => <IconSymbol size={24} name="users" color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#2C3E50',
    paddingTop: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
    paddingBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  profileEmail: {
    fontSize: 14,
    color: '#EAEAEA',
  },
  drawerStyle: {
    backgroundColor: '#34495E',
    width: 260,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255,215,0,0.2)',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  logoutText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
