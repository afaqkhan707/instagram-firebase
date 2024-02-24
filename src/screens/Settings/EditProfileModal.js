import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, Appbar, Avatar } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import EditProfileData from './EditProfileData';
const EditProfileModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(true);
  const loggedUser = useSelector((state) => state.auth?.currentUser);
  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  function handleBack() {
    hideModal();
  }
  const navigation = useNavigation();
  const openDeviceMedia = () => {
    navigation.navigate('contentmodal');
  };

  return (
    <>
      <Button
        mode='contained-tonal'
        textColor='#000'
        buttonColor={'#f3f3f3'}
        onPress={showModal}
        style={{ borderRadius: 8 }}
        labelStyle={{
          paddingHorizontal: 10,
          marginVertical: 7,
        }}
      >
        Edit profile
      </Button>
      <Modal
        animationType='fade'
        transparent={true}
        isVisible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
        style={{ margin: 0 }}
      >
        <View
          style={{
            flex: 1,
            position: 'relative',
            top: 0,
          }}
        >
          <Appbar.Header
            statusBarHeight={0}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <Appbar.BackAction onPress={handleBack} />
            <Appbar.Content
              title='Edit Profile'
              titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
            />
            <Appbar.Action
              // icon='check-underline-circle-outline'
              icon='check-circle'
              iconColor={isEdit ? '#3797EF' : '#333'}
              onPress={() => {}}
            />
          </Appbar.Header>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              position: 'relative',
              top: 65,
              backgroundColor: '#fff',
            }}
          >
            <View
              style={{
                alignItems: 'center',
                minHeight: 140,
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <TouchableOpacity onPress={openDeviceMedia}>
                <Avatar.Image
                  size={70}
                  source={{ uri: loggedUser?.proImgLink }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#3797EF',
                  marginTop: 6,
                }}
              >
                Edit picture or avatar
              </Text>
            </View>

            <EditProfileData closeEditProfile={hideModal} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({});

export default EditProfileModal;
