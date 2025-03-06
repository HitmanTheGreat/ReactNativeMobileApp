import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { postRequest } from '@/constants/api';
import { ScrollView } from 'react-native-gesture-handler';
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
    
            // Convert image URI to Blob
            const response = await fetch(cropData.image);
            const blob = await response.blob();
    
            // Create FormData
            const formData = new FormData();
            formData.append('name', cropData.cropName);
            formData.append('description', cropData.description);
            formData.append('image', blob, 'crop_image.jpg'); // Append the Blob directly
    
            // Submit data
            const result = await postRequest('/crops/', formData, token, true);
    
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
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.spacer} />
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
                <View style={styles.spacer} />
            </View>
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
    spacer: {
        height: 50,
    },
});

export default CropsAddScreen;
