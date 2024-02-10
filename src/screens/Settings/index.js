import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Logout } from '../../redux/services/firebaseActions';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const Setting = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const LogoutActiveUser = async () => {
    await dispatch(Logout(navigation));
  };
  return (
    <View style={styles.container}>
      <Text>Setting</Text>
      <Button
        icon='logout'
        onPress={LogoutActiveUser}
        buttonColor='green'
        textColor='#fff'
      >
        Logout
      </Button>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});
