import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";

const initialState = {
    user: null,
    token: null as string | null,
};

// Async function to load the initial state from AsyncStorage
export const loadInitialState = createAsyncThunk("auth/loadInitialState", async () => {
    const user = await AsyncStorage.getItem("@user");
    const token = await AsyncStorage.getItem("@Authorization");
    if (token) {
        const decoded = jwtDecode.jwtDecode(token);
        if ((decoded?.exp as number) * 1000 < Date.now()) {
            await AsyncStorage.removeItem("@Authorization");
            await AsyncStorage.removeItem("@user");
            return null;
        } else {
            return { user: user ? JSON.parse(user) : null, token };
        }
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token } = action.payload?.data;

            state.user = { ...action.payload?.data };
            AsyncStorage.setItem("@user", JSON.stringify(action.payload?.data));
            state.token = token;
            AsyncStorage.setItem("@Authorization", token);
        },
        logOut: (state) => {
            state.user = null;
            AsyncStorage.removeItem("@user");
            state.token = null;
            AsyncStorage.removeItem("@Authorization");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadInitialState.fulfilled, (state, action) => {
            if (action.payload?.token != null) {
                state.user = action.payload.user;
                state.token = action.payload.token;
            }
        });
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectMyUser = (state: any) => state.auth.user;
export const selectMyToken = (state: any) => state.auth.token;
