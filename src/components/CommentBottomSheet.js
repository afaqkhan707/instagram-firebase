import React, { useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Feather } from '@expo/vector-icons';
import CommentSection from './Comments';

const screenHeight = Dimensions.get('window').height;

export default function CommentBottomSheet({ createdBy, postData }) {
  const refRBSheet = useRef();

  return (
    <>
      <IconButton
        onPress={() => refRBSheet.current.open()}
        icon={() => <Feather name='message-circle' size={24} />}
        style={{ margin: 0 }}
      />
      <View
        style={
          {
            //   flex: 1,
            //   backgroundColor: 'red',
          }
        }
      >
        <RBSheet
          ref={refRBSheet}
          height={screenHeight - 8}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              //   backgroundColor: 'transparent',
              backgroundColor: 'rgba(0,0,0,0.7)',
            },
            draggableIcon: {
              backgroundColor: '#777777',
            },
          }}
        >
          <CommentSection postData={postData} creatorInfoData={createdBy} />
        </RBSheet>
      </View>
    </>
  );
}
