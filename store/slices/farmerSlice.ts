import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the farmer state
interface Farmer {
    id: number;
    name: string;
}

interface FarmerState {
    data: Farmer[];      // List of farmers
    farmer: Farmer | null; // Selected farmer (single farmer)
    isLoading: boolean;
    error: string | null;
}

const initialState: FarmerState = {
    data: [],
    farmer: null,  // Initially no selected farmer
    isLoading: false,
    error: null,
};

const farmerSlice = createSlice({
    name: 'farmer',
    initialState,
    reducers: {
        fetchFarmersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchFarmersSuccess: (state, action: PayloadAction<Farmer[]>) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        fetchFarmersFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setSelectedFarmer: (state, action: PayloadAction<Farmer | null>) => {
            state.farmer = action.payload; // Update the selected farmer
        },
    },
});

export const { fetchFarmersStart, fetchFarmersSuccess, fetchFarmersFailure, setSelectedFarmer } = farmerSlice.actions;
export default farmerSlice.reducer;
