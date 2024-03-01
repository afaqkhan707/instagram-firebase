import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

const UserPostData = (props) => {
  return (
    <Pressable
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 4,
        flex: 1,
        minHeight: 80,
        minWidth: 50,
      }}
      onPress={props.onPress}
      android_ripple={{ color: '#d3d3d3' }}
    >
      <Text style={{ fontWeight: 900, fontSize: 16 }}>{props.value}</Text>
      <Text>{props.title}</Text>
    </Pressable>
  );
};

export default UserPostData;

const styles = StyleSheet.create({});
