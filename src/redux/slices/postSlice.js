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
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setPostError: (state, action) => {
      state.error = action.payload;
    },
    setCommentState: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.postId === action.payload.id) {
          state.posts.comments.push(action.payload.comment);
        }
        return post;
      });
    },
  },
});

export const {
  addedNewPost,
  setPost,
  setPostError,
  setCommentState,
  removePost,
} = postSlice.actions;
export default postSlice.reducer;

// updatePost: (state, action) => {
//   const { id, updatedData } = action.payload;
//   const index = state.posts.findIndex((post) => post.id === id);

//   if (index !== -1) {
//     state.posts[index] = { ...state.posts[index], ...updatedData };
//   }
// },

// addPost: (state, action) => {
//   state.posts.unshift(action.payload);
// },

// removePost: (state, action) => {
//   const index = state.posts.findIndex(
//     (post) => post.id === action.payload.id
//   );

//   if (index !== -1) {
//     state.posts.splice(index, 1);
//   }
// },
