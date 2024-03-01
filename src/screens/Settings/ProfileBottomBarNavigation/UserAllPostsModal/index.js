import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import ModalTopBar from './ModalTopBar';
import UserPost from './UserPost';

const UserPostModal = ({ route }) => {
  const { UserAllPosts } = route.params;
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <ModalTopBar />
      {UserAllPosts && (
        <FlatList
          data={UserAllPosts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <UserPost key={item.postId} postData={item} />
          )}
          keyExtractor={(item) => item.postId}
        />
      )}
    </View>
  );
};

export default UserPostModal;

const styles = StyleSheet.create({});
