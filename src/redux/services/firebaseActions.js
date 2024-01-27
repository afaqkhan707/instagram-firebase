import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, firestoreDb } from '../../firebase/firebaseConf';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { setCurrentUser } from '../slices/authSlice';

export const registerUser =
  (values, navigation, setLoading, reset) => async (dispatch) => {
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
      // await setDoc(doc(firestoreDb, 'users', userId), newUserData);
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
      reset();
    }
  };
export const loginUser = (values, navigation) => async (dispatch) => {
  try {
    const resp = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const userId = resp?.user?.uid;
    const userDoc = await getDoc(doc(firestoreDb, 'users', userId));
    const currentUserData = userDoc.data();
    dispatch(
      setCurrentUser({
        currentActiveUser: currentUserData,
        status: true,
        error: null,
      })
    );
    navigation.navigate('dashboard');
  } catch (error) {
    console.log('error in login', error.code);
    dispatch(setError(error.code));
  } finally {
    dispatch(setLoading(false));
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
    dispatch(setLoading(false));
  }
};
