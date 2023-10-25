import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {data} from '../datas/data.js'

const initialState = {
  contents: [],
  status: "idle",
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "content/Profile",
  async (token, thunkAPI) => {
    // const response = await fetch(data)
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": "Bearer" + token,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    disconnect: (state) => {
      state.logged = false;
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contents = action.payload;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getProfileContents = (state) => state.profile.contents;
export const getProfileStatus = (state) => state.profile.status;
export const getProfileError = (state) => state.profile.error;

export default profileSlice.reducer;
export const { disconnect } = profileSlice.actions;
