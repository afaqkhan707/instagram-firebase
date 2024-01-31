import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AddTab = () => {
  return (
    <View style={styles.container}>
      <Text>AddTab</Text>
    </View>
  );
};

export default AddTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
});
