import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    username: string;
}

interface UserState {
    data: User[];         // List of users
    user: User | null;     // Selected user (single user)
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: [],
    user: null,            // Initially no user selected
    isLoading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setSelectedUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload; // Update the selected user
        },
    },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
