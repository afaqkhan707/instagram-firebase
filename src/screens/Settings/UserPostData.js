import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

const UserPostData = (props) => {
  return (
    <Button
      onPress={() => {}}
      buttonColor='#fff'
      labelStyle={{
        paddingVertical: 24,
        paddingHorizontal: 2,
      }}
      rippleColor={'#d3d3d3'}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: 700, fontSize: 16 }}>{props.value}</Text>
        <Text>{props.title}</Text>
      </View>
    </Button>
  );
};

export default UserPostData;

const styles = StyleSheet.create({});
