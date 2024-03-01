import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import UserFollow from './userFollow';
import { firestoreDb } from '../../../firebase/firebaseConf';
import { useSelector } from 'react-redux';

const FollowersTab = ({ followers, followerId }) => {
  const [followerList, setFollowerList] = useState(null);
  const [isFollowing, setIsFollowing] = useState(true);

  const getFollowerList = async () => {
    if (followers < 1 || followers === undefined || followers === null) return;
    const users = [];
    for (const followersId of followers) {
      const userRef = doc(firestoreDb, 'users', followersId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        users.push(userData);
        setFollowerList(users);
      } else {
        console.error(`User document with ID ${followersId} not found.`);
      }
    }
  };

  useEffect(() => {
    getFollowerList();
  }, []);
  console.log(followerId, 'follower ID');
  const loggedUser = useSelector((state) => state.auth?.currentUser);
  // const handleFollowing = async () => {
  //   setIsFollowing(true);
  //   try {
  //     const userDocRef = doc(firestoreDb, 'users', loggedUser?.userId);
  //     const postUserRef = doc(firestoreDb, 'users', followerId);
  //     await updateDoc(userDocRef, {
  //       following: arrayUnion(followerId),
  //     });
  //     await updateDoc(postUserRef, {
  //       followers: arrayUnion(loggedUser?.userId),
  //     });
  //   } catch (error) {
  //     console.log(error.code);
  //   }
  // };
  return (
    <View style={{ flex: 1, backgroundColor: '#dddddd' }}>
      <FlatList
        data={followerList}
        renderItem={({ item }) => (
          <UserFollow
            user={item}
            // onPress={handleFollowing}
            isFollowing={isFollowing}
          />
        )}
        keyExtractor={(item) => item.userId.toString()}
      />
    </View>
  );
};

export default FollowersTab;

const styles = StyleSheet.create({});
