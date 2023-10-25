import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import {data} from '../datas/data.js'

const initialState = {
  contents: [],
  status: 'idle',
  error: null,
  logged: false
};

export const fetchLogin = createAsyncThunk(
  'content/fetchLogin',
  async (bodyFetchData, thunkAPI) => {
    // const response = await fetch(data)
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify(bodyFetchData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    const data = await response.json()
    return data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    disconnect: (state) => {
        state.logged = false;
        localStorage.removeItem("userToken")
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.logged = true
      state.contents = action.payload
      localStorage.setItem("userToken", state.contents.body.token)
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message
    })
  },
});

export const getLoginContents = (state) => state.login.contents;
export const getLoginStatus = (state) => state.login.status;
export const getLoginError = (state) => state.login.error;
export const getLoginLogged = (state) => state.login.logged;

export default loginSlice.reducer
export const { disconnect } = loginSlice.actions