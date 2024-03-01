import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { firestoreDb } from '../../firebase/firebaseConf';

const OtherProfileStatus = ({ userData }) => {
  const loggedUser = useSelector((state) => state.auth?.currentUser);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const handleFollowing = async () => {
    try {
      const userDocRef = doc(firestoreDb, 'users', loggedUser?.userId);
      const postUserRef = doc(firestoreDb, 'users', userData?.userId);

      if (isFollowing) {
        await updateDoc(userDocRef, {
          following: arrayRemove(userData?.userId),
        });
        await updateDoc(postUserRef, {
          followers: arrayRemove(loggedUser?.userId),
        });
      } else {
        await updateDoc(userDocRef, {
          following: arrayUnion(userData?.userId),
        });
        await updateDoc(postUserRef, {
          followers: arrayUnion(loggedUser?.userId),
        });
      }
      setIsFollowing((prevState) => !prevState);
    } catch (error) {
      console.log(error.code);
    }
  };
  useEffect(() => {
    if (loggedUser) {
      const isFollowingAuthor = loggedUser?.following.includes(
        userData?.userId
      );

      console.log(loggedUser?.following, 'hee');
      if (isFollowingAuthor) setIsFollowing(true);
    }
  }, [loggedUser?.following, userData?.userId]);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Button
        mode='contained-tonal'
        textColor={isFollowing ? '#000' : '#fff'}
        buttonColor={isFollowing ? '#f3f3f3' : '#3797EF'}
        onPress={handleFollowing}
        style={styles.editButton}
        labelStyle={{
          paddingHorizontal: 10,
          marginVertical: 7,
        }}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </Button>

      <Button
        mode='contained-tonal'
        textColor='#000'
        buttonColor={'#f3f3f3'}
        onPress={() => {}}
        style={styles.editButton}
        labelStyle={{
          paddingHorizontal: 10,
          marginVertical: 7,
        }}
      >
        Message
      </Button>
      <IconButton
        icon={'account-plus'}
        containerColor='#f3f3f3'
        onPress={() => {}}
        style={styles.editButton}
        size={18}
      />
    </View>
  );
};

export default OtherProfileStatus;

const styles = StyleSheet.create({
  editButton: {
    borderRadius: 8,
  },
});
