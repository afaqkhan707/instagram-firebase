import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PostHeader from './PostHeader';
import { IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Video, ResizeMode } from 'expo-av';
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
  const url =
    'https://images.unsplash.com/photo-1647202324921-0177441f6aaa?q=80&w=1390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <>
      <View style={styles.postContainer}>
        <PostHeader />
        {/* 
      {postContent[0] && (
        <Image source={{ uri: postContent[0] }} style={styles.postImage} />
      )} */}

        <View style={styles.postImageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1624812449802-99c34cb56654?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.postImage}
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
      </View>

      {/* Video Post UI */}
      <View style={styles.postContainer}>
        <PostHeader />
        <View style={styles.postImageContainer}>
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
            style={styles.postImage}
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
      </View>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    height: 'auto',
    minHeight: '350',
    borderColor: '#0000001a',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flex: 1,
  },
  postImageContainer: {
    maxHeight: 400,
  },
  postImage: {
    width: '100%',
    minHeight: 375,
  },
  postFooter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
