import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

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
      android_ripple={{ color: '#d3d3d3' }}
      onPress={props.onPress}
    >
      <Text style={{ fontWeight: 900, fontSize: 16 }}>{props.value}</Text>
      <Text>{props.title}</Text>
    </Pressable>
  );
};

export default UserPostData;

const styles = StyleSheet.create({});
