import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'; // Add Stack Navigator
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabsScreen from '@/components/ui/TabsScreen';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from Expo (or react-native-linear-gradient)
import { StyleSheet } from 'react-native';
import CropsScreen from '../screens/Crop';
import FarmTypeScreen from '../screens/FarmType'; // Import the FarmType screen
import FarmerScreen from '../screens/Farmer'; // Import the Farmer screen
import UserScreen from '../screens/User'; // Import the User screen

// Create a Drawer Navigator
const Drawer = createDrawerNavigator();

// Create a Stack Navigator for Tab Navigation
const Stack = createStackNavigator();

export default function TabLayout() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true, // Show the header
      }}>
      {/* Drawer Screen for Tabs (Stack Navigator here) */}
      <Drawer.Screen
        name="Home"
        component={TabsScreen} // This component will contain the Tabs navigation
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => <IconSymbol size={24} name="home" color={color} />,
        }}
      />

      {/* Drawer Screens for Additional Sections */}
      <Drawer.Screen
        name="Farmer"
        component={FarmerScreen} // Replace with your actual Farmer screen
        options={{
          title: 'Farmer',
          drawerIcon: ({ color }) => <IconSymbol size={24} name="user" color={color} />,
        }}
      />

      <Drawer.Screen
        name="Crops"
        component={CropsScreen} // Replace with your actual Crops screen
        options={{
          title: 'Crops',
          drawerIcon: ({ color }) => <IconSymbol size={24} name="seedling" color={color} />,
        }}
      />

      <Drawer.Screen
        name="FarmType"
        component={FarmTypeScreen} // Replace with your actual FarmType screen
        options={{
          title: 'Farm Types',
          drawerIcon: ({ color }) => <IconSymbol size={24} name="tree" color={color} />,
        }}
      />

      <Drawer.Screen
        name="User"
        component={UserScreen} // Replace with your actual User screen
        options={{
          title: 'Users',
          drawerIcon: ({ color }) => <IconSymbol size={24} name="users" color={color} />,
        }}
      />
      
    </Drawer.Navigator>
  );
}

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
