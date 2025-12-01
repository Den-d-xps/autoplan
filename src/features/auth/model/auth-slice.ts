import { createSlice } from "@reduxjs/toolkit";
import { handleCheckAuth, handleLogin } from "./thunks";


interface AuthState {
  isLoggedIn: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 handleLogin
      .addCase(handleLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.status = "succeeded";
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Ошибка логина";
      })

      // 🔹 handleCheckAuth
      .addCase(handleCheckAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleCheckAuth.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload; 
        state.status = "succeeded";
      })
      .addCase(handleCheckAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Ошибка проверки авторизации";
      });
  },
});

export const { logout } = authSlice.actions;
