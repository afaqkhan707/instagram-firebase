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

const CameraModal = (props) => {
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
  const sendPost = () => {
    console.log('Post Send to Firebase');
    props.setModalVisible(!props.modalVisible);
  };
  const openCamera = async () => {
    const respContent = await launchCamera();
    await props.setContentData(respContent);
  };
  const oo = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1707090804669-72f8a7f3348e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1707090804669-72f8a7f3348e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1707090804669-72f8a7f3348e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1707090804669-72f8a7f3348e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1707090804669-72f8a7f3348e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1707090804669-72f8a7f3348e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1707090804669-72f8a7f3348e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1707090804669-72f8a7f3348e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1707090804669-72f8a7f3348e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <AppBarBackIcon
          onPress={() => props.setModalVisible(!props.modalVisible)}
        />

        <ScrollView style={styles.modalView}>
          <View style={styles.modalTopView}>
            {
              // props.content &&
              oo.map((item) => (
                <Image
                  source={{ uri: item.uri }}
                  key={item.id}
                  style={styles.imagesContainer}
                />
              ))
            }
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
  modalView: {
    backgroundColor: 'red',
    flex: 1,
  },
  modalTopView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 10,
    // maxHeight: 340,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagesContainer: {
    width: 100,
    height: 100,
    // flexDirection: 'row',
    backgroundColor: '#fff',
    gap: 10,
  },
  addPhotosBtn: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalViewBottom: {
    width: '100%',
    minHeight: 284,
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
{
  /* <FlatList
            data={props.content}
            contentContainerStyle={{
              flexDirection: 'column',
              rowGap: 10,
            }}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.uri }}
                style={styles.imagesContainer}
              />
            )}
            keyExtractor={(item,index) => index}
            numColumns={3}
          /> */
}
{
  /* <View
          style={{
            alignItems: 'flex-end',
            // justifyContent: 'center',
            backgroundColor: '#fff',
            paddingVertical: 8,
            paddingHorizontal: 14,
          }}
        >
        </View> */
}
{
  /* <View style={styles.modalViewTop}>
        </View> */
}
