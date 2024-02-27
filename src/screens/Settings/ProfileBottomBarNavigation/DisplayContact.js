import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Logout } from '../../../redux/services/firebaseActions';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const DisplayContact = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const SignOut = () => {
    dispatch(Logout(navigation));
  };
  return (
    <View>
      <Text>DisplayContact</Text>
      <Button mode='contained-tonal' onPress={SignOut}>
        Logout
      </Button>
    </View>
  );
};

export default DisplayContact;

const styles = StyleSheet.create({});
