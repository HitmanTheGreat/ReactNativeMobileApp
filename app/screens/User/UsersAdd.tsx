import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import Toast from 'react-native-toast-message';
import { postRequest } from '@/constants/api';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker'; // Updated import for Picker

const UsersAddScreen = () => {
    const [userData, setUserData] = useState({
        username: '',
        firstName: '',  // Updated to first name
        lastName: '',   // Added last name
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'clerk',  // Default role
    });

    const [loading, setLoading] = useState(false);

    const token = useSelector((state) => state.user.access); // Assuming the token is stored in state.user.access

    const handleChange = (field, value) => {
        setUserData({ ...userData, [field]: value });
    };

    const handleSubmit = async () => {
        // Check if any field is empty
        if (!userData.username || !userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Please fill all fields before submitting.',
            });
            return;
        }

        // Check if passwords match
        if (userData.password !== userData.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Passwords do not match.',
            });
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Please enter a valid email address.',
            });
            return;
        }

        try {
            setLoading(true);
            const dataToSubmit = {
                username: userData.username,
                firstName: userData.firstName, // Send the first name
                lastName: userData.lastName,   // Send the last name
                email: userData.email,
                phone: userData.phone || '',
                password: userData.password,
                role: userData.role, // Send the role
            };

            const response = await postRequest('/users/', dataToSubmit, token);

            if (response) {
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'User added successfully.',
                });
                setUserData({
                    username: '',
                    firstName: '',  // Reset first name
                    lastName: '',   // Reset last name
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    role: 'clerk',  // Reset role after submission
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: response.message || 'Failed to add user.',
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <View style={styles.spacer} />
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Add New User</Text>

                    {/* Username Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.username}
                            onChangeText={(text) => handleChange('username', text)}
                        />
                    </View>

                    {/* First Name Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.firstName}
                            onChangeText={(text) => handleChange('firstName', text)}
                        />
                    </View>

                    {/* Last Name Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.lastName}
                            onChangeText={(text) => handleChange('lastName', text)}
                        />
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.email}
                            onChangeText={(text) => handleChange('email', text)}
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Phone Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.phone}
                            onChangeText={(text) => handleChange('phone', text)}
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.password}
                            onChangeText={(text) => handleChange('password', text)}
                            secureTextEntry={true}
                        />
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.confirmPassword}
                            onChangeText={(text) => handleChange('confirmPassword', text)}
                            secureTextEntry={true}
                        />
                    </View>

                    {/* Role Dropdown */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Role</Text>
                        <Picker
                            selectedValue={userData.role}
                            onValueChange={(itemValue) => handleChange('role', itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Clerk" value="clerk" />
                            <Picker.Item label="Admin" value="admin" />
                        </Picker>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                        <Text style={styles.buttonText}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Toast Container */}
                <Toast />
                <View style={styles.spacer} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // Existing styles
    picker: {
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
        paddingHorizontal: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    formContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D732E',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#2D732E',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    spacer: {
        height: 50,
    },
});

export default UsersAddScreen;
