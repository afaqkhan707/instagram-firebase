import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBarBackIcon = ({ onPress }) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={onPress} />
  </Appbar.Header>
);

export default AppBarBackIcon;
