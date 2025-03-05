import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';  // Import the toast notification
import axios from 'axios';  // Import axios for API calls
import { postRequest } from '@/constants/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureOld, setSecureOld] = useState(true);
    const [secureNew, setSecureNew] = useState(true);
    const [secureConfirm, setSecureConfirm] = useState(true);
    const token = useSelector((state: RootState) => state.user.access);  // Assuming user is stored in the Redux store
    const router = useRouter()
    // Function to handle form submission
    const handleSaveChanges = async () => {
        // Validate that none of the fields are empty
        if (!oldPassword || !newPassword || !confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please fill in all fields',
                position: 'bottom',
            });
            return;
        }

        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'New passwords do not match',
                position: 'bottom',
            });
            return;
        }

        // Check if the new password is at least 8 characters long
        if (newPassword.length < 8) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'New password must be at least 8 characters long',
                position: 'bottom',
            });
            return;
        }

        // Prepare data for the API request
        const data = {
            old_password: oldPassword,
            new_password: newPassword,
        };

        try {
            // Make the API call to the backend to change the password
            const response = await postRequest('/change-password/', data, token);

            // Show success message
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Password changed successfully!',
                position: 'bottom',
            });

            // Optionally, reset the fields after a successful change
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');

            setTimeout(() => {
                router.push('/')
            }, 2000);

        } catch (error) {
            // Handle any errors from the backend (e.g., invalid old password)
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response ? error.response.data.detail : 'An error occurred',
                position: 'bottom',
            });
        }
    };


    return (
        <LinearGradient colors={["#2D732E", "#74C369"]} style={styles.container}>
            <Animated.View entering={FadeInUp.duration(800)} style={styles.card}>
                <Text style={styles.title}>Change Password</Text>

                {/* Old Password */}
                <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Old Password"
                        placeholderTextColor="#999"
                        secureTextEntry={secureOld}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />
                    <TouchableOpacity onPress={() => setSecureOld(!secureOld)} style={styles.icon}>
                        <MaterialIcons name={secureOld ? "visibility-off" : "visibility"} size={24} color="#555" />
                    </TouchableOpacity>
                </Animated.View>

                {/* New Password */}
                <Animated.View entering={FadeInUp.delay(400).duration(800)} style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        placeholderTextColor="#999"
                        secureTextEntry={secureNew}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity onPress={() => setSecureNew(!secureNew)} style={styles.icon}>
                        <MaterialIcons name={secureNew ? "visibility-off" : "visibility"} size={24} color="#555" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Confirm New Password */}
                <Animated.View entering={FadeInUp.delay(600).duration(800)} style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        placeholderTextColor="#999"
                        secureTextEntry={secureConfirm}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)} style={styles.icon}>
                        <MaterialIcons name={secureConfirm ? "visibility-off" : "visibility"} size={24} color="#555" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Save Button */}
                <Animated.View entering={FadeInUp.delay(800).duration(800)} style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

            {/* Toast notification */}
            <Toast />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2D732E",
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: "#333",
    },
    icon: {
        padding: 10,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 10,
    },
    button: {
        backgroundColor: "#2D732E",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFD700",
    },
});

export default SettingsScreen;
