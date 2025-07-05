import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { firestoreDb } from '../../../firebase/firebaseConf';
import { doc, getDoc } from 'firebase/firestore';
import UserFollow from './userFollow';

const FollowingTab = ({ following }) => {
  const [followingList, setFollowingList] = useState(null);
  const [isFollowing, setIsFollowing] = React.useState(true);

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
