import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the user object
interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isStaff: boolean;
    role: string;
}

// Define the structure of the user state
interface UserState {
    access: string | null;
    refresh: string | null;
    user: User | null;
}

const initialState: UserState = {
    access: null,
    refresh: null,
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{ access: string; refresh: string; user: User }>
        ) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.user = action.payload.user;
        },

        // Logout and clear user data
        logout: (state) => {
            state.access = null;
            state.refresh = null;
            state.user = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
