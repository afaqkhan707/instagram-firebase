import { doc, deleteDoc } from 'firebase/firestore';

import React, { useRef } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { firestoreDb } from '../../firebase/firebaseConf';
import { useDispatch } from 'react-redux';
import { removePost } from '../../redux/slices/postSlice';

const screenHeight = Dimensions.get('window').height;

const CustomButton = ({ iconName, label, onPress }) => (
  <Button
    icon={iconName}
    style={{ width: '100%' }}
    buttonColor='#fff'
    textColor='#3797EF'
    rippleColor='#0000001a'
    onPress={onPress}
  >
    {label}
  </Button>
);

export default function PostBottomSheet({ postId }) {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const deletePost = async () => {
    try {
      const deleteDocRef = doc(firestoreDb, 'posts', postId);
      await deleteDoc(deleteDocRef);
      dispatch(removePost(postId));
      refRBSheet.current.close();
    } catch (error) {
      console.log('error while DeletinDOc', error.code);
    }
  };
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
          height={screenHeight - 660}
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
              minHeight: 60,
              alignItems: 'center',
              flex: 1,
            }}
          >
            <CustomButton
              iconName='delete'
              label='Delete Post'
              onPress={deletePost}
            />
          </View>
        </RBSheet>
      </TouchableOpacity>
    </>
  );
}
