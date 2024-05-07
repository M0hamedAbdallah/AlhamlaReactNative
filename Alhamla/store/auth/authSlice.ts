import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            const  { token } = action.payload.data;
            state.user = {...action.payload.data};
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer

export const selectMyUser = (state: any) => state.auth.user
export const selectMyToken = (state: any) => state.auth.token