import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomInputField from '../../components/CustomInputField';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { firestoreDb } from '../../firebase/firebaseConf';
import { Divider, RadioButton } from 'react-native-paper';
import { List, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const EditProfileData = (props) => {
  const loggedUser = useSelector((state) => state.auth?.currentUser);
  const [updateUser, setUpdateUser] = useState({
    displayName: loggedUser?.displayName,
    username: loggedUser?.username,
    email: loggedUser?.email,
    bio: loggedUser?.bio,
    gender: loggedUser?.gender,
  });
  const navigation = useNavigation();
  const handleEdits = async () => {
    const userDocRef = doc(firestoreDb, 'users', loggedUser?.userId);
    await updateDoc(userDocRef, updateUser);
    props.closeEditProfile();
  };

  const [selectedGender, setSelectedGender] = useState(loggedUser?.gender);

  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <>
      <CustomInputField
        label='Name'
        value={updateUser.displayName}
        onChangeText={(text) =>
          setUpdateUser({ ...updateUser, displayName: text })
        }
      />
      <CustomInputField
        label='Username'
        value={updateUser.username}
        onChangeText={(text) =>
          setUpdateUser({ ...updateUser, username: text })
        }
      />
      <CustomInputField
        label='Email'
        value={updateUser.email}
        onChangeText={(text) => setUpdateUser({ ...updateUser, email: text })}
      />
      <CustomInputField
        label='Bio'
        value={updateUser.bio || ''}
        placeholder='Tell us about yourself...'
        onChangeText={(text) => setUpdateUser({ ...updateUser, bio: text })}
      />
      <View style={{ width: '100%' }}>
        <List.Accordion
          title='Gender'
          titleStyle={{ color: '#000', backgroundColor: '#fff' }}
          expanded={expanded}
          onPress={handlePress}
          style={{ backgroundColor: '#fff', color: '#fff' }}
        >
          <RadioButton.Group
            onValueChange={(newValue) => setSelectedGender(newValue)}
            value={selectedGender}
          >
            <Divider />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <RadioButton value='male' color='#3797EF' />
                <Text>Male</Text>
              </View>
              <Divider />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <RadioButton value='female' color='#3797EF' />
                <Text>Female</Text>
              </View>
              <Divider />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <RadioButton value='prefer_not_to_say' color='#3797EF' />
                <Text>Prefer not to Say</Text>
              </View>
            </View>
          </RadioButton.Group>
          <Divider />
        </List.Accordion>
        <Divider />
      </View>
      <Button
        title='Save Changes'
        onPress={handleEdits}
        mode='eleveted-tonal'
        textColor='#3797EF'
        style={{ borderRadius: 8, marginTop: 10, width: '100%' }}
      >
        Update Changes
      </Button>
    </>
  );
};

export default EditProfileData;

const styles = StyleSheet.create({});
