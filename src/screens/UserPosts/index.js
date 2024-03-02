import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import UserPost from './UserPost';
import UserPostsAppBar from './userPostsAppBar';

const UserPosts = ({ route }) => {
  const { UserAllPosts, PostsOwner } = route.params;
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <UserPostsAppBar />
      {UserAllPosts && (
        <FlatList
          data={UserAllPosts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <UserPost key={item.postId} postData={item} postBy={PostsOwner} />
          )}
          keyExtractor={(item) => item.postId}
        />
      )}
    </View>
  );
};

export default UserPosts;

const styles = StyleSheet.create({});
