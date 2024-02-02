import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

const StatusUser = ({ imageURl, name, size, url }) => (
  <View
    style={{
      alignItems: 'center',
    }}
  >
    <TouchableOpacity style={styles.imagesContainer}>
      <Avatar.Image size={size} source={{ uri: imageURl }} />
    </TouchableOpacity>
    <Text style={{ color: '#262626' }}>{name}</Text>
  </View>
);
export default StatusUser;
const styles = StyleSheet.create({
  imagesContainer: {
    padding: 3,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#EE2A7B',
  },
});
