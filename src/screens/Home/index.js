import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeAppBar from '../../components/HomeAppBar';
import { Icon, IconButton } from 'react-native-paper';
import SvgLogos from '../../components/Svgs';
import StatusBar from './StatusBar';

const HomeTab = () => {
  return (
    <>
      <HomeAppBar />
      <StatusBar/>
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
