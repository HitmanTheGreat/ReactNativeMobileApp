import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { postRequest } from '@/constants/api';
import { ScrollView } from 'react-native-gesture-handler';

const FarmTypeAdd = () => {
    const [farmTypeData, setFarmTypeData] = useState({
        name: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.user.access);

    // Handle input changes
    const handleChange = (field, value) => {
        setFarmTypeData({ ...farmTypeData, [field]: value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!farmTypeData.name || !farmTypeData.description) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Please fill all fields.',
            });
            return;
        }

        try {
            setLoading(true);

            // Create FormData
            const formData = new FormData();
            formData.append('name', farmTypeData.name);
            formData.append('description', farmTypeData.description);

            // Submit data
            const result = await postRequest('/farm-types/', formData, token, true);

            if (result) {
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'Farm Type added successfully.',
                });
                setFarmTypeData({
                    name: '',
                    description: '',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: result.message || 'Failed to add Farm Type.',
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
                    <Text style={styles.title}>Add New Farm Type</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Farm Type Name</Text>
                        <TextInput
                            style={styles.input}
                            value={farmTypeData.name}
                            onChangeText={(text) => handleChange('name', text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={styles.input}
                            value={farmTypeData.description}
                            onChangeText={(text) => handleChange('description', text)}
                        />
                    </View>

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
        height: 50,
    },
});

export default FarmTypeAdd;
