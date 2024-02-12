import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import postReducer from '../redux/slices/postSlice';
import randomUsersReducer from '../redux/slices/otherUsersSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    randomUsers: randomUsersReducer,
  },
});
