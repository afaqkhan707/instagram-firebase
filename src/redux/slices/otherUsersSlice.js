import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  randomUsers: [],
  loading: false,
  error: null,
};
const randomUsers = createSlice({
  name: 'randomUsers',
  initialState,
  reducers: {
    setRandomUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setRandomUsers, setError } = randomUsers.actions;
export default randomUsers.reducer;
// extraReducers: (builder) => {
//     builder
//       .addCase(getAllUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null; // Clear previous error
//       })
//       .addCase(getAllUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.allUsers = action.payload; // Update only if there's data
//       })
//       .addCase(getAllUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
