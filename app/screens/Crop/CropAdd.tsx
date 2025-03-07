import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { postRequest } from '@/constants/api';
import * as ImagePicker from 'expo-image-picker';

const CropsAddScreen = () => {
    const [cropData, setCropData] = useState({
        cropName: '',
        description: '',
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.user.access);

    const handleChange = (field, value) => {
        setCropData({ ...cropData, [field]: value });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setCropData({ ...cropData, image: result.assets[0].uri });
        }
    };

    const handleSubmit = async () => {
        if (!cropData.cropName || !cropData.description || !cropData.image) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Please fill all fields and upload an image.',
            });
            return;
        }

        try {
            setLoading(true);

            // Convert the image URI to Base64
            const response = await fetch(cropData.image);
            const blob = await response.blob();
            const reader = new FileReader();

            // Return a promise to wait for the Base64 encoding
            const base64Promise = new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    resolve(reader.result); // Base64 result
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(blob); // Convert to Base64
            });

            const base64Image = await base64Promise; // This will be in the format 'data:image/webp;base64,...'

            // Create FormData
            const formData = new FormData();
            formData.append('name', cropData.cropName);
            formData.append('description', cropData.description);
            formData.append('image', base64Image); // Submit Base64 string instead of Blob

            // Submit data
            const result = await postRequest('/crops/', formData, token);

            if (result) {
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'Crop added successfully.',
                });
                setCropData({
                    cropName: '',
                    description: '',
                    image: null,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: result.message || 'Failed to add crop.',
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
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Add New Crop</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Crop Name</Text>
                    <TextInput
                        style={styles.input}
                        value={cropData.cropName}
                        onChangeText={(text) => handleChange('cropName', text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        value={cropData.description}
                        onChangeText={(text) => handleChange('description', text)}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    <Text style={styles.imagePickerText}>Pick an Image</Text>
                </TouchableOpacity>
                {cropData.image && (
                    <Image source={{ uri: cropData.image }} style={styles.image} />
                )}

                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
        paddingHorizontal: 20, // Padding for better content spacing
    },
    formContainer: {
        width: '100%',
        maxWidth: 500, // Maximum width for large screens
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
    textarea: {
        height: 100,
        textAlignVertical: 'top',
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
    imagePicker: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    imagePickerText: {
        fontSize: 16,
        color: '#555',
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
    },
});

export default CropsAddScreen;
