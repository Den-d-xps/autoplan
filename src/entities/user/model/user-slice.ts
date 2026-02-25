import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  name: string;
  avatar: string;
  theaters: string[];
}

const initialState: IUserState = {
  name: "user",
  avatar: "",
  theaters: [],
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set_theaters: (state, action: PayloadAction<string[]>) => {
      state.theaters = action.payload;
    },
    set_user_info: (state, action: PayloadAction<{ name: string; avatar: string }>) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
    reset: () => initialState,
  },
  selectors: {
    selectName: (state) => state.name,
    selectAvatar: (state) => state.avatar,
    selectTheaters: (state) => state.theaters,
  },
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;