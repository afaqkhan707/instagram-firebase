import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SearchBar from '../../components/SearchBar';
import AppBarBackIcon from '../../components/BackBtnIcon';

const SerachTab = () => {
  return (
    <>
      <View style={styles.SearchHead}>
        <SearchBar />
      </View>
      <View style={styles.container}>
        <Text>SerachTab</Text>
      </View>
    </>
  );
};

export default SerachTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  SearchHead: {},
});
