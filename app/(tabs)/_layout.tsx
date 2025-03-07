// TabLayout.js
import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import TabsScreen from '@/components/ui/TabsScreen';
import CropsScreen from '../screens/Crop';
import FarmerScreen from '../screens/Farmer';
import FarmTypeScreen from '../screens/FarmType';
import UserScreen from '../screens/User';
import CustomeIconSymbol from '@/components/ui/CustomeIconSymbol';
import { Text, View, StyleSheet } from 'react-native';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import FarmerDetailScreen from '../screens/Farmer/FarmerDetails';
import FarmerAddScreen from '../screens/Farmer/FarmerAdd';
import UserDetailsScreen from '../screens/User/UserDetails';
import UsersAddScreen from '../screens/User/UsersAdd';
import FarmTypeDetails from '../screens/FarmType/FarmTypeDetails';
import CropsAddScreen from '../screens/Crop/CropAdd';
import CropDetailsScreen from '../screens/Crop/CropDetails';
import FarmTypeAdd from '../screens/FarmType/FarmTypeAdd';

const Drawer = createDrawerNavigator();

export default function TabLayout() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user?.user);

  useEffect(() => {
    if (!user) {
      router.push('/'); // Redirect to home page if no user
    }
  }, [user, router]);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#2D732E' },
        headerTintColor: '#FFF',
        drawerStyle: styles.drawerStyle,
        drawerActiveTintColor: "#FFD700",
        drawerInactiveTintColor: "#FFF",
        drawerLabelStyle: styles.drawerLabel,
      }}
    >
      {/* Home Screen */}
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
          drawerIcon: () => null,
        }}
      />

      {/* Farmer Screen */}
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
        name="FarmerAdd"
        component={FarmerAddScreen}
        options={{
          title: 'Add Farmer',
          drawerItemStyle: { display: "none" },
          drawerIcon: () => null,
        }}
      />

      <Drawer.Screen
        name="FarmerDetails"
        component={FarmerDetailScreen}
        options={{
          title: 'Farmer Details',
          drawerItemStyle: { display: "none" }, // Hides the screen from the drawer
          drawerIcon: () => null,
        }}
      />

      {/* Admin Screens */}
      {user?.role === 'admin' && (
        <>
          {/* Crops */}
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
              drawerIcon: () => null,
            }}
          />
          <Drawer.Screen
            name="CropAdd"
            component={CropsAddScreen}
            options={{
              title: 'Add Crop',
              drawerItemStyle: { display: "none" }, // Hide from drawer
              drawerIcon: () => null,
            }}
          />
          <Drawer.Screen
            name="CropDetails"
            component={CropDetailsScreen}
            options={{
              title: 'Crop Details',
              drawerItemStyle: { display: "none" }, // Hide from drawer
              drawerIcon: () => null,
            }}
          />

          {/* Farm Type */}
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
            name="FarmTypeAdd"
            component={FarmTypeAdd}
            options={{
              title: 'Add Farm Type',
              drawerItemStyle: { display: "none" },
              drawerIcon: () => null,
            }}
          />
          <Drawer.Screen
            name="FarmTypeDetails"
            component={FarmTypeDetails}
            options={{
              title: 'Farm Type Details',
              drawerItemStyle: { display: "none" },
              drawerIcon: () => null,
            }}
          />

          {/* Users */}
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
          <Drawer.Screen
            name="UserAdd"
            component={UsersAddScreen}
            options={{
              title: 'Add User',
              drawerItemStyle: { display: "none" },
              drawerIcon: () => null,
            }}
          />
          <Drawer.Screen
            name="UserDetails"
            component={UserDetailsScreen}
            options={{
              title: 'User Details',
              drawerItemStyle: { display: "none" },
              drawerIcon: () => null,
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerStyle: { width: 260 },
  drawerLabel: { fontSize: 16, fontWeight: 'bold' },
  drawerItem: { flexDirection: 'row', alignItems: 'center' },
  drawerText: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});
