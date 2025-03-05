import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native-gesture-handler';
import { getRequest, postRequest } from '@/constants/api';

const FarmerAddScreen = () => {
    const [farmerData, setFarmerData] = useState({
        name: '',
        nationalId: '',
        location: null,
        farm_type: '',
        crop: '',
        location: 'Harare', // Default to Harare
    });
    const [loading, setLoading] = useState(false);
    const [crops, setCrops] = useState([]);
    const [farmTypes, setFarmTypes] = useState([]);  // New state for farm types
    const token = useSelector((state) => state.user.access);

    // Predefined list of towns in Zimbabwe in alphabetical order
    const ZIMBABWE_TOWNS = [
        'Harare', 'Bulawayo', 'Mutare', 'Gweru', 'Kwekwe', 'Chinhoyi', 'Masvingo',
        'Kadoma', 'Marondera', 'Zvishavane', 'Victoria Falls', 'Kariba', 'Bindura', 'Chipinge'
    ];

    useEffect(() => {
        // Fetch all crops and farm types from API
        const fetchCropsAndFarmTypes = async () => {
            try {
                const cropResult = await getRequest('/crops/', {}, token);  // Adjust this API endpoint as necessary
                const farmTypeResult = await getRequest('/farm-types/', {}, token);  // Adjust this API endpoint for farm types

                if (cropResult && cropResult.length > 0) {
                    setCrops(cropResult); // Set the fetched crops to state
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error!',
                        text2: 'No crops found.',
                    });
                }

                if (farmTypeResult && farmTypeResult.length > 0) {
                    setFarmTypes(farmTypeResult); // Set the fetched farm types to state
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error!',
                        text2: 'No farm types found.',
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: error.message,
                });
            }
        };

        fetchCropsAndFarmTypes();
    }, []);

    const handleChange = (field, value) => {
        setFarmerData({ ...farmerData, [field]: value });
    };

    const handleSubmit = async () => {
        if (!farmerData.name || !farmerData.nationalId || !farmerData.farmType || !farmerData.crop || !farmerData.location) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Please fill all fields.',
            });
            return;
        }

        try {
            setLoading(true);

            // Prepare the form data
            const formData = {
                name: farmerData.name,
                national_id: farmerData.nationalId,
                farm_type: farmerData.farmType,
                crop: farmerData.crop,
                location: farmerData.location,
            };

            // Use postRequest to send data to the API
            const response = await postRequest('/farmers/', formData, token);

            // If successful, show success toast and clear form data
            Toast.show({
                type: 'success',
                text1: 'Success!',
                text2: 'Farmer added successfully.',
            });

            // Clear the form data
            setFarmerData({
                name: '',
                nationalId: '',
                farmType: '',
                crop: '',
                location: 'Harare', // Default location
            });

        } catch (error) {
            // Handle error
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
                    <Text style={styles.title}>Add New Farmer</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Farmer Name</Text>
                        <TextInput
                            style={styles.input}
                            value={farmerData.name}
                            onChangeText={(text) => handleChange('name', text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>National ID</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='eg. 00-00000000F00'
                            value={farmerData.nationalId}
                            onChangeText={(text) => handleChange('nationalId', text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Farm Type</Text>
                        <Picker
                            selectedValue={farmerData.farmType}
                            onValueChange={(itemValue) => handleChange('farmType', itemValue)}
                            style={styles.picker}
                        >
                            {farmTypes.map((farmType) => (
                                <Picker.Item key={farmType.id} label={farmType.name} value={farmType.id} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Crop</Text>
                        <Picker
                            selectedValue={farmerData.crop}
                            onValueChange={(itemValue) => handleChange('crop', itemValue)}
                            style={styles.picker}
                        >
                            {crops.map((crop) => (
                                <Picker.Item key={crop.id} label={crop.name} value={crop.id} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Location</Text>
                        <Picker
                            selectedValue={farmerData.location}
                            onValueChange={(itemValue) => handleChange('location', itemValue)}
                            style={styles.picker}
                        >
                            {ZIMBABWE_TOWNS.map((town) => (
                                <Picker.Item key={town} label={town} value={town} />
                            ))}
                        </Picker>
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
    picker: {
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

export default FarmerAddScreen;
