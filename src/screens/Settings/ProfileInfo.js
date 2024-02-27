import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Avatar, Button, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import UserPostData from './UserPostData';
import { useNavigation } from '@react-navigation/native';

const ProfileInfo = ({ myAllPosts }) => {
  const loggedUser = useSelector((state) => state.auth?.currentUser);

  // const totalPost = useSelector((state) => state.post?.posts);

  // const myPost = totalPost?.filter(
  //   (post) => post.userId === loggedUser?.userId
  // );
  const userPostData = [
    { id: 1, title: 'posts', value: myAllPosts },
    { id: 2, title: 'followers', value: loggedUser?.followers?.length },
    { id: 3, title: 'following', value: loggedUser?.following?.length },
  ];

  const navigation = useNavigation();
  const openDeviceMedia = () => {
    navigation.navigate('contentmodal');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={openDeviceMedia}>
          <Avatar.Image
            size={70}
            source={{ uri: loggedUser?.proImgLink }}
            onProgress={() => {}}
          />
          <IconButton
            icon='plus-circle'
            containerColor='#fff'
            iconColor='#3797EF'
            size={24}
            style={{
              position: 'absolute',
              top: 27,
              left: 30,
            }}
          />
        </TouchableOpacity>

        <Text style={{ fontWeight: '800', fontSize: 16 }}>
          {loggedUser?.username}
        </Text>

        <Text style={{ fontSize: 12, color: '#333' }}>{loggedUser?.bio}</Text>
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

export default ProfileInfo;

const styles = StyleSheet.create({});
