import { createSlice } from "@reduxjs/toolkit";

export interface UserStateInterface {
  userID: null | number;
  jwt: string;
  username: string;
  email: string;
  image: string;
}

const initialUserState: UserStateInterface = {
  userID: null,
  jwt: "",
  username: "",
  email: "",
  image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserID(state, action: { payload: { jwt: string; userID: number } }) {
      state.jwt = action.payload.jwt;
      state.userID = action.payload.userID;
    },
    setUserInfo(state, action: { payload: any }) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    logout(state) {
      state.username = "";
      state.email = "";
      state.image = "";
      state.jwt = "";
      state.userID = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
