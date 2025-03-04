import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { Layout, LightSpeedOutRight } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const UsersScreen = () => {
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([
        { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
        { id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
        { id: '4', name: 'Bob Brown', email: 'bob.brown@example.com' },
    ]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deleteUser = (id: string) => {
        setUsers(users.filter(user => user.id !== id));
        Alert.alert("Deleted", "User has been removed.");
    };

    const renderRightActions = (item: { id: string, name: string, email: string }) => (
        <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.viewButton} onPress={() => Alert.alert('View', `Viewing ${item.name}`)}>
                <Icon name="eye" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => Alert.alert('Edit', `Editing ${item.name}`)}>
                <Icon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUser(item.id)}>
                <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search users..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* User List */}
            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Animated.View layout={Layout.springify()} exiting={LightSpeedOutRight}>
                        <Swipeable renderRightActions={() => renderRightActions(item)}>
                            <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { user: item })}>
                                <View style={styles.userCard}>
                                    <Text style={styles.userName}>{item.name}</Text>
                                    <Text style={styles.userEmail}>{item.email}</Text>
                                </View>
                            </TouchableOpacity>
                        </Swipeable>
                    </Animated.View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F8F8',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
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
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    viewButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    editButton: {
        backgroundColor: '#FFA500',
        padding: 12,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        padding: 12,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});

export default UsersScreen;
