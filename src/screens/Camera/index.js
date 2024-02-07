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
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

const CameraModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
 
  const sendPost = () => {
    console.log('Post Send TO Firebase');
    setModalVisible(!modalVisible);
  };
  const openCamera = () => {
    // setModalVisible(!modalVisible);
  };
  const [image, setImage] = React.useState([
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1647202324921-0177441f6aaa?q=80&w=1390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    
  ]);
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
        <View style={styles.modalViewTop}>
          <FlatList
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
            keyExtractor={(item) => item.id}
            numColumns={3}
          />
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            // justifyContent: 'center',
            backgroundColor: '#fff',
            paddingVertical: 8,
            paddingHorizontal: 14,
          }}
        >
          <Button icon='plus' mode='elevated' onPress={openCamera}>
            add Photos
          </Button>
        </View>

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
  modalViewTop: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    maxHeight: 400,
  },
  imagesContainer: {
    width: 100,
    height: 120,
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
