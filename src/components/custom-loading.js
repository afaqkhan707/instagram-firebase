import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loading = ({ value }) => (
  <ActivityIndicator animating={true} color={MD2Colors.red800} size={value} />
);

export default Loading;
