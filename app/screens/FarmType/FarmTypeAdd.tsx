import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { createFarmType } from '@/store/thunks/farmTypeThunk';
import { RootState } from '@/store/store';

interface FarmTypeData {
    name: string;
    description: string;
}

const FarmTypeAdd: React.FC = () => {
    const [farmTypeData, setFarmTypeData] = useState<FarmTypeData>({
        name: '',
        description: '',
    });
    const dispatch = useDispatch();
    const status = useSelector((state: RootState) => state.farmType.status);
    const error = useSelector((state: RootState) => state.farmType.error);
    
    // Handle input changes
    const handleChange = (field: keyof FarmTypeData, value: string) => {
        setFarmTypeData((prevState) => ({ ...prevState, [field]: value }));
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
            // Dispatch the createFarmType action
            await dispatch(createFarmType(farmTypeData));

            if (status === 'succeeded') {
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'Farm Type added successfully.',
                });
                setFarmTypeData({
                    name: '',
                    description: '',
                });
            } else if (status === 'failed' && error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: error,
                });
            }
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: error.message || 'An error occurred.',
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
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

                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={status === 'loading'}>
                    <Text style={styles.buttonText}>{status === 'loading' ? 'Submitting...' : 'Submit'}</Text>
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
        padding: 20, // Optional padding to prevent the content from sticking to the edges
    },
    formContainer: {
        width: '100%',
        maxWidth: 600, // Limit the width for larger screens
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
});

export default FarmTypeAdd;
