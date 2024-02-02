import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HomeAppBar from '../../components/HomeAppBar';
import StatusBar from './StatusBar';
import Post from './Post';

const HomeTab = () => {
  return (
    <>
      <HomeAppBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        <Post />
        <Post />
        <Post />
      </ScrollView>
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
