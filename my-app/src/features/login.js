import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  contents: [],
  status: "idle",
  error: null,
  logged: false,
};

export const fetchLogin = createAsyncThunk(
  "content/fetchLogin",
  async (bodyFetchData, thunkAPI) => {
    console.log("passélogin")
    const response = await fetch("https://projet-13-argent-bank-backend.onrender.com/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify(bodyFetchData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    return data;
  }
);

export const fetchSignUp = createAsyncThunk(
  "content/fetchSignUp",
  async (bodyFetchData, { dispatch }) => {
    const response = await fetch("https://projet-13-argent-bank-backend.onrender.com/api/v1/user/signup", {
      method: "POST",
      body: JSON.stringify(bodyFetchData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data)
    if(data.message === "User successfully created"){
      console.log("passésignup")
      await dispatch(fetchLogin(bodyFetchData));
    }
    return data;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    disconnect: (state) => {
      state.logged = false;
      localStorage.removeItem("userToken");
    },
    connect: (state) => {
      state.logged = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contents = action.payload;
      if (state.contents.status === 200) {
        state.logged = true;
        if (state.contents.body.token) {
          localStorage.setItem("userToken", state.contents.body.token);
        }
      }
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchSignUp.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.contents = action.payload;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getLoginContents = (state) => state.login.contents;
export const getLoginStatus = (state) => state.login.status;
export const getLoginError = (state) => state.login.error;
export const getLoginLogged = (state) => state.login.logged;

export default loginSlice.reducer;
export const { disconnect, connect } = loginSlice.actions;
