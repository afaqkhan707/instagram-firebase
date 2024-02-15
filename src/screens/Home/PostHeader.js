import * as React from 'react';
import { View } from 'react-native';
import { Avatar, IconButton, Text } from 'react-native-paper';

const PostHeader = ({ PostBy, postLocation }) => {
  const url =
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <View
      style={{
        maxHeight: 54,
        paddingLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#0000001a',
        flex: 1,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar.Image size={44} source={{ uri: PostBy?.proImgLink }} />
        <View style={{ paddingLeft: 10 }}>
          <Text style={{ color: '#262626' }}>{PostBy?.username}</Text>
          <Text style={{ color: '#262626' }}>{postLocation.address}</Text>
        </View>
      </View>
      <IconButton
        icon='dots-vertical'
        iconColor='#262626'
        onPress={() => console.log('dots')}
      />
    </View>
  );
};

export default PostHeader;
