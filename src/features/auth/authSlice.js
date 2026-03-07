import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("access") || null,  //  we can inialize null and when page is load it set token and refrsh but i we set null we must wrap in PesistenLogin
  refresh: localStorage.getItem("refresh") || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.access;
      state.refresh = action.payload.refresh;

  
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
    },

    logout: (state) => {
      state.token = null;
      state.refresh = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;