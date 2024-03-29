import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { Alert, StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { Button, IconButton, ProgressBar } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { launchCamera } from '../utils/launchCamera';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firestoreDb, storage } from '../firebase/firebaseConf';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { addDoc, collection, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { uploadImage } from '../redux/services/firebaseActions';
import { setPostError } from '../redux/slices/postSlice';

const CameraModal = ({
  postContent,
  setPostContent,
  modalVisible,
  setModalVisible,
  setContentData,
}) => {
  const userId = useSelector((state) => state.auth?.currentUser?.userId);
  const errorPost = useSelector((state) => state.post?.errorPost);
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [location, setLocation] = useState('');
  const [sendLoading, setSendLoading] = useState(false);
  const [setupUp, setSetupUp] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const sendPost = async () => {
    setSendLoading(true);
    try {
      const uploadTasks = [];
      for (const imageUrl of postContent) {
        const response = await dispatch(uploadImage(imageUrl.uri));
        // const response = await uploadImage(imageUrl.uri);
        uploadTasks.push(response);
      }
      await Promise.all(uploadTasks);
      const data = {
        postImage: uploadTasks,
        comments: [],
        fileType: 'images',
        likes: 0,
        userId,
        address: location,
        description: description,
      };
      await addDoc(collection(firestoreDb, 'posts'), data);
      setModalVisible(false);
      setDescription('');
      setLocation('');
      setSendLoading(false);

      setPostContent([]);
    } catch (error) {
      dispatch(setPostError(error.code));
      setSendLoading(false);
    } finally {
    }
  };
  // const uploadImage = async (uri) => {
  //   try {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();
  //     const storageRef = ref(storage, 'post_media_files/');
  //     const filename = `${Date.now()}-${nanoid()}`;
  //     const imageRef = ref(storageRef, filename);
  //     await uploadBytes(imageRef, blob);
  //     const downloadURL = await getDownloadURL(imageRef);
  //     return downloadURL;
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     throw error;
  //   }
  // };
  const openCamera = async () => {
    const respContent = await launchCamera();
    await setContentData(respContent);
  };
  const NextModal = () => {
    setSetupUp(setupUp + 1);
  };
  const BackModalCamera = () => {
    setSetupUp(setupUp - 1);
  };
  const NavigatetoDashboard = async () => {
    navigation.navigate('dashboard');
    setPostContent([]);
    setModalVisible(!modalVisible);
  };
  const removeContent = (index) => {
    setPostContent(postContent.filter((_, idx) => idx !== index));
  };

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        isVisible={modalVisible}
        backdropColor='#000000'
        backdropOpacity={0.8}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        {setupUp === 1 && (
          <>
            <View
              style={{
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingVertical: 10,
                minHeight: 300,
              }}
            >
              <Text>Post Status</Text>
              <ScrollView
                style={{
                  maxHeight: 300,
                }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.modalTopView}>
                  {postContent &&
                    postContent.map((item, index) => (
                      <View
                        key={index}
                        style={{ flexDirection: 'row', position: 'relative' }}
                      >
                        <Image
                          source={{ uri: item?.uri }}
                          style={styles.imagesContainer}
                        />
                        <IconButton
                          icon='close-circle-outline'
                          onPress={() => removeContent(index)}
                          style={{
                            position: 'absolute',
                            top: -18,
                            right: -16,
                            zIndex: 1,
                          }}
                          iconColor='#ee2a7b'
                        />
                      </View>
                    ))}
                  <View>
                    <IconButton
                      icon='plus'
                      mode='contained-tonal'
                      style={styles.addPhotosBtn}
                      onPress={openCamera}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginTop: 10,
              }}
            >
              <Button
                loading={sendLoading}
                icon='backspace-outline'
                onPress={NavigatetoDashboard}
                mode='elevated'
              >
                Cancel
              </Button>
              <Button
                loading={sendLoading}
                icon='forward'
                onPress={NextModal}
                mode='elevated'
              >
                Next
              </Button>
            </View>
          </>
        )}

        {setupUp === 2 && (
          <>
            <View style={[styles.modalViewBottom, { minHeight: 280 }]}>
              <View style={{ width: '100%' }}>
                <TextInput
                  label='Description'
                  value={description}
                  onChangeText={(value) => setDescription(value)}
                  mode='outlined'
                  placeholder='Add some description'
                  style={styles.textInput}
                />

                <TextInput
                  label='Location'
                  value={location}
                  onChangeText={(value) => setLocation(value)}
                  placeholder='Optional'
                  mode='outlined'
                  style={styles.textInput}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  icon='keyboard-return'
                  onPress={BackModalCamera}
                  mode='contained'
                  color='#ee2a7b'
                  labelStyle={styles.buttonLabel}
                >
                  Back
                </Button>
                <Button
                  loading={sendLoading}
                  icon='send'
                  onPress={sendPost}
                  mode='contained'
                  color='#ee2a7b'
                  labelStyle={styles.buttonLabel}
                >
                  Send Post
                </Button>
              </View>
            </View>
            {progress > 0 && (
              <View style={styles.progressBarContainer}>
                <ProgressBar progress={0.5} color='#ee2a7b' width={266} />
              </View>
            )}
            {errorPost && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {errorPost}, Check Your Internet Connection
                </Text>
              </View>
            )}
          </>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalTopView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    paddingVertical: 10,
    minHeight: 120,
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagesContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    gap: 10,
    borderRadius: 10,
  },
  addPhotosBtn: {
    width: 100,
    height: 100,
  },
  modalViewBottom: {
    minHeight: 400,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: '#f5f7fa',
    elevation: 1,
    borderRadius: 10,
    padding: 10,
  },
  textInput: {
    width: '100%',
    marginBottom: 10,
  },
  progressBarContainer: {
    backgroundColor: '#fff',
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 12,
  },
  errorContainer: {
    backgroundColor: '#ffcccc',
    minHeight: 20,
    padding: 10,
  },
  errorText: {
    color: '#d8000c',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonLabel: {
    color: '#fff',
  },
});

export default CameraModal;
