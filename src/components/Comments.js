import {
  collection,
  doc,
  query,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
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

const CommentSection = ({ postData, creatorInfoData }) => {
  const [commentContent, setCommentContent] = useState('');
  const [isCommentLiked, setIsCommentLiked] = useState(false);

  console.log(creatorInfoData.userId, 'userId');
  const handleSubmitComment = async () => {
    if (commentContent.trim() !== '') {
      try {
        const updateDocRef = doc(firestoreDb, 'posts', postData.id);
        console.log(creatorInfoData?.proImgLink, 'juuuu');
        const newComment = {
          commentId: nanoid(),
          commentValue: commentContent,
          // createdAt: new Date().toISOString(),
          createdAt: serverTimestamp(),
          userId: creatorInfoData?.userId,
        };
        await updateDoc(updateDocRef, {
          comments: arrayUnion(newComment),
        });
        setCommentContent('');
      } catch (error) {
        console.log(error.code);
      }
    }
  };

  const getCommentUser = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 13 }}>Comments</Text>
      </View>
      <Divider />
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
            uri: 'https://unsplash.com/photos/person-in-black-pants-and-black-sneakers-sitting-on-top-of-building-during-daytime-dL8xHCtVOg0',
          }}
        />
        <View style={{ flexDirection: 'column', flex: 1, paddingLeft: 20 }}>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text>{creatorInfoData?.username}</Text>
            <Text> 3d</Text>
          </View>
          <View>
            <Text>Comments Details</Text>
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
      <FlatList
        data={postData.comments}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.commentText}>{item.commentValue}</Text>
          </View>
        )}
        contentContainerStyle={styles.commentList}
        keyExtractor={(item) => item.commentId}
      />
      <View style={styles.inputFieldContainer}>
        <Avatar.Image
          size={40}
          source={{
            uri: creatorInfoData?.proImgLink,
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
        <IconButton
          // icon={() => (
          //   <MaterialCommunityIcons
          //     name='file-gif-box'
          //     size={24}
          //     color='black'
          //   />
          // )}
          icon='file-gif-box'
          // onPress={addNewComment}
          // onPress={addComment}
        />
        <IconButton
          icon='send'
          onPress={handleSubmitComment}
          iconColor='#3797EF'
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
