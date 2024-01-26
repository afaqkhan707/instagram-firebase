// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
const Dashboard = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },

    {
      key: 'search',
      focusedIcon: 'magnify',
    },
    {
      key: 'plus',
      focusedIcon: 'plus-box',
      unfocusedIcon: 'plus-box-outline',
    },
    { key: 'heart', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    {
      key: 'account',
      focusedIcon: 'account-circle-outline',
    },
  ]);
  const MusicRoute = () => <Text>Music</Text>;

  const AlbumsRoute = () => <Text>Albums</Text>;

  const RecentsRoute = () => <Text>Recents</Text>;

  const NotificationsRoute = () => <Text>Notifications</Text>;
  const Heart = () => <Text>Notifications</Text>;

  const renderScene = BottomNavigation.SceneMap({
    home: MusicRoute,
    plus: AlbumsRoute,
    search: RecentsRoute,
    heart: NotificationsRoute,
    account: Heart,
  });

  // const Tab = createBottomTabNavigator();
  // return (
  // <View>
  {
    /* <Tab.Navigator> */
  }
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
  {
    /* <Tab.Screen name='Home' component={Home} /> */
  }
  {
    /* </Tab.Navigator> */
  }
  {
    /* </View> */
  }
  // );
};

export default Dashboard;

// const styles = StyleSheet.create({});
