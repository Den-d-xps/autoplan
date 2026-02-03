import { createAsyncThunk } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/core";


export const handleLogin = createAsyncThunk("auth/login", async () => {
  try {
    await invoke<string>("login");
    await invoke<string>("get_theaters");
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