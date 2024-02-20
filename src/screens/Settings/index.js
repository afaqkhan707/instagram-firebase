import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Logout } from '../../redux/services/firebaseActions';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ProfileBar from './ProfileBar';
import ProfileInfo from './ProfileInfo';
import EditProfile from './EditProfile';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const LogoutActiveUser = async () => {
    await dispatch(Logout(navigation));
  };
  return (
    <>
      <ProfileBar />
      <ProfileInfo />
      <EditProfile />
      <View style={styles.container}></View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});

{
  /* <Button
        icon='logout'
        onPress={LogoutActiveUser}
        buttonColor='green'
        textColor='#fff'
      >
        Logout
      </Button> */
}
