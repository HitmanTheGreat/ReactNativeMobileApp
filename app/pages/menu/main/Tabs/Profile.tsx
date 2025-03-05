import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';  // Make sure to have axios installed
import { RootState } from '@/store/store';
import { patchRequest } from '@/constants/api';

const ProfileScreen = () => {
    const user = useSelector((state: RootState) => state.user.user);  // Assuming user is stored in the Redux store
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(user);
    const [tempProfile, setTempProfile] = useState(user);
    const [loading, setLoading] = useState(false);

    const token = useSelector((state: RootState) => state.user.access);  // Assuming user is stored in the Redux store

    const toggleEdit = () => {
        if (isEditing) {
            setProfile(tempProfile); // Save changes
        } else {
            setTempProfile(profile); // Backup current data
        }
        setIsEditing(!isEditing);
    };

    const cancelEdit = () => {
        setProfile(tempProfile); // Restore original data
        setIsEditing(false);
    };

    const handleSave = async () => {
        // Check if the email is valid
        if (profile.email && !validateEmail(profile.email)) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Invalid email address!',
            });
            return; // Exit the function if email is invalid
        }

        try {
            setLoading(true);

            // Prepare the endpoint and data

            // Perform PATCH request to update user data
            const response = await patchRequest(`/users/${profile.id}/`, profile, token);

            // If successful, show a success toast
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Profile updated successfully!',
            });
            setIsEditing(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);

            // If an error occurs, show an error toast
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error updating profile!',
                text2: error.response?.data?.detail || 'Something went wrong.',
            });
        }
    };


    const validateEmail = (email: string) => {
        // Regular expression for validating email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };


    useEffect(() => {
        // If the profile is not set properly, you can update it from the Redux store
        setProfile(user);
        setTempProfile(user);
    }, [user]);

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('@/assets/images/avater.png')}
                        style={styles.avatar}
                    />
                </View>

                <Animated.View entering={FadeInUp.duration(800)} style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Profile</Text>
                        <View style={styles.buttonContainer}>
                            {isEditing && (
                                <TouchableOpacity onPress={cancelEdit} style={[styles.button, styles.cancelButton]}>
                                    <MaterialIcons name="close" size={24} color="white" />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={toggleEdit} style={styles.button}>
                                <MaterialIcons name={isEditing ? "save" : "edit"} size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {Object.keys(profile)
                        .filter((key) => !['id', 'is_staff', 'role', 'username'].includes(key)) // Skip id and is_staff
                        .map((key, index) => (
                            <Animated.View key={key} entering={FadeInUp.delay(200 * index).duration(600)} style={styles.inputContainer}>
                                {/* Capitalize label and split words by underscores */}
                                <Text style={styles.label}>
                                    {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').toUpperCase()}
                                </Text>

                                {isEditing ? (
                                    <TextInput
                                        style={styles.input}
                                        value={profile[key]}
                                        onChangeText={(text) => setProfile({ ...profile, [key]: text })}
                                    />
                                ) : (
                                    <Text style={styles.text}>{profile[key]}</Text>
                                )}
                            </Animated.View>
                        ))}



                    {isEditing && (
                        <TouchableOpacity onPress={handleSave} style={[styles.button, styles.saveButton]} disabled={loading}>
                            <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
                        </TouchableOpacity>
                    )}
                </Animated.View>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F4F8",
    },
    profileContainer: {
        alignItems: "center",
        width: "90%",
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingTop: 50,
    },
    avatarContainer: {
        position: "absolute",
        top: -50,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#2D732E",
        elevation: 6,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    card: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2D732E",
    },
    buttonContainer: {
        flexDirection: "row",
    },
    button: {
        backgroundColor: "#2D732E",
        padding: 10,
        borderRadius: 8,
        marginLeft: 8,
    },
    cancelButton: {
        backgroundColor: "#D9534F",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#555",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#F5F5F5",
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        color: "#333",
    },
    text: {
        fontSize: 16,
        color: "#333",
        paddingVertical: 10,
        textAlign: "center",
    },
    saveButton: {
        backgroundColor: "#28a745",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});

export default ProfileScreen;
