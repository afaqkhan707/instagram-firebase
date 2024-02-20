import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, IconButton, Text } from 'react-native-paper';

const ProfileCard = (props) => {
  return (
    <View style={{ width: 180 }}>
      <Card
        style={{
          height: 240,
          borderRadius: 10,
          paddingVertical: 8,
          paddingHorizontal: 5,
          backgroundColor: '#ededed',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <IconButton
          icon='close'
          size={24}
          onPress={() => {}}
          style={{
            position: 'absolute',
            top: -9,
            right: -20,
          }}
        />
        <View
          style={{
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 36,
          }}
        >
          <Avatar.Image source={{ uri: props.image }} size={100} />
          <Text style={{ marginBottom: 0, marginTop: 10 }}>
            {props.profileName}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            width: '100%',
            flex: 1,
          }}
        >
          <Button
            mode='elevated'
            buttonColor={props.isFollowing ? '#e0e0e0' : '#3797EF'}
            textColor={props.isFollowing ? '#000' : '#fff'}
            onPress={props.onPressFollow}
            labelStyle={{ marginVertical: 8, marginHorizontal: 40 }}
            style={{
              alignItems: 'center',
            }}
          >
            {props.isFollowing ? 'Following' : 'Follow'}
          </Button>
        </View>
      </Card>
    </View>
  );
};

export default ProfileCard;
