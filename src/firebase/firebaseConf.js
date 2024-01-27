import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth, initializeAuth } from 'firebase/auth';
// import {
//   getAuth,
//   initializeAuth,
//   getReactNativePersistence,
// } from 'firebase/auth';

// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyADf5AC1VfIJl36_El0yBf-sPKyHMkUkig',
  authDomain: 'instagram-firebase-mobile.firebaseapp.com',
  projectId: 'instagram-firebase-mobile',
  storageBucket: 'instagram-firebase-mobile.appspot.com',
  messagingSenderId: '98903506990',
  appId: '1:98903506990:web:831278c9a7239ae4769fbf',
};
const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);
// const auth = getAuth(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, firestoreDb };
