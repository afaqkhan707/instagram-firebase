import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { launchCamera } from '../utils/launchCamera';
import AppBarBackIcon from './BackBtnIcon';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../firebase/firebaseConf';
import { useSelector } from 'react-redux';

const CameraModal = ({
  postContent,
  setPostContent,
  modalVisible,
  setModalVisible,
  setContentData,
}) => {
  const userId = useSelector((state) => state.auth.user);
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [sendLoading, setSendLoading] = React.useState(false);

  const sendPost = async () => {
    setSendLoading(true);
    try {
      const uploadTasks = [];
      for (const imageUrl of postContent) {
        const response = await uploadImage(imageUrl.uri);
        uploadTasks.push(response);
      }
      await Promise.all(uploadTasks);
      // console.log(uploadTasks, 'responses uploaded images');
      const data = {
        postImage: uploadTasks,
        comments: [],
        likes: 0,
        userId: '',
        address: '',
        description: '',
      };
      console.log(data, 'data');
    } catch (error) {
      console.error('Error uploading images or getting download URLs:', error);
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

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <AppBarBackIcon onPress={() => setModalVisible(!modalVisible)} />

        <ScrollView
          style={{
            flex: 1,
            maxHeight: 350,
          }}
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
        <View style={styles.modalViewBottom}>
          <TextInput
            label='description'
            value={description}
            onChangeText={(value) => setDescription(value)}
            mode='outlined'
            placeholder='add Some description'
            width={333}
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
            style={{ position: 'absolute', top: 80, left: 20 }}
            outlineStyle={{
              borderWidth: 0.5,
              borderColor: '#0000001a',
            }}
            activeOutlineColor='#333'
          />
          <Button
            loading={sendLoading}
            icon='send'
            onPress={sendPost}
            mode='elevated'
            style={styles.postButton}
          >
            Send Post
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalTopView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 10,
    minHeight: 180,
    backgroundColor: 'rgba(0,0,0,0.7)',
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
    width: '100%',
    minHeight: 290,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#fff',
    alignItems: 'flex-end',

    elevation: 1,
    padding: 10,
  },
  postButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default CameraModal;
