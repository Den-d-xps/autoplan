import { createAsyncThunk } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/core";


export const handleLogin = createAsyncThunk("auth/login", async () => {
  try {
    await invoke<string>("login");
    return true;
  } catch (err) {
    throw err;
  }
});


export const handleCheckAuth = createAsyncThunk("auth/check", async () => {
  try {
    const isLoggedIn = await invoke<boolean>("check_auth");
    return isLoggedIn;
  } catch (err) {
    throw err;
  }
});


export const handleLogout = createAsyncThunk("auth/logout", async () => {
  await invoke("clear_session_and_exit");
});