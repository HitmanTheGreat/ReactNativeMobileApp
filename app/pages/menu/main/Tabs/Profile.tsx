import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const ProfileScreen = () => {
    const initialProfile = {
        fullName: "John Doe",
        email: "johndoe@example.com",
        phone: "+123 456 7890",
    };

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(initialProfile);
    const [tempProfile, setTempProfile] = useState(initialProfile);

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

                    {Object.keys(profile).map((key, index) => (
                        <Animated.View key={key} entering={FadeInUp.delay(200 * index).duration(600)} style={styles.inputContainer}>
                            <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</Text>
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
                </Animated.View>
            </View>
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
});

export default ProfileScreen;
