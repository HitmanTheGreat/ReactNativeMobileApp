import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { RootState } from '@/store/store';
import { getRequest } from '@/constants/api';
import { logout } from '@/store/slices/userSlice';
import { useFocusEffect } from '@react-navigation/native';

const FarmersScreen = ({ navigation }) => {
    // Get token from userSlice in Redux store
    const token = useSelector((state: RootState) => state.user?.access); // Adjust the path based on your Redux state structure
    const router = useRouter();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [farmers, setFarmers] = useState<any[]>([]);

    useEffect(() => {
        // Reset search query when component mounts
        setSearchQuery('');

        // Fetch farmers when token is available
        if (token) {
            getRequest('/farmers/', {}, token)
                .then(response => {
                    // Assuming response is an array of farmers
                    setFarmers(response);
                })
                .catch(error => {
                    console.error(error);
                    Alert.alert('Error', 'Unable to fetch farmers.');
                });
        } else {
            dispatch(logout());
            router.push('/pages/login');
            Alert.alert('Error', 'No authentication token available.');
        }
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            if (token) {
                getRequest('/farmers/', {}, token)
                    .then(response => {
                        // Assuming response is an array of farmers
                        setFarmers(response);
                    })
                    .catch(error => {
                        console.error(error);
                        Alert.alert('Error', 'Unable to fetch farmers.');
                    });
            } else {
                dispatch(logout());
                router.push('/pages/login');
                Alert.alert('Error', 'No authentication token available.');
            }
        }, [token])
    );

    const filteredFarmers = farmers.filter(farmer =>
        farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderRightActions = (id: number) => (
        <View style={styles.actions}>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditFarmer', { farmerId: id })}>
                <Icon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
                <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    const handleDelete = (id: number) => {
        // Handle the delete action
        Alert.alert('Delete', `Are you sure you want to delete farmer with ID ${id}?`, [
            { text: 'Cancel' },
            {
                text: 'Delete', onPress: () => {
                    // Delete logic here
                    console.log(`Farmer ${id} deleted.`);
                }
            }
        ]);
    };

    const renderFarmer = ({ item }: { item: any }) => (
        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity onPress={() => navigation.navigate('FarmerDetails', { farmerId: item.id })}>
                <View style={styles.farmerCard}>
                    <Text style={styles.farmerName}>{item.name}</Text>
                    <Text style={styles.farmerUsername}>@{item.username}</Text>
                    <Text style={styles.farmerEmail}>{item.email}</Text>
                    <Text style={styles.farmerLocation}>Location: {item.location}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#aaa" style={styles.icon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search farmers..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View style={styles.spacer} />

            {/* Farmer List */}
            {filteredFarmers.length === 0 ? (
                <View style={styles.noItemsContainer}>
                    <Text style={styles.noItemsText}>No farmers to show</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredFarmers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFarmer}
                />
            )}

            {/* Add Farmer Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('FarmerAdd')}>
                <Icon name="user-plus" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F8F8',
    },
    farmerCard: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    farmerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    farmerUsername: {
        fontSize: 14,
        color: '#28A745',
        marginBottom: 4,
    },
    farmerEmail: {
        fontSize: 14,
        color: '#666',
    },
    farmerLocation: {
        fontSize: 12,
        color: '#aaa',
    },
    farmerCrops: {
        fontSize: 12,
        color: '#aaa',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#3498db',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#28A745',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    spacer: {
        height: 30, // Adjust this value for more or less space
    },
    noItemsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    noItemsText: {
        fontSize: 18,
        color: '#888',
    },
});

export default FarmersScreen;
