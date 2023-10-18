import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogged: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    set : (state, action) => {
        state.isLogged = action.payload;
    },
  },
});

const { actions, reducer } = loginSlice;
export const { set } = actions
export default reducer