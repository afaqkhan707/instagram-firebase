import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Signup from '../screens/Signup';
// import ImagePickerExample from '../screens/Camera';
import ImagePickerExample from '../screens/Camera';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'dashboard'}>
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
            component={ImagePickerExample}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MyStack;
