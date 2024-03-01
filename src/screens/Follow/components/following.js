import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firestoreDb } from '../../../firebase/firebaseConf';
import { doc, getDoc } from 'firebase/firestore';
import UserFollow from './userFollow';
import { useDispatch, useSelector } from 'react-redux';
import { handleFollowing } from '../../../utils/followFirebase';

const FollowingTab = ({ following, followerId }) => {
  const [followingList, setFollowingList] = useState(null);
  const getFollowingList = async () => {
    if (following < 1 || following === undefined || following === null) return;
    const users = [];
    for (const followingId of following) {
      const userRef = doc(firestoreDb, 'users', followingId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        users.push(userData);
        setFollowingList(users);
      } else {
        console.error(`User document with ID ${followingId} not found.`);
      }
    }
  };
  useEffect(() => {
    getFollowingList();
  }, [following]);
  // const loggedUser = useSelector((state) => state.auth?.currentUser);
  const [isFollowing, setIsFollowing] = React.useState(true);

  // useEffect(() => {
  //   if (loggedUser) {
  //     const isFollowingAuthor = loggedUser?.following.includes(followerId);
  //     setIsFollowing(isFollowingAuthor);
  //   }
  // }, [loggedUser, followerId]);
  // const dispatch = useDispatch();
  // const handleFollowing = async () => {
  //   dispatch(
  //     handleFollowing(
  //       loggedUser?.userId,
  //       followerId,
  //       isFollowing,
  //       setIsFollowing
  //     )
  //   );
  // };
  return (
    <View style={{ flex: 1, backgroundColor: '#dddddd' }}>
      <FlatList
        data={followingList}
        renderItem={({ item }) => (
          <UserFollow
            user={item}
            // onPress={handleFollowing}
            isFollowing={isFollowing}
          />
        )}
      />
    </View>
  );
};

export default FollowingTab;

const styles = StyleSheet.create({});
