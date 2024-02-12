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
  snapshotEqual,
} from 'firebase/firestore';
import { setCurrentUser } from '../slices/authSlice';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setRandomUsers, setError } from '../slices/otherUsersSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
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
export const getAllUsers = () => async (dispatch) => {
  try {
    const usersRef = query(collection(firestoreDb, 'users'));
    const querySnapshot = await getDocs(usersRef);
    const users = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      users.push({ ...doc.data(), id: doc.id });
    });
    dispatch(setRandomUsers(users));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
  }
};
// const usersRef = collection(firestoreDb, 'users');
// export const getAllUsers = createAsyncThunk(
//   'users/getAllUsers',
//   async (_, { dispatch }) => {
//     try {
//       const querySnapshot = await getDocs(usersRef);
//       const cachedUsers = useSelector((state) => state.users.allUsers); // Get cached users

//       const hasUpdated =
//         !cachedUsers ||
//         !querySnapshot.docs.every((doc) => {
//           const cachedDoc = cachedUsers.find((cached) => cached.id === doc.id);
//           return cachedDoc && snapshotEqual(cachedDoc, doc); // Deep comparison
//         });

//       if (hasUpdated) {
//         const users = querySnapshot.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }));
//         dispatch(setRandomUsers(users)); // Dispatch action only if there's an update
//       }
//     } catch (error) {
//       dispatch(setError(error.message));
//     }
//   }
// );
