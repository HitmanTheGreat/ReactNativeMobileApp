import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the network state
interface NetworkState {
    isConnected: boolean;
    isFetching: boolean;
}

const initialState: NetworkState = {
    isConnected: true,  // Default to connected on app start
    isFetching: false,  // Default to not fetching
};

const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setNetworkState: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        setFetchingState: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },
    },
});

export const { setNetworkState, setFetchingState } = networkSlice.actions;
export default networkSlice.reducer;
