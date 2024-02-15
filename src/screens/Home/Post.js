import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import PostHeader from './PostHeader';
import { IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
// import { useSelector } from 'react-redux';
// import { Video,  } from 'expo-av';
import Carousel from 'react-native-reanimated-carousel';
import { nanoid } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDb } from '../../firebase/firebaseConf';

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
      setCreatorInfo(user.data());
    } catch (error) {
      console.log(error, 'postUser');
    }
  };
  useEffect(() => {
    getPostUser();
  }, []);
  return (
    <>
      {/* Post Content */}
      <View style={styles.postContainer}>
        <PostHeader PostBy={creatorInfo} postLocation={postData.address} />
        {postData.postImage && postData.postImage.length > 0 && (
          <Carousel
            style={styles.postImageContainer}
            data={postData?.postImage}
            width={370}
            scrollAnimationDuration={500}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.postImage} />
            )}
            key={({ item }) => item.id}
          />
        )}
      </View>

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
          <Text style={{ fontWeight: 700 }}>{postData.likes} likes</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 10,
            gap: 10,
          }}
        >
          <Text style={{ fontWeight: 700 }}>{creatorInfo.username}</Text>
          <Text style={{ color: '#262626' }}>{postData.description}</Text>
        </View>
        <View>
          <Text style={{ color: ' #00000066' }}>7 days Ago</Text>
        </View>
      </View>
      {/* </View> */}
      {/* Post Content */}
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    height: 'auto',
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
    height: '100%',
  },
  postVideo: {
    width: '100%',
    minHeight: 'auto',
  },
  postFooter: {
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 60,
    backgroundColor: 'pink',
    paddingLeft: 16,
    paddingBottom: 8,
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

// const imagesCa = [
//   {
//     id: nanoid(),
//     url: 'https://images.unsplash.com/photo-1647202324921-0177441f6aaa?q=80&w=1390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     id: nanoid(),
//     url: 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     id: nanoid(),
//     url: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
// ];

{
  /* Video Post UI */
}
{
  /* <View style={styles.postContainer}>
  <PostHeader /> */
}
{
  /* Post Video Content */
}

{
  /* <View style={styles.postImageContainer}>
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
 </View> */
}

{
  /* Post Footer Image Post */
}
{
  /* <View style={styles.postFooter}>
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
</View>; */
}

{
  /* /* Post Video Content End */
}
