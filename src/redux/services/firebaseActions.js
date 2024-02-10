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
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { setCurrentUser } from '../slices/authSlice';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
        username: values.username,
        email: values.email,
        userId,
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
export const loginUser =
  (values, navigation, setLoadingLogin, resetFormLogin) => async (dispatch) => {
    try {
      const resp = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const userId = resp?.user?.uid;
      window.navigator.userAgent = 'ReactNative';
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
        console.log(error, 'Error while signup');
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

export const createPost = () => async (dispatch) => {
  const post = {
    type: 'image',
    content: [],
    userId: '',
    postDescription: '',
    createdAt: firebase.firestore().FieldValue.serverTimestamp(),
    likes: 0,
    location: '',
    comments: [],
    postId: '',
  };
};
