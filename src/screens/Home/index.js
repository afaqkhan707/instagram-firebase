import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import HomeAppBar from '../../components/HomeAppBar';
import StatusBarUsers from './StatusBar';
import Post from './Post';
import CameraModal from '../../components/CameraModal';
import StatusUser from '../../components/StatusUser';
import { getAllUsers, getPosts } from '../../redux/services/firebaseActions';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileCards from './UserProfileCards';
const HomeTab = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [postContent, setPostContent] = React.useState([]);
  const dispatch = useDispatch();
  const setContent = (content) => {
    setPostContent([...postContent, content]);
  };
  const userId = useSelector((state) => state.auth.currentUser?.userId);

  const posts = useSelector((state) => state.post.posts);

  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    dispatch(getAllUsers(userId));
  }, [userId]);

  React.useEffect(() => {
    dispatch(getPosts(userId));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
    dispatch(getPosts(userId));
  }, []);
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
        refreshControl={
          <RefreshControl
            colors={['gray', '#0000001a', '#33333333']}
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{ marginTop: 60 }}
          />
        }
      >
        <HomeAppBar
          setContentData={setContent}
          setModalVisible={setModalVisible}
        />
        <StatusBarUsers />
        {/* <UserProfileCards /> */}
        {posts &&
          posts.map((item) => {
            return <Post key={item.postId} postData={item} />;
          })}
      </ScrollView>
    </>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
