import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // posts: [
  content: [],
  // {
  //   content: [],
  //   //   likes: 0,
  //   //   postId: '',
  //   //   postDescription: '',
  //   //   createdAt: null,
  //   //   comments: [],
  //   //   location: '',
  //   //   type: 'image',
  //   //   userId: '',
  // },
  // ],
};
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addedNewPost: (state, action) => {
      state.content.push(action.payload);
    },
  },
});

export const { addedNewPost } = postSlice.actions;
export default postSlice.reducer;
