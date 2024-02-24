import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  randomUsersLocal: [],
  loading: false,
  error: null,
};
const randomUsers = createSlice({
  name: 'randomUsers',
  initialState,
  reducers: {
    setRandomUsers: (state, action) => {
      state.randomUsersLocal = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setRandomUsers, setError } = randomUsers.actions;
export default randomUsers.reducer;
