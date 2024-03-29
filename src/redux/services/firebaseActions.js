import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import {
  auth,
  firestoreDb,
  googleProvider,
  storage,
} from '../../firebase/firebaseConf';
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from 'firebase/firestore';
import { setCurrentUser } from '../slices/authSlice';
import { setRandomUsers, setError } from '../slices/otherUsersSlice';
import { setPost, setPostError } from '../slices/postSlice';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from '@reduxjs/toolkit';

// Handle NewUser Signup
export const registerUser =
  (values, navigation, setLoading, resetSignupForm) => async (dispatch) => {
    try {
      const resp = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const userId = resp?.user?.uid;
      console.log(userId);
      const newUserData = {
        displayName: '',
        username: values.username,
        email: values.email,
        gender: '',
        userId,
        followers: [],
        following: [],
        createdAt: new Date().toISOString(),
      };
      window.navigator.userAgent = 'ReactNative';
      await setDoc(doc(firestoreDb, 'users', userId), newUserData);
      navigation.navigate('dashboard');
      resetSignupForm();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email or password is invalid!');
      } else {
        console.log(error, 'Error while signup');
      }
    } finally {
      setLoading(false);
    }
  };
// Handle Login
export const loginUser =
  (values, navigation, setLoadingLogin, resetFormLogin) => async (dispatch) => {
    try {
      const resp = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const userId = resp?.user?.uid;
      const userDoc = await getDoc(doc(firestoreDb, 'users', userId));
      const currentUserData = userDoc.data();
      console.log(currentUserData);
      dispatch(
        setCurrentUser({
          currentActiveUser: currentUserData,
          status: true,
          error: null,
        })
      );
      navigation.navigate('dashboard');
      resetFormLogin();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email or password is invalid!');
      } else {
        console.log(error, 'Error while Login');
      }
    } finally {
      setLoadingLogin(false);
    }
  };
//Handle User with Google
export const continueWithGoogle =
  (navigation, setLoadingGoogle) => async (dispatch) => {
    try {
      const resp = await signInWithPopup(auth, googleProvider);
      const userId = resp.user.uid;
      const email = resp.user.email;
      console.log(userId, email, 'login with Google');
      // await setDoc(doc(db, 'users', userId), {
      //   userId,
      //   email,
      // });
      // dispatch(
      //   setCurrentUser({
      //     currentActiveUser: currentUserData,
      //     status: true,
      //     error: null,
      //   })
      // );
      // navigation.navigate('dashboard');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email or password is invalid!');
      } else {
        console.log(error, 'Error while signup');
      }
    } finally {
      setLoadingGoogle(false);
    }
  };
// Handle Logout  User
export const Logout = (navigation) => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(
      setCurrentUser({ currentActiveUser: null, status: false, error: null })
    );

    console.log('Logout successful');
    navigation.navigate('login');
  } catch (error) {
    console.error('Error in logoutUser:', error);
    dispatch(setError(error.message));
  } finally {
  }
};
// Handle Active User
export const CheckActiveUser = () => async (dispatch) => {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(collection(firestoreDb, 'users'), user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userDetails = docSnap.data();
          dispatch(
            setCurrentUser({
              currentActiveUser: userDetails,
              status: true,
              error: null,
            })
          );
        } else {
          dispatch(
            setCurrentUser({
              currentActiveUser: null,
              status: false,
            })
          );
        }
      }
    });
  } catch (err) {
    console.log(err, 'error while searching user');
  }
};
// Handle Get All Users
export const getAllUsers = (userId) => async (dispatch) => {
  // dispatch(setLoading(true));
  try {
    const usersRef = query(
      collection(firestoreDb, 'users'),
      where('userId', '!=', userId)
    );
    const querySnapshot = await getDocs(usersRef);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    dispatch(setRandomUsers(users));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const usersRef = query(collection(firestoreDb, 'posts'));
    const querySnapshot = await getDocs(usersRef);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), postId: doc.id });
    });
    dispatch(setPost(posts));
  } catch (error) {
    dispatch(setPostError(error.message));
  } finally {
  }
};

export const uploadImage = (uri) => async (dispatch) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, 'post_media_files/');
    const filename = `${Date.now()}-${nanoid()}`;
    const imageRef = ref(storageRef, filename);
    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
