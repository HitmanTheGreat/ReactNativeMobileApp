import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const UsersAddScreen = ({ visible, onClose, onAddUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleAddUser = () => {
        if (name && email) {
            onAddUser({ id: Date.now().toString(), name, email });
            setName('');
            setEmail('');
            onClose();
        } else {
            alert('Please enter both name and email.');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="x" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Add New User</Text>

                    {/* Name Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter name"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* Email Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    {/* Add User Button */}
                    <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
                        <Icon name="user-plus" size={20} color="#fff" />
                        <Text style={styles.addButtonText}>Add User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'red',
        borderRadius: 15,
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 5,
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UsersAddScreen;
