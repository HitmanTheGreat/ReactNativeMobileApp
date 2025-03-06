import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { getRequest, patchRequest, deleteRequest, putRequest } from '@/constants/api'; // Include the patchRequest and deleteRequest
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Toast from 'react-native-toast-message';
import RNPickerSelect from 'react-native-picker-select'; // Import the picker

const UserDetailsScreen = ({ route }) => {
    const { userId } = route.params;  // Get userId from the navigation params
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);  // For loading state
    const navigation = useNavigation();
    const token = useSelector((state: RootState) => state.user.access); // Adjust the path based on your Redux state structure

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getRequest(`/users/${userId}/`, {}, token);
                setUserData(response);  // Assuming the user data is inside response.data
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const toggleEdit = () => {
        if (isEditing) {
            handleSave();
        } else {
            // If not editing, just toggle the edit mode
            setIsEditing(!isEditing);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteRequest(`/users/${userId}/`, {}, token);  // Send DELETE request
            navigation.goBack(); // Redirect to the previous screen after successful deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setIsModalVisible(false); // Close modal
        }
    };

    const handleSave = async () => {
        try {
            // Attempt to send the updated data using a PUT request
            await putRequest(`/users/${userId}/`, userData, token);
            setIsEditing(false); // Disable editing after saving

            // Show success toast
            Toast.show({
                type: 'success',
                text1: 'Success!',
                text2: 'User data has been saved successfully.',
            });
        } catch (error) {
            // Show an error toast if there's an issue during the save
            console.error('Error saving user data:', error);
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Failed to save user data. Please try again.',
            });
        }
    };

    const handleChange = (key, value) => {
        setUserData(prevData => ({ ...prevData, [key]: value }));
    };

    const pickerSelectStyles = {
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30, // to give space for the icon
        },
        inputAndroid: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30, // to give space for the icon
        },
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

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
                {Object.keys(userData)
                    .filter(key => !['id', 'username', 'password', 'last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions'].includes(key)) // Skip these fields
                    .map((key, index) => (
                        <Animated.View key={key} entering={FadeInUp.delay(200 * index).duration(600)} style={styles.inputContainer}>
                            <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</Text>

                            {/* Conditionally render a dropdown for 'role' using RNPickerSelect */}
                            {key === 'role' ? (
                                isEditing ? (
                                    <RNPickerSelect
                                        style={pickerSelectStyles}
                                        value={userData[key]} // The selected value of the dropdown
                                        onValueChange={(value) => handleChange('role', value)} // Updates the role value
                                        items={[
                                            { label: 'Clerk', value: 'clerk' },
                                            { label: 'Admin', value: 'admin' },
                                        ]}
                                    />
                                ) : (
                                    <Text style={styles.text}>{userData[key]}</Text>
                                )
                            ) : (
                                isEditing ? (
                                    <TextInput
                                        style={styles.input}
                                        value={userData[key]}
                                        onChangeText={(text) => setUserData({ ...userData, [key]: text })}
                                    />
                                ) : (
                                    <Text style={styles.text}>{userData[key]}</Text>
                                )
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
            {/* Toast Notification */}
            <Toast />
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
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to give space for the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to give space for the icon
    },
});

export default UserDetailsScreen;
