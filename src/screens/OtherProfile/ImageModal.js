import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Avatar } from 'react-native-paper';

const ImageModal = ({ userData }) => {
  const image =
    'https://images.unsplash.com/photo-1708852154434-d6436655b99d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const [modalVisible, setModalVisible] = useState(false);

  const displayImage = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={displayImage}>
        <View style={styles.avatarContainer}>
          <Avatar.Image size={80} source={{ uri: userData?.proImgLink }} />
        </View>
      </TouchableOpacity>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
          <ImageBackground
            source={{ uri: userData?.proImgLink }}
            style={styles.modalBackdrop}
            resizeMode='cover'
            blurRadius={5}
          >
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={(e) => {
                e.stopPropagation();
              }}
            >
              <Image
                source={{ uri: userData?.proImgLink }}
                style={styles.modalImage}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#fff',
    zIndex: 1,
  },
});
