import React from 'react';
import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import HomeAppBar from '../../components/HomeAppBar';
import StatusBarUsers from './StatusBar';
import Post from './Post';
import { useSelector } from 'react-redux';
import CameraModal from '../../components/CameraModal';

const HomeTab = () => {
  const [postContent, setPostContent] = React.useState();

  const setContent = (res) => {
    // console.log(res, 'sssssssssssssssssssssss');
    setPostContent(res);
  };
  if (postContent) console.log(postContent, 'post content');
  return (
    <>
      <CameraModal content={postContent} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        // StickyHeaderComponent={HomeAppBar}
      >
        <HomeAppBar setContent={setContent} />
        <StatusBarUsers />
        <Post />
      </ScrollView>
    </>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff',
  },
});
