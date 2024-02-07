    import * as React from 'react';
    import * as ImagePicker from 'expo-image-picker';
    import { Appbar,  } from 'react-native-paper';
    import { Image, StyleSheet, View } from 'react-native';
    import SvgLogos from './Svgs';
    import IgnSvg from './Svgs/IgnSvg';
    import { Feather } from '@expo/vector-icons';
    import { useNavigation } from '@react-navigation/native';
    import { useDispatch } from 'react-redux';
    import { addedNewPost } from '../redux/slices/postSlice';
    import CameraModal from './CameraModal';
    import { launchCamera } from '../utils/launchCamera';

    const HomeAppBar = ({ setContentData,setModalVisible }) => {
const naviagtion = useNavigation();

      const cameraLaunched = async () => {
        setModalVisible(true)
        const respContent = await launchCamera();
      setContentData(respContent);
      };

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
          <Appbar.Action icon={SvgLogos} onPress={cameraLaunched} />
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
          />
        </Appbar.Header>
      );
    };

    export default HomeAppBar;
    const styles = StyleSheet.create({});
