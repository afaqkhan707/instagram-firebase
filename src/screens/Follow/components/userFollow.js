import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Avatar, Button, Divider } from 'react-native-paper';

const UserFollow = ({ user, onPress, isFollowing }) => {
  return (
    <>
      <View
        style={{
          minHeight: 60,
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 8,
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Avatar.Image
          source={{
            uri: user?.proImgLink,
          }}
          size={50}
        />
        <View style={{ paddingLeft: 20, flex: 1 }}>
          <Text style={{ fontWeight: 800 }}>{user?.username}</Text>
          <Text style={{ color: 'gray', fontSize: 15 }}>
            {user?.displayName}
          </Text>
        </View>
        <Button
          mode='contained-tonal'
          textColor={isFollowing ? '#000' : '#fff'}
          buttonColor={isFollowing ? '#f3f3f3' : '#3797EF'}
          // onPress={onPress}
          style={styles.editButton}
          labelStyle={{
            paddingHorizontal: 10,
            marginVertical: 7,
          }}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </View>
      <Divider />
    </>
  );
};

export default UserFollow;

const styles = StyleSheet.create({});
