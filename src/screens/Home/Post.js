import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import PostHeader from './PostHeader';
import { Divider, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// import { useSelector } from 'react-redux';
// import { Video,  } from 'expo-av';
import Carousel from 'react-native-reanimated-carousel';
import { nanoid } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDb } from '../../firebase/firebaseConf';
import CommentBottomSheet from '../../components/CommentBottomSheet';

const Post = ({ postData }) => {
  const [isPostLiked, setIsPostLiked] = React.useState(false);
  const [isCommented, setIsCommented] = React.useState(false);
  const [isPostSaved, setIsPostSaved] = React.useState(false);
  const [isPostShared, setIsPostShared] = React.useState(false);
  const handleLike = () => {
    setIsPostLiked(!isPostLiked);
  };
  const handleComment = () => {
    setIsCommented(!isCommented);
  };
  const savedPost = () => {
    setIsPostSaved(!isPostSaved);
  };
  const handleShare = () => {
    setIsPostShared(!isPostShared);
  };

  const [creatorInfo, setCreatorInfo] = useState(null);

  const getPostUser = async () => {
    try {
      userRef = doc(firestoreDb, 'users', postData.userId);
      user = await getDoc(userRef);
      await setCreatorInfo(user.data());
      // console.log(user.data().userId, 'postUser');
    } catch (error) {
      console.log(error, 'postUser');
    }
  };
  useEffect(() => {
    getPostUser();
  }, []);
  // console.log(postData.id, 'postId');
  return (
    <>
      {/* Post Content */}
      <Divider />
      <View style={styles.postContainer}>
        <PostHeader PostBy={creatorInfo} postData={postData} />
        {postData.postImage && postData.postImage.length > 0 && (
          <Carousel
            loop
            style={styles.postImageContainer}
            data={postData?.postImage}
            width={370}
            scrollAnimationDuration={500}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.postImage} />
            )}
          />
        )}
      </View>
      <Divider />
      {/* Post Footer Image Post */}
      <View style={styles.postFooter}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton
              icon={isPostLiked ? 'heart' : 'heart-outline'}
              iconColor={isPostLiked ? '#FD1D1D' : '#262626'}
              onPress={handleLike}
              style={{ margin: 0, marginLeft: -10 }}
            />

            <CommentBottomSheet createdBy={creatorInfo} postData={postData} />

            <IconButton
              icon={() => <Feather name='send' size={24} />}
              iconColor={isPostShared ? '#0000001a' : '#262626'}
              onPress={handleShare}
              style={{ margin: 0 }}
            />
          </View>
          <View>
            <IconButton
              icon={
                isPostSaved
                  ? () => <FontAwesome name='bookmark' size={24} />
                  : () => <FontAwesome name='bookmark-o' size={24} />
              }
              onPress={savedPost}
              style={{ margin: 0 }}
            />
          </View>
        </View>
        {/* Footer Second */}
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: 700 }}>{postData?.likes} likes</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 10,
            gap: 10,
          }}
        >
          <Text style={{ fontWeight: 700 }}>{creatorInfo?.username}</Text>
          <Text style={{ color: '#262626' }}>{postData?.description}</Text>
        </View>
        <View>
          <Text style={{ color: '#000000' }}>7 days Ago</Text>
        </View>
      </View>
      <Divider />
      {/* Post Content */}
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    // height: 'auto',
    flex: 1,
  },
  postImageContainer: {
    minHeight: 353,
    width: '100%',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postVideo: {
    width: '100%',
    minHeight: 500,
  },
  postFooter: {
    minHeight: 60,
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingBottom: 8,
  },
});
