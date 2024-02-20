import React, { useRef, useState, useEffect } from 'react';
import { View, Dimensions, Keyboard } from 'react-native'; // Import Keyboard
import { IconButton, Text } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Feather } from '@expo/vector-icons';
import CommentSection from './Comments';

const screenHeight = Dimensions.get('window').height;

export default function CommentBottomSheet({ createdBy, postData }) {
  const refRBSheet = useRef();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [keyboardOpen]);

  return (
    <>
      <IconButton
        onPress={() => refRBSheet.current.open()}
        icon={() => <Feather name='message-circle' size={24} />}
        style={{ margin: 0 }}
      />
      <RBSheet
        ref={refRBSheet}
        height={screenHeight - (keyboardOpen ? 900 : 200)}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
          draggableIcon: {
            backgroundColor: '#777777',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
            position: keyboardOpen ? 'absolute' : 'relative',
            bottom: 0,
            right: 0,
          },
        }}
      >
        <View style={{ flex: 1 }}>
          <CommentSection postData={postData} creatorInfoData={createdBy} />
        </View>
      </RBSheet>
    </>
  );
}
