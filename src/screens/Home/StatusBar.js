import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import StatusUser from '../../components/StatusUser';
import { useSelector } from 'react-redux';
import { launchLibrary } from '../../utils/launchLibrary';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreDb, storage } from '../../firebase/firebaseConf';
import { nanoid } from '@reduxjs/toolkit';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const StatusBarUsers = () => {
  const images = [
    {
      id: 1,
      imageURl:
        'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userName: 'aamir',
    },
  ];

  for (let i = 1; i < 20; i++) {
    images.push({
      id: i + 1,
      imageURl: images[0].imageURl,
      userName: 'aamir',
    });
  }
  const userId = useSelector((state) => state.auth.currentUser?.userId);
  const [userProImage, setUserProImage] = useState(null);
  const uploadUserProfilePhoto = async (uri) => {
    try {
      if (userProImage) {
        const resp = await fetch(uri);
        const blobType = await resp.blob();
        const storageRef = ref(storage, `userProfileImages/${nanoid()}`);
        console.log('ereeee');
        await uploadBytes(storageRef, blobType);

        const downloadURL = await getDownloadURL(storageRef);
        const userDocRef = doc(firestoreDb, 'users', userId);
        await setDoc(userDocRef, { proImgLink: downloadURL }, { merge: true });
        setUserProImage(null);
      }
    } catch (error) {
      console.error('Error uploading user profile photo:', error);
      throw error;
    }
  };

  const profileImage = async () => {
    response = await launchLibrary();
    await setUserProImage(response);
    uploadUserProfilePhoto(response.uri);
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
        userImage={userProImage?.uri}
        userName={activeUser?.username}
        size={70}
        onPress={profileImage}
      />
      {images.map((image) => (
        <StatusUser
          key={image.id}
          userImage={image.imageURl}
          userName={image.userName}
        />
      ))}
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
