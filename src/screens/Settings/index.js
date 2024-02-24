import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Logout } from '../../redux/services/firebaseActions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ProfileBar from './ProfileBar';
import ProfileInfo from './ProfileInfo';
import EditProfile from './EditProfile';
import ProfileBottomBarNavigation from './ProfileBottomBarNavigation';
import { Button } from 'react-native-paper';
import { firestoreDb } from '../../firebase/firebaseConf';
import { doc, getDoc } from 'firebase/firestore';
const ProfileScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const LogoutActiveUser = async () => {
    await dispatch(Logout(navigation));
  };
  const { userId } = route.params;

  const [postAuthor, setPostAuthor] = React.useState(null);
  const getPostAuthor = async () => {
    if (userId === undefined || userId === null) return;
    const docRef = doc(firestoreDb, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPostAuthor(docSnap.data());
      console.log('Document data:', docSnap.data());
    } else {
      console.log('No such document!');
    }
  };
  useEffect(() => {
    getPostAuthor();
  }, [userId]);
  // const [isPostAuthor, setisPostAuthor] = useState(false);
  // if (userId) {
  //   setisPostAuthor(true);
  // }
  const loggedUser = useSelector((state) => state.auth?.currentUser);

  return (
    <>
      <ProfileBar />
      <ProfileInfo />
      <EditProfile />
      <ProfileBottomBarNavigation />
      {loggedUser && (
        <View style={styles.container}>
          <Button
            icon='logout'
            onPress={LogoutActiveUser}
            buttonColor='green'
            textColor='#fff'
          ></Button>
        </View>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});
