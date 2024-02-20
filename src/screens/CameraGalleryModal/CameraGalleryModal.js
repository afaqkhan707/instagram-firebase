import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { launchCamera } from '../../utils/launchCamera';
import { launchLibraryImages } from '../../utils/launchLibrary';
import { Appbar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../firebase/firebaseConf';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { setUpdateProImg } from '../../redux/slices/authSlice';

const CameraGalleryModal = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  const loggedUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const handleOpenCamera = async () => {
    const respImage = await launchCamera();
    setSelectedImage(respImage?.uri);
  };

  const handleOpenLibrary = async () => {
    const respImage = await launchLibraryImages();
    setSelectedImage(respImage?.uri);
  };

  const uploadTask = async (uri) => {
    if (!selectedImage) return;
    setIsLoading(true);
    try {
      const uploadingImage = await fetch(uri);
      const blobFormatImage = await uploadingImage.blob();
      const storageRef = ref(storage, 'userProfileImages');
      const userIdFolderRef = ref(storageRef, loggedUser?.userId);
      const fileName = `${nanoid()}.jpg`;
      const uploadRef = ref(userIdFolderRef, fileName);
      const uploadedRes = await uploadBytes(uploadRef, blobFormatImage);
      if (uploadedRes) {
        const downloadURL = await getDownloadURL(uploadRef);
        dispatch(setUpdateProImg(downloadURL));
      }
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error, 'while Uploading');
      setIsLoading(true);
    }
  };
  const handleUpload = async () => {
    if (!selectedImage) return;
    await uploadTask(selectedImage);
  };
  const handleCancel = () => {
    setSelectedImage(null);
  };

  const handleGoBack = () => {
    setSelectedImage(null);
    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action icon='arrow-left' onPress={handleGoBack} />
      </Appbar.Header>
      <View style={styles.container}>
        {!selectedImage && (
          <>
            <Text style={styles.infoText}>
              Choose Image From Device or Capture
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                style={[styles.button, styles.libraryButton]}
                mode='contained'
                onPress={handleOpenLibrary}
              >
                Open Library
              </Button>
              <Button
                style={[styles.button, styles.cameraButton]}
                mode='contained'
                onPress={handleOpenCamera}
              >
                Open Camera
              </Button>
            </View>
          </>
        )}
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.image}
              resizeMode='contain'
            />
            <View style={[styles.buttonContainer, { marginTop: 20 }]}>
              <Button
                style={[styles.button, styles.cancelButton]}
                mode='contained'
                onPress={handleCancel}
              >
                Cancel
              </Button>
              <Button
                style={[styles.button, styles.uploadButton]}
                mode='contained'
                onPress={handleUpload}
                loading={isLoading}
              >
                Upload
              </Button>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default CameraGalleryModal;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#333',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e272e',
  },
  infoText: {
    color: '#fff',
    marginBottom: 30,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    width: 150,
  },
  libraryButton: {
    backgroundColor: '#3498db',
  },
  cameraButton: {
    backgroundColor: '#e74c3c',
  },
  imageContainer: {
    width: '100%',
    maxHeight: 400,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  uploadButton: {
    backgroundColor: '#27ae60',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
});
