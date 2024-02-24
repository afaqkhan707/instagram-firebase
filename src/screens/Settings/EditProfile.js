import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import EditProfileModal from './EditProfileModal';

const EditProfile = () => {
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
        onPress={() => {}}
        style={styles.editButton}
        labelStyle={{
          paddingHorizontal: 10,
          marginVertical: 7,
        }}
      >
        Share profile
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

export default EditProfile;

const styles = StyleSheet.create({
  editButton: {
    borderRadius: 8,
  },
});
{
  /* <Button
        mode='contained-tonal'
        textColor='#000'
        buttonColor={'#f3f3f3'}
        onPress={() => console.log('pressed')}
        style={styles.editButton}
        labelStyle={{
          paddingHorizontal: 10,
          marginVertical: 7,
        }}
      >
        Share profile
      </Button> */
}
