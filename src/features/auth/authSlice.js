import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("access") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;

      localStorage.setItem("access", action.payload);
    },

    logout: (state) => {
      state.token = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;