import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

const OtherProfileStatus = ({ postAuthor }) => {
  const loggedUser = useSelector((state) => state.auth?.currentUser);
  const [isFollowed, setIsFollowed] = React.useState(false);
  if (loggedUser) {
    loggedUser.followers.map((follower) => {
      if (follower.userId === postAuthor.userId) {
        setIsFollowed(true);
      }
    });
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Button
        mode='contained-tonal'
        textColor={isFollowed ? '#000' : '#fff'}
        buttonColor={isFollowed ? '#f3f3f3' : '#3797EF'}
        onPress={() => setIsFollowed(!isFollowed)}
        style={styles.editButton}
        labelStyle={{
          paddingHorizontal: 10,
          marginVertical: 7,
        }}
      >
        {isFollowed ? 'Follow' : 'Following'}
      </Button>

      <Button
        mode='contained-tonal'
        textColor='#000'
        buttonColor={'#f3f3f3'}
        onPress={() => {}}
        style={styles.editButton}
        labelStyle={{
          paddingHorizontal: 10,
          marginVertical: 7,
        }}
      >
        Message
      </Button>
      <IconButton
        icon={'account-plus'}
        containerColor='#f3f3f3'
        onPress={() => {}}
        style={styles.editButton}
        size={18}
      />
    </View>
  );
};

export default OtherProfileStatus;

const styles = StyleSheet.create({
  editButton: {
    borderRadius: 8,
  },
});
