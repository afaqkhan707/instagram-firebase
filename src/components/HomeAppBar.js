import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StatusBar, StyleSheet, View } from 'react-native';
import SvgLogos from './Svgs/Svgs';
import { Feather } from '@expo/vector-icons';
import { launchCamera } from '../utils/launchCamera';
import InstaSvg from './Svgs/LogoInsta';

const HomeAppBar = ({ setContentData, setModalVisible }) => {
  const cameraLaunched = async () => {
    setModalVisible(true);
    const respContent = await launchCamera();
    setContentData(respContent);
  };
  return (
    <>
      <StatusBar />
      <Appbar.Header
        mode='center-aligned'
        style={{
          height: 40,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
        statusBarHeight={8}
      >
        <Appbar.Action icon={SvgLogos} onPress={cameraLaunched} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <InstaSvg />
        </View>
        <Appbar.Action icon='heart-outline' onPress={() => {}} />
        <Appbar.Action
          icon={() => <Feather name='send' size={24} color='black' />}
          onPress={() => {}}
        />
      </Appbar.Header>
    </>
  );
};

export default HomeAppBar;
const styles = StyleSheet.create({});
{
  /* <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'pink',
          }}
        >
          <Image
            source={{ uri: InstaSvg }}
            style={{
              width: 105,
              height: 28,
            }}
          />
        </View> */
}
