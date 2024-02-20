import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  Text,
} from 'react-native';
import { Avatar, Divider, IconButton } from 'react-native-paper';
import { firestoreDb } from '../firebase/firebaseConf';
import { nanoid } from '@reduxjs/toolkit';
import { setCommentState } from '../redux/slices/postSlice';
import { useDispatch, useSelector } from 'react-redux';

const CommentSection = ({ postData, creatorInfoData }) => {
  const [commentContent, setCommentContent] = useState('');
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [sendingComment, setSendingComment] = useState(false);

  const activeUser = useSelector((state) => state.auth?.currentUser);
  console.log(activeUser, 'dara');
  const dispatch = useDispatch();
  const handleSubmitComment = async (postData, commentContent) => {
    if (commentContent.trim() === '') return;
    setSendingComment(true);
    try {
      const updateDocRef = doc(firestoreDb, 'posts', postData.id);
      const newComment = {
        commentId: nanoid(),
        commentValue: commentContent,
        createdAt: new Date().toISOString(),
        commenterUserId: activeUser?.userId,
        proImgLink: activeUser?.proImgLink,
        username: activeUser?.username,
        commentLikes: 0,
      };
      if (newComment) {
        await updateDoc(updateDocRef, {
          comments: arrayUnion(newComment),
        });
        dispatch(setCommentState({ id: postData.id, comment: newComment }));
        setCommentContent('');
        setSendingComment(false);
      }
    } catch (error) {
      console.log(error.code);
      console.log(error.code, '');
      setSendingComment(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 13 }}>Comments</Text>
      </View>
      <Divider />
      <FlatList
        data={postData.comments}
        showsVerticalScrollIndicator
        renderItem={({ item }) => (
          <>
            <View
              style={{
                minHeight: 70,
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 14,
                alignItems: 'center',
              }}
            >
              <Avatar.Image
                size={40}
                source={{
                  uri: item?.proImgLink,
                }}
              />
              <View
                style={{ flexDirection: 'column', flex: 1, paddingLeft: 20 }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text>{item.username}</Text>
                  <Text> 3d</Text>
                </View>
                <View>
                  <Text>{item?.commentValue}</Text>
                </View>
              </View>
              <IconButton
                icon={isCommentLiked ? 'heart' : 'heart-outline'}
                onPress={() => {
                  setIsCommentLiked(!isCommentLiked);
                }}
                iconColor={isCommentLiked ? '#FD1D1D' : '#a3a3a3a3'}
              />
            </View>
            <Divider />
          </>
        )}
        contentContainerStyle={styles.commentList}
        keyExtractor={(item) => item.commentId}
      />
      <View style={styles.inputFieldContainer}>
        <Avatar.Image
          size={40}
          source={{
            uri: activeUser?.proImgLink,
          }}
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={styles.inputField}
          value={commentContent}
          onChangeText={setCommentContent}
          placeholderTextColor={'#aaa'}
          placeholder='Add a  comment...'
          // onSubmitEditing={handleSubmitComment}
        />
        <IconButton icon='file-gif-box' onPress={() => {}} />
        <IconButton
          icon='send'
          onPress={() =>
            handleSubmitComment(postData, commentContent, creatorInfoData)
          }
          iconColor='#3797EF'
          loading={sendingComment}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRadius: 4,
  },
  inputField: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    flex: 1,
  },
  commentList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  commentItem: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    marginVertical: 5,
  },
  commentText: {
    fontSize: 14,
  },
  header: {
    minHeight: 50,
    justifyContent: 'flex-end',
    paddingBottom: 8,
    alignItems: 'center',
  },
});

export default CommentSection;
