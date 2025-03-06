import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { RootState } from '@/store/store';
import { fetchFarmTypes, createFarmType, updateFarmType, deleteFarmType, FarmType } from '@/store/thunks/farmTypeThunk';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const FarmTypeScreen = ({ navigation }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.user?.access);
    const isConnected = useSelector((state: RootState) => state.network.isConnected);
    const farmTypes = useSelector((state: RootState) => state.farmType.data);
    const fetchStatus = useSelector((state: RootState) => state.farmType.status);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (token) {
            dispatch(fetchFarmTypes());
        } else {
            router.push('/pages/login');
            Alert.alert('Error', 'No authentication token available.');
        }
    }, [token, dispatch]);

    const filteredFarmTypes = farmTypes.filter(farmType =>
        farmType.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderFarmType = ({ item }: { item: FarmType }) => (
        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity onPress={() => navigation.navigate('FarmTypeDetails', { farmTypeId: item.id })}>
                <View style={styles.farmTypeCard}>
                    <Text style={styles.farmTypeName}>{item.name}</Text>
                    <Text style={styles.farmTypeDescription}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );

    const renderRightActions = (id: number) => (
        <View style={styles.actions}>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditFarmType', { farmTypeId: id })}>
                <Icon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
                <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    const handleDelete = (id: number) => {
        Alert.alert('Delete', `Are you sure you want to delete farm type with ID ${id}?`, [
            { text: 'Cancel' },
            { text: 'Delete', onPress: () => dispatch(deleteFarmType(id)) }
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#aaa" style={styles.icon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search farm types..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <View style={styles.spacer} />
            {filteredFarmTypes.length === 0 ? (
                <View style={styles.noItemsContainer}>
                    <Text style={styles.noItemsText}>No farm types to show</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredFarmTypes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFarmType}
                />
            )}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('FarmTypeAdd')}>
                <Icon name="plus-circle" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F8F8',
    },
    farmTypeCard: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    farmTypeName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    farmTypeDescription: {
        fontSize: 14,
        color: '#666',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#3498db',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#28A745',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    spacer: {
        height: 30,
    },
    noItemsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    noItemsText: {
        fontSize: 18,
        color: '#888',
    },
});

export default FarmTypeScreen;
