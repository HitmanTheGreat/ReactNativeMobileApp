import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const ProfileScreen = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        fullName: "John Doe",
        email: "johndoe@example.com",
        phone: "+123 456 7890",
    });

    const toggleEdit = () => setIsEditing(!isEditing);

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeInUp.duration(800)} style={styles.card}>
                
                {/* Header with Edit/Save Button */}
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <TouchableOpacity onPress={toggleEdit} style={styles.editButton}>
                        <MaterialIcons name={isEditing ? "save" : "edit"} size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Profile Fields */}
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2D732E",
    },
    editButton: {
        backgroundColor: "#2D732E",
        padding: 10,
        borderRadius: 8,
    },
    inputContainer: {
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
    },
});

export default ProfileScreen;
