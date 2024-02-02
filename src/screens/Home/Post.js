import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PostHeader from './PostHeader';
import { IconButton } from 'react-native-paper';
import { EvilIcons } from '@expo/vector-icons';
import MsgSvg from '../../components/Svgs/MsgSvg';
import { Entypo } from '@expo/vector-icons';
import SavedSvg from '../../components/Svgs/SavedSvg';
const Post = () => {
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
  const url =
    'https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <View style={styles.postContainer}>
      <PostHeader />
      <View style={styles.postImageContainer}>
        <Image source={{ uri: url }} style={styles.postImage} />
      </View>
      <View style={styles.postFooter}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            icon={isPostLiked ? 'heart' : 'heart-outline'}
            iconColor={isPostLiked ? '#FD1D1D' : '#262626'}
            onPress={handleLike}
          />
          <EvilIcons
            name='comment'
            size={36}
            color={isCommented ? '#FD1D1D' : '#262626'}
            onPress={handleComment}
          />
          <IconButton
            icon={'share'}
            iconColor={isPostShared ? '#0000001a' : '#262626'}
            onPress={handleShare}
          />
        </View>

        <IconButton
          iconColor={isPostSaved ? '#fd1d1d' : '#262626'}
          icon={isPostSaved ? 'book-lock' : 'book-lock-open-outline'}
          onPress={savedPost}
        />
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    height: 'auto',
  },
  postImageContainer: {
    maxHeight: 400,
    padding: 1,
  },
  postImage: {
    width: '100%',
    minHeight: 375,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

{
  /* <IconButton
          icon={isCommented ? 'comment' : 'comment-outline'}
          iconColor={isCommented ? '#FD1D1D' : '#262626'}
          onPress={handleComment}
          size={24}
        /> */
}
{
  /* <View style={{ gap: 0, flexDirection: 'row' }}>
          <Entypo name='dot-single' size={24} color='#3897F0' />
          <Entypo name='dot-single' size={24} color='#000ss' />
          <Entypo name='dot-single' size={24} color='#000' />
          <Entypo name='dot-single' size={24} color='#000' />
        </View> */
}
