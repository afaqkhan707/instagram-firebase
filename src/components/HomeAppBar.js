import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import SvgLogos from './Svgs';
import MsgSvg from './Svgs/MsgSvg';
import IgnSvg from './Svgs/IgnSvg';
import InstaSvg from './Svgs/LogoInsta';
const HomeAppBar = () => {
  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header mode='center-aligned' style={{ height: 40, width: '100%' }}>
      <Appbar.Action icon={SvgLogos} onPress={_goBack} />
      <View
        style={{
          flex: 1,
          width: 105,
          height: 28,
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
      <Appbar.Action icon={IgnSvg} onPress={_handleSearch} />
      <Appbar.Action icon={MsgSvg} onPress={_handleMore} size={16} width={32} />
    </Appbar.Header>
  );
};

export default HomeAppBar;
const styles = StyleSheet.create({});
