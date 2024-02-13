import React from 'react';
import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import HomeAppBar from '../../components/HomeAppBar';
import StatusBarUsers from './StatusBar';
import Post from './Post';
import CameraModal from '../../components/CameraModal';
import StatusUser from '../../components/StatusUser';
import { getAllUsers } from '../../redux/services/firebaseActions';
import { useDispatch, useSelector } from 'react-redux';
const HomeTab = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [postContent, setPostContent] = React.useState([]);
  const dispatch = useDispatch();
  const setContent = (content) => {
    setPostContent([...postContent, content]);
  };
  const userId = useSelector((state) => state.auth.currentUser?.userId);
  React.useEffect(() => {
    dispatch(getAllUsers(userId));
  }, [userId]);
  return (
    <>
      <CameraModal
        setContentData={setContent}
        postContent={postContent}
        setPostContent={setPostContent}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        // StickyHeaderComponent={HomeAppBar}
      >
        <HomeAppBar
          setContentData={setContent}
          setModalVisible={setModalVisible}
        />

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
