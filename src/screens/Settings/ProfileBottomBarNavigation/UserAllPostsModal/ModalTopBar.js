import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const ModalTopBar = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <>
      <StatusBar />
      <Appbar.Header
        titleStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        style={{ backgroundColor: '#fff' }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Appbar.BackAction size={20} onPress={handleBackPress} />
          <Appbar.Content
            icon='lock'
            title={'Posts'}
            titleStyle={{
              color: '#000000',
              fontWeight: 'bold',
              marginRight: -50,
            }}
          />
        </View>
      </Appbar.Header>
    </>
  );
};

export default ModalTopBar;
