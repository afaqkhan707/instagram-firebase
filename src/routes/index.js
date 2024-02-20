import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Signup from '../screens/Signup';
import CameraModalScreen from '../screens/Camera';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { auth, firestoreDb } from '../firebase/firebaseConf';
import LoaderPage from '../components/Loader';
import { setIsLoading } from '../redux/slices/authSlice';
import CameraGalleryModal from '../screens/CameraGalleryModal/CameraGalleryModal';
// import { CheckActiveUser } from '../redux/services/firebaseActions';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const isLogged = useSelector((state) => state.auth?.isLoggedIn);
  const dispatch = useDispatch();
  const CheckActiveUser = async () => {
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
                error: null,
              })
            );
          } else {
            dispatch(
              setCurrentUser({
                currentActiveUser: null,
              })
            );
          }
        }
      });
    } catch (err) {
      console.log(err, 'error while searching user');
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  // useEffect(() => {
  //   CheckActiveUser();
  //   console.log(isLogged, 'false');
  //   console.log(isLogged, 'true');
  // }, [!isLogged]);

  useEffect(() => {
    const checkUser = async () => {
      await CheckActiveUser();
    };
    checkUser();
  }, []);

  useEffect(() => {
    console.log(isLogged ? 'true' : 'false');
  }, [isLogged]);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLogged ? 'dashboard' : 'dashboard'}
        >
          <Stack.Screen
            name='login'
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='signup'
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='dashboard'
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='camera'
            component={CameraModalScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='contentmodal'
            component={CameraGalleryModal}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MyStack;
