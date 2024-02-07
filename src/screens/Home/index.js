import React from 'react';
import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import HomeAppBar from '../../components/HomeAppBar';
import StatusBarUsers from './StatusBar';
import Post from './Post';
import { useSelector } from 'react-redux';
import CameraModal from '../../components/CameraModal';

const HomeTab = () => {
  const [postContent, setPostContent] = React.useState([]);
  const [modalVisible, setModalVisible] =React.useState(true);

  const setContent = (content) => {
    setPostContent([...postContent, content]);
  };
  if (postContent) console.log(postContent, 'post content');
  return (
    <>
      <CameraModal content={postContent}  setContentData={setContent}  modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        // StickyHeaderComponent={HomeAppBar}
      >
        <HomeAppBar setContentData={setContent} setModalVisible={setModalVisible}/>
        {/* <StatusBarUsers /> */}
        {/* <Post /> */}
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
