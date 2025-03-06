import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TabsScreen from '@/components/ui/TabsScreen';
import CropsScreen from '../screens/Crop';
import FarmerScreen from '../screens/Farmer';
import FarmTypeScreen from '../screens/FarmType';
import UserScreen from '../screens/User';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CustomeIconSymbol from '@/components/ui/CustomeIconSymbol';
import { HelloWave } from '@/components/HelloWave';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const user = useSelector((state: RootState) => state.user?.user);

  const handleLogout = () => {
    console.log("Logging out...");
    navigation.replace('Login');
  };

  return (
    <LinearGradient colors={['#74C369', '#2D732E']} style={styles.gradientBackground}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>

        {/* Profile Header */}
        <View style={styles.profileContainer}>
          <View style={styles.headerSection}>
            <Image source={require('@/assets/images/farm-logo.png')} style={styles.profileImage} />
          </View>
          <Text style={styles.profileName}>Hello : {user.username.toUpperCase()}  <HelloWave /> </Text>
        </View>


        {/* Drawer Items */}
        <DrawerItemList {...props} />

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <CustomeIconSymbol size={24} name="logout" color="#FFD700" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

export default function TabLayout() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#2D732E' }, // Green top bar
        headerTintColor: '#FFF', // White text/icons in the header
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
          drawerLabel: ({ color }) => (
            <View style={styles.drawerItem}>
              <CustomeIconSymbol size={20} name="home" color={color} />
              <Text style={[styles.drawerText, { color }]}>Home</Text>
            </View>
          ),
          drawerIcon: () => null, // Hide default icon
        }}
      />
      <Drawer.Screen
        name="Crops"
        component={CropsScreen}
        options={{
          title: 'Crops',
          drawerLabel: ({ color }) => (
            <View style={styles.drawerItem}>
              <CustomeIconSymbol size={20} name="grass" color={color} />
              <Text style={[styles.drawerText, { color }]}>Crops</Text>
            </View>
          ),
          drawerIcon: () => null, // Hide default icon
        }}
      />

      <Drawer.Screen
        name="Farmer"
        component={FarmerScreen}
        options={{
          title: 'Farmer',
          drawerLabel: ({ color }) => (
            <View style={styles.drawerItem}>
              <CustomeIconSymbol size={20} name="person" color={color} />
              <Text style={[styles.drawerText, { color }]}>Farmer</Text>
            </View>
          ),
          drawerIcon: () => null,
        }}
      />

      <Drawer.Screen
        name="FarmType"
        component={FarmTypeScreen}
        options={{
          title: 'Farm Type',
          drawerLabel: ({ color }) => (
            <View style={styles.drawerItem}>
              <CustomeIconSymbol size={20} name="nature" color={color} />
              <Text style={[styles.drawerText, { color }]}>Farm Type</Text>
            </View>
          ),
          drawerIcon: () => null,
        }}
      />

      <Drawer.Screen
        name="User"
        component={UserScreen}
        options={{
          title: 'Users',
          drawerLabel: ({ color }) => (
            <View style={styles.drawerItem}>
              <CustomeIconSymbol size={20} name="group" color={color} />
              <Text style={[styles.drawerText, { color }]}>Users</Text>
            </View>
          ),
          drawerIcon: () => null,
        }}
      />
    </Drawer.Navigator>
  );
}


// Styles
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2D732E',
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
    color: '#2D732E',
    textAlign: 'center'
  },
  drawerStyle: {
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
  profileContainer: {
    backgroundColor: '#FFF', // White background for the paper effect
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10, // Space between icon and text
  },
});
