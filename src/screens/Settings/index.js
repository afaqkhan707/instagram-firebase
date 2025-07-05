import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileBar from './ProfileBar';
import ProfileInfo from './ProfileInfo';
import ProfileBottomBarNavigation from './ProfileBottomBarNavigation';
import EditProfile from './EditProfile';
import { Divider } from 'react-native-paper';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { firestoreDb } from '../../firebase/firebaseConf';
import { useSelector } from 'react-redux';
import ProfileCard from '../../components/ProfileCard';

const ProfileScreen = () => {
  const loggedUser = useSelector((state) => state.auth?.currentUser);
  const [userPosts, setUserPosts] = useState(null);
  const [myTotalPostLength, setMyTotalPostLength] = useState(0);
  const [showUser, setShowUser] = React.useState(false);

  useEffect(() => {
    if (loggedUser && loggedUser?.userId) {
      const postsRef = query(
        collection(firestoreDb, 'posts'),
        where('userId', '==', loggedUser?.userId)
      );

      const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        const posts = [];
        snapshot.forEach((doc) => {
          posts.push({ ...doc.data(), postId: doc.id });
        });
        setUserPosts(posts);
        setMyTotalPostLength(posts.length);
      });

      return () => unsubscribe();
    }
  }, [loggedUser?.userId]);

  // const getLoggedUser = async (dispatch) => {
  //   if (loggedUser && loggedUser.userId) {
  //     const docRef = doc(firestoreDb, 'users', loggedUser.userId);
  //     onSnapshot(docRef, (doc) => {
  //       if (doc.exists) {
  //         const data = doc.data();
  //         dispatch(setCurrentUser({ currentActiveUser: data }));
  //       } else {
  //         console.warn('User document not found:', loggedUser?.userId);
  //       }
  //     });
  //   }
  // };

  return (
    <View style={styles.container}>
      <ProfileBar />
      <Divider />
      <ProfileInfo myAllPosts={myTotalPostLength} />
      <EditProfile setShowUser={setShowUser} showUser={showUser} />
      {showUser && <ProfileCard size={60} height={160} width={140} />}
      <ProfileBottomBarNavigation authUserPost={userPosts} />
      <Divider />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
