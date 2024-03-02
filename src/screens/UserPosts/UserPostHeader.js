import { deleteDoc, doc } from 'firebase/firestore';
import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
// import { firestoreDb } from '../../firebase/firebaseConf';
import { Divider } from 'react-native-paper';
// import PostBottomSheet from './PostBottomSheet';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import PostBottomSheet from '../Home/PostBottomSheet';

const UserPostHeader = ({ PostBy, postLocation }) => {
  const deletePost = async () => {
    await deleteDoc(doc(firestoreDb, 'posts', postId));
    console.log('deleted');
  };
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <>
      <Divider />
      <View
        style={{
          minHeight: 54,
          maxHeight: 54,
          paddingLeft: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
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
                color: 'grey',
                fontWeight: '300',
                lineHeight: 20,
                fontSize: 12,
              }}
            >
              {postLocation}
            </Text>
          </View>
        </View>
        <View>
          <PostBottomSheet postId={PostBy} />
        </View>
      </View>
      <Divider />
    </>
  );
};

export default UserPostHeader;
