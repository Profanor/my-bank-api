import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: unknown | null;
    token: unknown;
}

const slice = createSlice({
    name: 'userauth',
  initialState: {
    user: null,
    token: {},
    resetInfo: {},
    profileImg: {},
  } as unknown as UserState,
  reducers: {
    setCredentials: (state, {payload: {user, token}}) => {
      state.user = user;
      state.token = token;
    },
},
});

export const {
  setCredentials,
} = slice.actions;

export default slice.reducer;
