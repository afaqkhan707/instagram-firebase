import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { firestoreDb } from '../firebase/firebaseConf';
import { doc, getDoc } from 'firebase/firestore';

const FriendList = ({ followers, following }) => {
  const [followingList, setFollowingList] = useState(null);
  const [followerList, setFollowerList] = useState(null);
  const getFollowerList = async () => {
    if (followers < 1 || followers === undefined || followers === null) return;
    const users = [];
    for (const followingId of followers) {
      const userRef = doc(firestoreDb, 'users', followingId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        users.push(userData);
        setFollowerList(users);
      } else {
        console.error(`User document with ID ${followerId} not found.`);
      }
    }
  };
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
        console.error(`User document with ID ${followerId} not found.`);
      }
    }
  };
  useEffect(() => {
    getFollowerList();
    getFollowingList();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: '#dddddd' }}>
      <FlatList
        data={followingList}
        renderItem={({ item }) => <UserCard user={item} />}
      />
      <FlatList
        data={followerList}
        renderItem={({ item }) => <UserCard user={item} />}
      />
    </View>
  );
};

export default FriendList;

const styles = StyleSheet.create({});
