import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
    View, Text, TextInput, FlatList, StyleSheet, Alert, Modal
} from 'react-native';
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

    const [modalVisible, setModalVisible] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');

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

    const handleAddUser = () => {
        if (!newUserName || !newUserEmail) {
            Alert.alert("Error", "Please enter both name and email.");
            return;
        }

        const newUser = {
            id: (users.length + 1).toString(),
            name: newUserName,
            email: newUserEmail,
        };

        setUsers([...users, newUser]);
        setNewUserName('');
        setNewUserEmail('');
        setModalVisible(false);
    };

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

            {/* Add User Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Icon name="user-plus" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Fullscreen Add User Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Icon name="x" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Add New User</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter name"
                            value={newUserName}
                            onChangeText={setNewUserName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter email"
                            value={newUserEmail}
                            onChangeText={setNewUserEmail}
                            keyboardType="email-address"
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={handleAddUser}>
                            <Text style={styles.saveButtonText}>Add User</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        padding: 10,
    },
    viewButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 5, marginHorizontal: 5 },
    editButton: { backgroundColor: '#FFA500', padding: 12, borderRadius: 5, marginHorizontal: 5 },
    deleteButton: { backgroundColor: '#FF3B30', padding: 12, borderRadius: 5, marginHorizontal: 5 },

    // Add Button
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


    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default UsersScreen;
