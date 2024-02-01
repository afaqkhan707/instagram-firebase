import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

const StatusUser = ({ imageURl, name }) => (
  <>
    <TouchableOpacity style={styles.imagesContainer}>
      <Avatar.Image size={80} source={{ uri: imageURl }} />
      {/* <Text style={{ color: 'black', backgroundColor: 'blue' }}>{name}</Text> */}
    </TouchableOpacity>
  </>
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
