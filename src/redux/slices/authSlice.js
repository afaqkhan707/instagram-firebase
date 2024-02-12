import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoading: false,
  isError: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.currentActiveUser;
      state.isLoggedIn = action.payload.status;
      state.isError = action.payload.error;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
      console.log(action.payload, 'isLoading');
    },
  },
});

export const { setCurrentUser, setIsLoading, setIsError, setIsLoggedIn } =
  authSlice.actions;

export default authSlice.reducer;
