import { createSlice } from "@reduxjs/toolkit";

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
    set_theaters: (state, action) => {
      state.theaters = action.payload;
    }
  },
  selectors: {
    selectName: (state) => state.name,
    selectAvatar: (state) => state.avatar,
    selectTheaters: (state) => state.theaters,
  },
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;