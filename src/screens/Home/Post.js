import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PostHeader from './PostHeader';
import { IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Video, ResizeMode } from 'expo-av';
import Carousel from 'react-native-reanimated-carousel';
import { nanoid } from '@reduxjs/toolkit';

const Post = () => {
  const [isPostLiked, setIsPostLiked] = React.useState(false);
  const [isCommented, setIsCommented] = React.useState(false);
  const [isPostSaved, setIsPostSaved] = React.useState(false);
  const [isPostShared, setIsPostShared] = React.useState(false);
  const postContent = useSelector((state) => state.post?.content);
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
  const [video, setVideo] = React.useState(null);
  const [status, setStatus] = React.useState({});
  const imagesCa = [
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1647202324921-0177441f6aaa?q=80&w=1390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: nanoid(),
      url: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  return (
    <>
      {/* Post Content */}
      <View style={styles.postContainer}>
        <PostHeader />
        {/* <View style={styles.postImageContainer}> */}
        {/* <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1624812449802-99c34cb56654?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.postImage}
          /> */}
        <Carousel
          style={styles.postImageContainer}
          data={imagesCa}
          width={370}
          scrollAnimationDuration={500}
          renderItem={({ item }) => (
            <Image source={{ uri: item.url }} style={styles.postImage} />
          )}
        />
      </View>

      {/* Post Footer Image Post */}
      <View style={styles.postFooter}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            icon={isPostLiked ? 'heart' : 'heart-outline'}
            iconColor={isPostLiked ? '#FD1D1D' : '#262626'}
            onPress={handleLike}
            style={{ marginLeft: 3 }}
          />

          <IconButton
            icon={() => <Feather name='message-circle' size={24} />}
            onPress={handleComment}
            style={{ margin: 0 }}
          />

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
          />
        </View>
      </View>
      {/* </View> */}
      {/* Post Content */}

      {/* Video Post UI */}
      <View style={styles.postContainer}>
        <PostHeader />
        {/* Post Video Content */}

        {/* <View style={styles.postImageContainer}>
          <Video
            ref={video}
            // style={styles.video}
            source={{
              uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            style={styles.postVideo}
          />
        </View> */}

        {/* Post Footer Image Post */}
        <View style={styles.postFooter}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton
              icon={isPostLiked ? 'heart' : 'heart-outline'}
              iconColor={isPostLiked ? '#FD1D1D' : '#262626'}
              onPress={handleLike}
              style={{ marginLeft: 3 }}
            />

            <IconButton
              icon={() => <Feather name='message-circle' size={24} />}
              onPress={handleComment}
              style={{ margin: 0 }}
            />

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
            />
          </View>
        </View>
      </View>
      {/* Post Video Content End*/}
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    height: 'auto',
    // minHeight: '350',
    borderColor: '#0000001a',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flex: 1,
  },
  postImageContainer: {
    minHeight: 400,
    width: '100%',
  },
  postImage: {
    minHeight: 375,
  },
  postVideo: {
    width: '100%',
    minHeight: 'auto',
  },
  postFooter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

{
  /* <Carousel
            loop
            width={375}
            height={375}
            autoPlay={false}
            data={imagesCa}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: 'center',
                }}
              >
                <Text style={{ textAlign: 'center', fontSize: 30 }}>
                  {index}
                </Text>
              </View>
            )}
          /> */
}
