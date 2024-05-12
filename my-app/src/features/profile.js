import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {data} from '../datas/data.js'

const initialState = {
  contents: [],
  status: "idle",
  error: null,
  editFrom: false,
};

export const fetchProfile = createAsyncThunk(
  "content/fetchProfile",
  async (token, thunkAPI) => {
    // const response = await fetch(data)
    const response = await fetch("https://projet-13-argent-bank-backend.onrender.com/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer" + token,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const modifyProfile = createAsyncThunk(
  "content/modifyProfile",
  async (fetchData, thunkAPI) => {
    // const response = await fetch(data)
    const response = await fetch("https://projet-13-argent-bank-backend.onrender.com/api/v1/user/profile", {
      method: "PUT",
      body: JSON.stringify(fetchData.body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer" + fetchData.token,
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
    toggleEditForm: (state) => {
      state.editForm = !state.editForm;
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
    builder.addCase(modifyProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(modifyProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contents = action.payload;
    });
    builder.addCase(modifyProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getProfileContents = (state) => state.profile.contents;
export const getProfileStatus = (state) => state.profile.status;
export const getProfileError = (state) => state.profile.error;
export const getProfileEditForm = (state) => state.profile.editForm;

export default profileSlice.reducer;
export const { toggleEditForm } = profileSlice.actions;
