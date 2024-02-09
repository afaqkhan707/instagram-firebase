import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Image,
  FlatList,
  ScrollView,
  Text,
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { launchCamera } from '../utils/launchCamera';
import AppBarBackIcon from './BackBtnIcon';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firestoreDb, storage } from '../firebase/firebaseConf';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { addDoc, collection, doc } from 'firebase/firestore';

const CameraModal = ({
  postContent,
  modalVisible,
  setModalVisible,
  setContentData,
}) => {
  // const userId = useSelector((state) => state.auth?.user);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [sendLoading, setSendLoading] = useState(false);
  const [setupUp, setSetupUp] = useState(1);

  const sendPost = async () => {
    setSendLoading(true);
    try {
      const uploadTasks = [];
      for (const imageUrl of postContent) {
        const response = await uploadImage(imageUrl.uri);
        uploadTasks.push(response);
      }
      await Promise.all(uploadTasks);
      const data = {
        postImage: uploadTasks,
        comments: [],
        likes: 0,
        userId: '',
        address: location,
        description: description,
        postId: '',
      };
      await addDoc(collection(firestoreDb, 'posts'), data);
      setModalVisible(!modalVisible);
      console.log(data, 'data');
    } catch (error) {
      console.error('Error uploading images or getting download URLs:', error);
    } finally {
      setSendLoading(false);
    }
  };
  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, 'post_media_files/');
      const filename = `${Date.now()}-${nanoid()}`;
      const imageRef = ref(storageRef, filename);
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
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

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        isVisible={modalVisible}
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
                      <Image
                        source={{ uri: item.uri }}
                        key={index}
                        style={styles.imagesContainer}
                      />
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
            <View style={{ paddingVertical: 3 }}>
              <Button
                loading={sendLoading}
                icon='forward'
                onPress={NextModal}
                mode='elevated'
                textColor='#ee2a7b'
              >
                Next
              </Button>
            </View>
          </>
        )}

        {setupUp === 2 && (
          <>
            <View style={styles.modalViewBottom}>
              <TextInput
                label='description'
                value={description}
                onChangeText={(value) => setDescription(value)}
                mode='outlined'
                placeholder='add some description'
                width={300}
                outlineStyle={{
                  borderWidth: 0,
                  borderWidth: 0.5,
                  borderColor: '#0000001a',
                }}
                activeOutlineColor='#333'
              />
              <TextInput
                label='Location'
                value={location}
                onChangeText={(value) => setLocation(value)}
                placeholder='optional'
                mode='outlined'
                width={150}
                outlineStyle={{
                  borderWidth: 0.5,
                  borderColor: '#0000001a',
                }}
                activeOutlineColor='#333'
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}
            >
              <View>
                <Button
                  icon='keyboard-return'
                  onPress={BackModalCamera}
                  mode='elevated'
                  textColor='#ee2a7b'
                >
                  Back
                </Button>
              </View>
              <View>
                <Button
                  loading={sendLoading}
                  icon='send'
                  onPress={sendPost}
                  mode='elevated'
                  textColor='#ee2a7b'
                >
                  Send Post
                </Button>
              </View>
            </View>
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
    minHeight: 140,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default CameraModal;
