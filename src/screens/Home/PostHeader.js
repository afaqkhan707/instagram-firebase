import { deleteDoc, doc } from 'firebase/firestore';
import * as React from 'react';
import { View, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { Avatar, IconButton, Text } from 'react-native-paper';
import { firestoreDb } from '../../firebase/firebaseConf';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Menu, Divider } from 'react-native-paper';
import PostBottomSheet from './PostBottomSheet';
import { useNavigation } from '@react-navigation/native';

const PostHeader = ({ PostBy, postData }) => {
  const deletePost = async () => {
    await deleteDoc(doc(firestoreDb, 'posts', postId));
    console.log('deleted');
  };
  const navigation = useNavigation();
  const handelUserInfo = () => {
    console.log('clicked');
    navigation.navigate('dashboard', {
      screen: 'Profile',
      params: { userId: PostBy?.userId },
    });
  };
  // console.log('PostBy', PostBy?.userId);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <TouchableOpacity onPress={handelUserInfo}>
      <View
        style={{
          maxHeight: 54,
          paddingLeft: 20,
          borderBottomWidth: 1,
          borderColor: '#0000001a',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '150%',
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={handelUserInfo}
        >
          <Avatar.Image size={44} source={{ uri: PostBy?.proImgLink }} />
          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{ color: '#000000', fontWeight: '700', lineHeight: 20 }}
            >
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
        <PostBottomSheet postId={postData.id} />
      </View>
    </TouchableOpacity>
  );
};

export default PostHeader;
