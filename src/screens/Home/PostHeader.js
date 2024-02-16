import { deleteDoc, doc } from 'firebase/firestore';
import * as React from 'react';
import { View } from 'react-native';
import { Avatar, IconButton, Text } from 'react-native-paper';
import { firestoreDb } from '../../firebase/firebaseConf';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Menu, Divider } from 'react-native-paper';

const PostHeader = ({ PostBy, postData }) => {
  const deletePost = async () => {
    await deleteDoc(doc(firestoreDb, 'posts', postId));
    console.log('deleted');
  };

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
          <Text style={{ color: '#000000', fontWeight: '700', lineHeight: 20 }}>
            {PostBy?.username}
          </Text>
          <Text
            style={{
              // color: '#262626',
              color: 'grey',
              fontWeight: '300',
              lineHeight: 20,
              fontSize: 12,
            }}
          >
            {postData.address}
          </Text>
        </View>
      </View>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={{
          backgroundColor: '#fff',
          padding: 0,
          top: 88,
          right: -7,
        }}
        statusBarHeight={0}
        anchor={
          <IconButton
            icon='dots-vertical'
            iconColor='#262626'
            onPress={openMenu}
          />
        }
      >
        <Menu.Item icon='delete-outline' onPress={() => {}} title='Delete' />
        <Divider />
        <Menu.Item
          title='Edit Post'
          icon='pencil'
          statusBarHeight={10}
          onPress={() => {}}
        />
      </Menu>
    </View>
  );
};

export default PostHeader;
