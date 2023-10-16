import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    darkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state) => {
        state.darkMode = !state.darkMode;
    },
  },
});

const { actions, reducer } = themeSlice;
export const { toggle } = actions
export default reducer