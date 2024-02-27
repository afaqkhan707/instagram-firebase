import { doc, deleteDoc } from 'firebase/firestore';

import React, { useRef } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Divider, IconButton } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { firestoreDb } from '../../firebase/firebaseConf';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../../redux/slices/postSlice';

const screenHeight = Dimensions.get('window').height;

const CustomButton = ({ iconName, label, onPress, textColor }) => (
  <>
    <Button
      icon={iconName}
      mode='contained-tonal'
      style={{
        borderRadius: 8,
      }}
      buttonColor='#fff'
      textColor={textColor}
      rippleColor='#0000001a'
      onPress={onPress}
    >
      {label}
    </Button>
    <Divider />
  </>
);

export default function PostBottomSheet({ postId }) {
  const loggedUser = useSelector((state) => state.auth?.currentUser);
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const deletePost = async () => {
    try {
      const deleteDocRef = doc(firestoreDb, 'posts', postId.id);
      await deleteDoc(deleteDocRef);
      dispatch(removePost(postId.id));
      refRBSheet.current.close();
    } catch (error) {
      console.log('error while Deleting Doc', error.code);
    }
  };
  const deleteAccess = loggedUser?.userId === postId?.userId;
  return (
    <>
      <IconButton
        onPress={() => refRBSheet.current.open()}
        icon='dots-vertical'
        iconColor='#262626'
      />
      <TouchableOpacity
        onPress={() => refRBSheet.current.close()}
        activeOpacity={1}
        style={{ flex: 1 }}
      >
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.7)',
              overflow: 'hidden',
            },
            draggableIcon: {
              backgroundColor: '#777777',
            },
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: '#fff',
            },
          }}
        >
          <View
            style={{
              paddingVertical: 1,
              gap: 1,
              alignItems: 'center',
              backgroundColor: 'purple',
              backgroundColor: '#FFF',
            }}
          >
            {deleteAccess && (
              <CustomButton
                iconName='delete'
                label='Delete Post'
                onPress={deletePost}
                textColor='#b30000'
              />
            )}
            <CustomButton
              iconName='pencil-box'
              label='Edit Post'
              textColor='#000'
              onPress={() => {}}
            />
            <CustomButton
              iconName='share'
              label='Share Post on your account'
              textColor='#000'
              onPress={() => {}}
            />
          </View>
        </RBSheet>
      </TouchableOpacity>
    </>
  );
}
