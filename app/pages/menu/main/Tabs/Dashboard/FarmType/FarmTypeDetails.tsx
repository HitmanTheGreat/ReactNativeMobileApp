import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { getRequest, putRequest, deleteRequest } from '@/constants/api'; // Include the necessary API requests
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Toast from 'react-native-toast-message';
import RNPickerSelect from 'react-native-picker-select'; // Picker for dropdown selection
import AsyncStorage from '@react-native-async-storage/async-storage'; // For offline storage

// Define types for the farmer data and props
interface FarmerData {
    [key: string]: string | number;
}

interface FarmTypeDetailsProps {
    route: {
        params: {
            farmTypeId: string;
        };
    };
}

const FarmTypeDetails: React.FC<FarmTypeDetailsProps> = ({ route }) => {
    const { farmTypeId } = route.params;  // Extract farmTypeId from navigation params
    const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);  // State to handle loading spinner
    const [offlineData, setOfflineData] = useState<FarmerData | null>(null); // State for offline edits
    const navigation = useNavigation();
    const token = useSelector((state: RootState) => state.user.access); // Retrieve token from Redux

    useEffect(() => {
        // Function to fetch farmer data on mount (tries to load from AsyncStorage if offline)
        const fetchFarmerData = async () => {
            try {
                const storedData = await AsyncStorage.getItem(`farmerData_${farmTypeId}`);
                if (storedData) {
                    setFarmerData(JSON.parse(storedData));  // Set data from AsyncStorage if available
                } else {
                    const response = await getRequest(`/farm-types/${farmTypeId}/`, {}, token);
                    setFarmerData(response);  // Set fetched data from server
                }
            } catch (error) {
                console.error('Error fetching farmer data:', error);
            } finally {
                setIsLoading(false);  // Set loading state to false after fetching data
            }
        };

        fetchFarmerData();
    }, [farmTypeId, token]);

    const toggleEdit = () => {
        if (isEditing) {
            handleSave();  // Save changes when exiting edit mode
        } else {
            setIsEditing(!isEditing);  // Toggle editing mode
        }
    };

    const handleDelete = async () => {
        try {
            await deleteRequest(`/farm-types/${farmTypeId}/`, {}, token);  // Send DELETE request
            navigation.goBack();  // Navigate back after successful deletion
        } catch (error) {
            console.error('Error deleting farmer:', error);
        } finally {
            setIsModalVisible(false);  // Close delete confirmation modal
        }
    };

    const handleSave = async () => {
        try {
            if (token) {
                // If online, sync data with the server
                await putRequest(`/farm-types/${farmTypeId}/`, farmerData, token);  // Send PUT request to save data
                setIsEditing(false);  // Disable edit mode after saving
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'Farmer data has been saved successfully.',
                });
            } else {
                // If offline, store locally in AsyncStorage
                await AsyncStorage.setItem(`farmerData_${farmTypeId}`, JSON.stringify(farmerData));
                Toast.show({
                    type: 'info',
                    text1: 'Offline Mode',
                    text2: 'Changes have been saved locally and will be synced when online.',
                });
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error saving farmer data:', error);
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Failed to save farmer data. Please try again.',
            });
        }
    };

    const handleChange = (key: string, value: string) => {
        setFarmerData((prevData) => ({ ...prevData, [key]: value }));
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
            paddingRight: 30,  // To give space for the icon
        },
        inputAndroid: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30,  // To give space for the icon
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
                {/* Header with Edit, Save, and Delete buttons */}
                <View style={styles.header}>
                    <Text style={styles.title}>Farmer Type Details</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={toggleEdit} style={styles.actionButton}>
                            <MaterialIcons name={isEditing ? "save" : "edit"} size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={[styles.actionButton, styles.deleteButton]}>
                            <MaterialIcons name="delete" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Display Farmer Details */}
                {Object.keys(farmerData || {})
                    .filter(key => !['id', 'createdAt', 'updatedAt'].includes(key)) // Skip unnecessary fields
                    .map((key, index) => (
                        <Animated.View key={key} entering={FadeInUp.delay(200 * index).duration(600)} style={styles.inputContainer}>
                            <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</Text>

                            {/* Conditionally render a dropdown for 'farmerType' */}
                            {key === 'farmerType' ? (
                                isEditing ? (
                                    <RNPickerSelect
                                        style={pickerSelectStyles}
                                        value={farmerData[key] as string}
                                        onValueChange={(value) => handleChange('farmerType', value)}
                                        items={[
                                            { label: 'Small Scale', value: 'small_scale' },
                                            { label: 'Commercial', value: 'commercial' },
                                        ]}
                                    />
                                ) : (
                                    <Text style={styles.text}>{farmerData[key]}</Text>
                                )
                            ) : (
                                isEditing ? (
                                    <TextInput
                                        style={styles.input}
                                        value={farmerData[key] as string}
                                        onChangeText={(text) => handleChange(key, text)}
                                    />
                                ) : (
                                    <Text style={styles.text}>{farmerData[key]}</Text>
                                )
                            )}
                        </Animated.View>
                    ))}
            </Animated.View>

            {/* Delete Confirmation Modal */}
            <Modal visible={isModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to delete this farmer?</Text>
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
});

export default FarmTypeDetails;
