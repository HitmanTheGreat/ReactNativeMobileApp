import React, { useState, useEffect } from 'react';
import { router, useNavigation, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { RootState } from '@/store/store';
import { getRequest } from '@/constants/api';
import { logout } from '@/store/slices/userSlice';
import { useFocusEffect } from '@react-navigation/native';

const UsersScreen = ({ navigation }) => {

    // Get token from userSlice in Redux store
    const token = useSelector((state: RootState) => state.user?.access); // Adjust the path based on your Redux state structure
    const router = useRouter()
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        // Reset search query when component mounts
        setSearchQuery('');

        // Fetch users when token is available
        if (token) {
            getRequest('/users/', {}, token)
                .then(response => {
                    // Assuming response is an array of users
                    setUsers(response);
                })
                .catch(error => {
                    console.error(error);
                    Alert.alert('Error', 'Unable to fetch users.');
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
                getRequest('/users/', {}, token)
                    .then(response => {
                        // Assuming response is an array of users
                        setUsers(response);
                    })
                    .catch(error => {
                        console.error(error);
                        Alert.alert('Error', 'Unable to fetch users.');
                    });
            } else {
                dispatch(logout());
                router.push('/pages/login');
                Alert.alert('Error', 'No authentication token available.');
            }
        }, [token])
    );


    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderRightActions = (id: number) => (
        <View style={styles.actions}>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditUser', { userId: id })}>
                <Icon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
                <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    const handleDelete = (id: number) => {
        // Handle the delete action
        Alert.alert('Delete', `Are you sure you want to delete user with ID ${id}?`, [
            { text: 'Cancel' },
            {
                text: 'Delete', onPress: () => {
                    // Delete logic here
                    console.log(`User ${id} deleted.`);
                }
            }
        ]);
    };

    const renderUser = ({ item }: { item: any }) => (
        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { userId: item.id })}>
                <View style={styles.userCard}>
                    <Text style={styles.userName}>{item.first_name} {item.last_name}</Text>
                    <Text style={styles.userUsername}>@{item.username}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                    <Text style={styles.userDateJoined}>Joined: {new Date(item.date_joined).toLocaleDateString()}</Text>
                    <Text style={styles.userLastLogin}>Last Login: {new Date(item.last_login).toLocaleDateString()}</Text>
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
                    placeholder="Search users..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>


            <View style={styles.spacer} />

            {/* User List */}
            {filteredUsers.length === 0 ? (
                <View style={styles.noItemsContainer}>
                    <Text style={styles.noItemsText}>No users to show</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredUsers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderUser}
                />
            )}


            {/* Add User Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('UserAdd')}>
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
    userCard: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userUsername: {
        fontSize: 14,
        color: '#28A745',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    userDateJoined: {
        fontSize: 12,
        color: '#aaa',
    },
    userLastLogin: {
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

export default UsersScreen;
