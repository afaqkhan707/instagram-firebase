import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  errorPost: null,
};
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addedNewPost: (state, action) => {
      state.content.push(action.payload);
    },
    setPost: (state, action) => {
      state.posts = action.payload;
    },
    setPostError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addedNewPost, setPost, setPostError } = postSlice.actions;
export default postSlice.reducer;
