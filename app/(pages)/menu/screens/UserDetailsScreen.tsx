import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const UserDetailsScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(user);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleEdit = () => setIsEditing(!isEditing);

    const handleDelete = () => {
        setIsModalVisible(false);
        // Handle user deletion logic here
        navigation.goBack(); // Navigate back after deleting
    };

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeInUp.duration(800)} style={styles.card}>

                {/* Header with Edit, Save & Delete Buttons */}
                <View style={styles.header}>
                    <Text style={styles.title}>User Details</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={toggleEdit} style={styles.actionButton}>
                            <MaterialIcons name={isEditing ? "save" : "edit"} size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={[styles.actionButton, styles.deleteButton]}>
                            <MaterialIcons name="delete" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* User Details */}
                {Object.keys(userData).map((key, index) => (
                    <Animated.View key={key} entering={FadeInUp.delay(200 * index).duration(600)} style={styles.inputContainer}>
                        <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={userData[key]}
                                onChangeText={(text) => setUserData({ ...userData, [key]: text })}
                            />
                        ) : (
                            <Text style={styles.text}>{userData[key]}</Text>
                        )}
                    </Animated.View>
                ))}
            </Animated.View>

            {/* Delete Confirmation Modal */}
            <Modal visible={isModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to delete this user?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.modalButton, styles.cancelButton]}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDelete} style={[styles.modalButton, styles.confirmButton]}>
                                <Text style={styles.modalButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
    card: { width: "100%", backgroundColor: "#fff", borderRadius: 15, padding: 20, elevation: 5, shadowColor: "#000", shadowOffset: { width: 2, height: 4 }, shadowOpacity: 0.2, shadowRadius: 4 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    title: { fontSize: 22, fontWeight: "bold", color: "#2D732E" },
    buttonContainer: { flexDirection: "row" },
    actionButton: { backgroundColor: "#2D732E", padding: 10, borderRadius: 8, marginLeft: 10 },
    deleteButton: { backgroundColor: "#D32F2F" },
    inputContainer: { marginBottom: 15 },
    label: { fontSize: 14, fontWeight: "bold", color: "#555", marginBottom: 5 },
    input: { backgroundColor: "#F5F5F5", padding: 10, borderRadius: 8, fontSize: 16, color: "#333" },
    text: { fontSize: 16, color: "#333", paddingVertical: 10 },

    // Modal Styles
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
    modalContent: { width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
    modalText: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
    modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
    modalButton: { flex: 1, padding: 10, alignItems: "center", borderRadius: 8, marginHorizontal: 5 },
    cancelButton: { backgroundColor: "#757575" },
    confirmButton: { backgroundColor: "#D32F2F" },
    modalButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default UserDetailsScreen;
