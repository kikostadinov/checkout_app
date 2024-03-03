import { createSlice } from '@reduxjs/toolkit';

interface IThemeState {
  value: 'light' | 'dark';
  status: null | 'pending' | 'fulfilled' | 'rejected';
  error: null | string | undefined;
}

const initialState: IThemeState = {
  value: 'light',
  status: null,
  error: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;