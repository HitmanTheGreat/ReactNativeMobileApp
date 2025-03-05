import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import Toast from 'react-native-toast-message';
import { postRequest } from '@/constants/api';
import { ScrollView } from 'react-native-gesture-handler';

const UsersAddScreen = () => {
    const [userData, setUserData] = useState({
        username: '',  // Added username field
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false); // Optional: For handling loading state

    // Get the token from Redux state
    const token = useSelector((state) => state.user.access); // Assuming the token is stored in state.user.access

    const handleChange = (field, value) => {
        setUserData({ ...userData, [field]: value });
    };

    const handleSubmit = async () => {
        // Validation: Check if all required fields are filled
        if (!userData.username || !userData.fullName || !userData.email || !userData.password || !userData.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Please fill all fields before submitting.',
            });
            return; // Prevent submission if any field is empty
        }

        // Validation: Check if password and confirmPassword match
        if (userData.password !== userData.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Passwords do not match.',
            });
            return;
        }

        try {
            setLoading(true);
            // Prepare the data with the always required fields
            const dataToSubmit = {
                username: userData.username,
                fullName: userData.fullName,
                email: userData.email,
                phone: userData.phone || '', // If phone is empty, send an empty string
                password: userData.password,
            };

            const response = await postRequest('/users/', dataToSubmit, token);

            if (response) {
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'User added successfully.',
                });
                // Clear form data after successful submission
                setUserData({
                    username: '',
                    fullName: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
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
            setLoading(false); // Optionally handle the loading state
        }
    };


    return (
        <ScrollView>
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

                    {/* Full Name Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.fullName}
                            onChangeText={(text) => handleChange('fullName', text)}
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
            </View >
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
    },
    formContainer: {
        width: '80%',
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
        height: 50, // Adjust this value for more or less space
    },
});

export default UsersAddScreen;
