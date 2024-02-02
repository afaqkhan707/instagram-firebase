import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

const StatusUser = ({ imageURl, name }) => (
  <View
    style={{
      alignItems: 'center',
    }}
  >
    <TouchableOpacity style={styles.imagesContainer}>
      <Avatar.Image size={64} source={{ uri: imageURl }} />
    </TouchableOpacity>
    <Text style={{ color: '#262626' }}>{name}_sd</Text>
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
