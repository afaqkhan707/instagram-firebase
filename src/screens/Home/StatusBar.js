import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import StatusUser from '../../components/StatusUser';
import { useDispatch, useSelector } from 'react-redux';
import { launchLibraryImages } from '../../utils/launchLibrary';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreDb, storage } from '../../firebase/firebaseConf';
import { nanoid } from '@reduxjs/toolkit';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setIsLoading, setUpdateProImg } from '../../redux/slices/authSlice';

const StatusBarUsers = () => {
  const loadingUser = useSelector((state) => state.auth.isLoading);
  const otherUsers = useSelector((state) => state.randomUsers.randomUsersLocal);
  const userId = useSelector((state) => state.auth.currentUser?.userId);
  const dispatch = useDispatch();
  const uploadUserProfilePhoto = async (uri) => {
    dispatch(setIsLoading(true));
    if (!uri) return;
    try {
      const resp = await fetch(uri);
      const blobType = await resp.blob();
      const storageRef = ref(storage, `userProfileImages/${nanoid()}`);
      await uploadBytes(storageRef, blobType);
      const downloadURL = await getDownloadURL(storageRef);
      const userDocRef = doc(firestoreDb, 'users', userId);
      await setDoc(userDocRef, { proImgLink: downloadURL }, { merge: true });
      dispatch(setUpdateProImg(downloadURL));
    } catch (error) {
      console.error('Error uploading user profile photo:', error);
      dispatch(setIsLoading(false));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const profileImage = async () => {
    const response = await launchLibraryImages();
    try {
      await uploadUserProfilePhoto(response?.uri);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const activeUser = useSelector((state) => state.auth?.currentUser);

  return (
    <ScrollView
      horizontal
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusUser
        userImage={activeUser?.proImgLink}
        userName={activeUser?.username}
        size={70}
        onPress={profileImage}
        isLoading={loadingUser}
      />
      <FlatList
        data={otherUsers}
        contentContainerStyle={{ flexDirection: 'row', gap: 10 }}
        renderItem={({ item }) => (
          <StatusUser
            key={item.userId}
            userImage={item.proImgLink}
            userName={item.username}
            size={64}
          />
        )}
        keyExtractor={(item) => item.userId}
      />
      <View
        style={{ borderBottomWidth: 1, borderColor: '#0000001a', flex: 1 }}
      ></View>
    </ScrollView>
  );
};
export default StatusBarUsers;

const styles = StyleSheet.create({
  scrollView: {
    minHeight: 100,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 10,
    // marginBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#0000001a',
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
