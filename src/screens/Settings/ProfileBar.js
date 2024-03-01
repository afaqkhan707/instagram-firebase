import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import ProfileBottomSheet from './BottomSheet';

const ProfileBar = () => {
  const loggedUser = useSelector((state) => state.auth?.currentUser);
  return (
    <>
      <StatusBar />
      <Appbar.Header
        titleStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        style={{ backgroundColor: '#fff' }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Appbar.Action
            icon='lock-outline'
            size={20}
            style={{ padding: 0, margin: 0 }}
          />
          <Appbar.Content
            icon='lock'
            title={loggedUser?.username}
            titleStyle={{
              color: '#000000',
              fontWeight: 'bold',
              marginRight: -50,
            }}
          />
          {/* <Appbar.Action icon='chevron-down' onPress={() => {}} /> */}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Appbar.Action icon='plus-box-outline' onPress={() => {}} />
          {/* <ProfileBottomSheet /> */}
          <Appbar.Action icon='menu' onPress={() => {}} />
        </View>
      </Appbar.Header>
    </>
  );
};

export default ProfileBar;
