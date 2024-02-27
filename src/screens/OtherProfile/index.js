import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firestoreDb } from '../../firebase/firebaseConf';
import OtherProfileBar from './OtherProfileBar';
import OtherProfileInfo from './OtherProfileInfo';
import OtherProfileStatus from './OtherProfileStatus';
import OtherProfileBottomBarNavigation from './OtherProfileBottomBarNavigation';
import { useDispatch } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Divider } from 'react-native-paper';

const OtherProfileScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [postAuthor, setPostAuthor] = React.useState(null);
  const [postAuthorPosts, setPostAuthorPosts] = React.useState(null);
  const { userId } = route?.params;

  const getPostAuthor = async () => {
    if (userId === undefined || userId === null) return;

    const userDocRef = doc(firestoreDb, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      setPostAuthor(userDocSnap.data());
      // console.log(userDocSnap.data()?.userId, 'userId');
    } else {
      console.log('No such user document found!');
    }
  };

  const allPostByUser = async () => {
    if (userId === undefined || userId === null) return;

    const q = query(
      collection(firestoreDb, 'posts'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const userPosts = querySnapshot.docs.map((doc) => ({
      postId: doc.id,
      ...doc.data(),
    }));
    setPostAuthorPosts(userPosts);
  };

  React.useEffect(() => {
    getPostAuthor();
    allPostByUser();
  }, [userId]);

  return (
    <View style={styles.container}>
      <OtherProfileBar postAuthor={postAuthor} />
      <Divider />
      <OtherProfileInfo postAuthor={postAuthor} />
      <Divider />
      <OtherProfileStatus postAuthor={postAuthor} />
      <Divider />
      <OtherProfileBottomBarNavigation />
    </View>
  );
};

export default OtherProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
