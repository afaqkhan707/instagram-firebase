import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import UserPostData from './UserPostData';
import ImageModal from './ImageModal';

const OtherProfileInfo = ({ postAuthor }) => {
  const userPostData = [
    { id: 1, title: 'posts', value: 0 },
    { id: 2, title: 'followers', value: postAuthor?.followers?.length },
    { id: 3, title: 'following', value: postAuthor?.following?.length },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <ImageModal postAuthor={postAuthor} />
        <Text style={{ fontWeight: '800', fontSize: 16, marginTop: 10 }}>
          {postAuthor?.username}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#333' }}>{postAuthor?.bio}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 24,
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 3,
          paddingVertical: 1,
          height: 100,
          width: '78%',
        }}
      >
        {userPostData.map((data) => (
          <UserPostData key={data.id} title={data.title} value={data.value} />
        ))}
      </View>
    </View>
  );
};

export default OtherProfileInfo;

const styles = StyleSheet.create({});
