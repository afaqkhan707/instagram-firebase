import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { Divider, IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import UserPostHeader from './UserPostHeader';
import { useSelector } from 'react-redux';
import CommentBottomSheet from '../../../../components/CommentBottomSheet';

const UserPost = ({ postData }) => {
  const { width: screenWidth } = Dimensions.get('window');
  const [isPostLiked, setIsPostLiked] = React.useState(false);
  const [isCommented, setIsCommented] = React.useState(false);
  const [isPostSaved, setIsPostSaved] = React.useState(false);
  const [isPostShared, setIsPostShared] = React.useState(false);
  const loggedUser = useSelector((state) => state.auth?.currentUser);
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

  return (
    <>
      {/* Post Content */}
      <Divider />
      <View style={styles.postContainer}>
        <UserPostHeader PostBy={postData} />
        {postData.postImage && postData.postImage.length > 0 && (
          <Carousel
            style={[styles.postImageContainer, { width: screenWidth }]}
            data={postData?.postImage}
            width={screenWidth}
            scrollAnimationDuration={500}
            loop={false}
            renderItem={({ item, index }) => (
              <>
                <Image source={{ uri: item }} style={styles.postImage} />
                {postData?.postImage.length > 1 && (
                  <Text style={styles.imageIndex}>
                    {index + 1}/{postData?.postImage.length}
                  </Text>
                )}
              </>
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

            <CommentBottomSheet createdBy={loggedUser} postData={postData} />

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
          <Text style={{ fontWeight: 700 }}>{loggedUser?.username}</Text>
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

export default UserPost;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
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
  imageIndex: {
    position: 'absolute',
    top: 15,
    right: 16,
    color: '#dddddd',
    padding: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
