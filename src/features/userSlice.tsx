import { createSlice } from '@reduxjs/toolkit';
import { IUser, IUserState } from '../interfaces';

const initialState: IUserState = {
  items: {} as IUser,
  status: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const { addUserData } = userSlice.actions;

export default userSlice.reducer;
