import { Alert, Share, StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import EditProfileModal from './EditProfileModal';
import { useSelector } from 'react-redux';

const EditProfile = (props) => {
  const loggedUser = useSelector((state) => state.auth?.currentUser);
  const onShare = async () => {
    try {
      const message = `Name : ${loggedUser.username}\nEmail : ${loggedUser.email}`;
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <EditProfileModal />
      <Button
        mode='contained-tonal'
        textColor='#000'
        buttonColor={'#f3f3f3'}
        onPress={onShare}
        style={styles.editButton}
        labelStyle={{
          paddingHorizontal: 10,
          marginVertical: 7,
        }}
      >
        Share profile
      </Button>
      <IconButton
        icon={props.showUser ? 'account-plus-outline' : 'account-plus'}
        iconColor={'#000'}
        containerColor='#f3f3f3'
        onPress={() => props.setShowUser(!props.showUser)}
        style={styles.editButton}
        size={18}
      />
    </View>
  );
};
export default EditProfile;
const styles = StyleSheet.create({
  editButton: {
    borderRadius: 8,
  },
});
