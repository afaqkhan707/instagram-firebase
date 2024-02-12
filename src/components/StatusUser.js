import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Avatar, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

const StatusUser = ({ userImage, userName, size, onPress, isLoading }) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      {isLoading && (
        <ActivityIndicator
          color='#EE2A7B'
          size={60}
          style={{
            position: 'absolute',
            top: 10,
            zIndex: 1,
          }}
        />
      )}
      <TouchableOpacity style={styles.imagesContainer} onPress={onPress}>
        <Avatar.Image size={size} source={{ uri: userImage }} />
      </TouchableOpacity>
      <Text style={{ color: '#262626' }}>{userName}</Text>
    </View>
  );
};
export default StatusUser;
const styles = StyleSheet.create({
  imagesContainer: {
    padding: 3,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#EE2A7B',
  },
});
