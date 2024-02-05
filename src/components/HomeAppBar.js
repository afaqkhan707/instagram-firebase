import * as React from 'react';
import { Appbar, TextInput } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import SvgLogos from './Svgs';
import MsgSvg from './Svgs/MsgSvg';
import IgnSvg from './Svgs/IgnSvg';
import InstaSvg from './Svgs/LogoInsta';
import CameraOpen from './CameraAccess';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
// import { uploadContent } from '../redux/services/firebaseActions';
import { addedNewPost } from '../redux/slices/postSlice';
const HomeAppBar = () => {
  // const navigation = useNavigation();
  // const openCamera = () => navigation.navigate('camera');

  const dispatch = useDispatch();
  const _handleSearch = () => console.log('Went Backss');
  const _handleMore = () => console.log('Shown more');
  const [postContent, setImage] = React.useState(null);

  const cameraImage = async () => {
    const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
    if (cameraPermission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
      });
      console.log(result);
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  if (postContent) dispatch(addedNewPost(postContent));

  const pickImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Appbar.Header
      mode='center-aligned'
      style={{
        height: 44,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Appbar.Action icon={SvgLogos} onPress={cameraImage} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../assets/Instagram Logo.png')}
          style={{
            width: 105,
            height: 28,
          }}
        />
      </View>
      <Appbar.Action icon={IgnSvg} />
      <Appbar.Action
        icon={() => <Feather name='send' size={24} color='black' />}
        onPress={_handleMore}
      />
    </Appbar.Header>
  );
};

export default HomeAppBar;
const styles = StyleSheet.create({});
