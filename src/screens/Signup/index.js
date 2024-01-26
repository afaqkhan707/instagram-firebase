import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppBarBackIcon from '../../components/BackBtnIcon';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const navigateToLogin = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <AppBarBackIcon onPress={navigateToLogin} />
      <Image  src=''/>
      <Text>Signup</Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
