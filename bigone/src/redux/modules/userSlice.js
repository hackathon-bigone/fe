import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/loginUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("/user/login", userData);
    return response.data; // 성공하면 payload로 전달
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    grantType: "",
    accessToken: "",
    refreshToken: "",
  },
  reducers: {
    login: (state, action) => {
      state.grantType = action.payload.grantType;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.grantType = "";
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { login, logout, userSearch } = userSlice.actions;
export default userSlice.reducer;
