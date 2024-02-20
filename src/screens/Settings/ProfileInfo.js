import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Avatar, Button, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import UserPostData from './UserPostData';
import { useNavigation } from '@react-navigation/native';

const ProfileInfo = () => {
  const loggedUser = useSelector((state) => state.auth.currentUser);
  const userPostData = [
    { id: 1, title: 'posts', value: 1 },
    { id: 2, title: 'followers', value: 14 },
    { id: 3, title: 'following', value: 8 },
  ];
  const navigation = useNavigation();
  const openDeviceMedia = () => {
    navigation.navigate('contentmodal');
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
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

        <Text style={{ fontSize: 12, color: '#333' }}>Its All Locked...</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
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
