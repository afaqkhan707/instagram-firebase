import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import UserPostData from './UserPostData';
import ImageModal from './ImageModal';

const OtherProfileInfo = ({ userData, totalPost }) => {
  const userPostData = [
    { id: 1, title: 'posts', value: totalPost },
    { id: 2, title: 'followers', value: userData?.followers?.length },
    { id: 3, title: 'following', value: userData?.following?.length },
  ];

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <ImageModal userData={userData} />
          <Text style={{ fontWeight: '800', fontSize: 16, marginTop: 2 }}>
            {userData?.username}
          </Text>
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
      <View style={{ minHeight: 20, paddingHorizontal: 26 }}>
        <Text style={{ fontSize: 12, color: '#333' }}>{userData?.bio}</Text>
      </View>
    </>
  );
};

export default OtherProfileInfo;

const styles = StyleSheet.create({});
