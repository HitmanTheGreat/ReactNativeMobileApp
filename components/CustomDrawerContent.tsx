// CustomDrawerContent.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CustomeIconSymbol from '@/components/ui/CustomeIconSymbol';
import { HelloWave } from '@/components/HelloWave';
import { useRouter } from 'expo-router';
import { logout } from '@/store/slices/userSlice';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
    const { navigation } = props;
    const user = useSelector((state: RootState) => state.user?.user);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/'); // Redirect to home page if no user
        }
    }, [user, router]);

    const handleLogout = async () => {
        try {
            dispatch(logout());
            router.push('/');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <LinearGradient colors={['#74C369', '#2D732E']} style={styles.gradientBackground}>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
                {/* Profile Header */}
                <View style={styles.profileContainer}>
                    <View style={styles.headerSection}>
                        <Image source={require('@/assets/images/farm-logo.png')} style={styles.profileImage} />
                    </View>
                    <Text style={styles.profileName}>
                        Hello : {user?.username?.toUpperCase() || 'Guest'} <HelloWave />
                    </Text>
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

const styles = StyleSheet.create({
    gradientBackground: { flex: 1 },
    drawerContainer: { flex: 1, paddingTop: 20 },
    headerSection: {
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#2D732E',
        paddingBottom: 15,
    },
    profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
    profileName: { fontSize: 18, fontWeight: 'bold', color: '#2D732E', textAlign: 'center' },
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
        backgroundColor: '#FFF',
        padding: 15,
        marginBottom: 20,
        marginHorizontal: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default CustomDrawerContent;
