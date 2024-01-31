import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  email: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, email, access, refresh } = action.payload;
      state.user = user;
      state.email = email;
      state.accessToken = access;
      state.refreshToken = refresh;
    },

    logOut: (state, action) => {
      state.user = null;
      state.email = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserEmail = (state) => state.auth.email;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
