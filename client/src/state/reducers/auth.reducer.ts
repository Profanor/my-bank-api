import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from '../store';

interface UserState {
    user: any | null;
    token: string | null;
}

const initialState: UserState = {
    user: null,
    token: null,
};

const slice = createSlice({
    name: 'userauth',
    initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
        },
  },
});

export const { setCredentials, clearCredentials } = slice.actions;

export default slice.reducer;

export const selectUser = (state: RootState) => state.userAuth.user;
