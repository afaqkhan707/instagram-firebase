import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import MyStack from './src/routes';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <MyStack />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
