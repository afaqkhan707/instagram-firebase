import * as React from 'react';
import { BottomNavigation, Text, StatusBar, Avatar } from 'react-native-paper';
import SerachTab from '../Search';
import HomeTab from '../Home';
import AddTab from '../Add';
import Setting from '../Settings';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/services/firebaseActions';
import { View } from 'react-native';
const Dashboard = () => {
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth.currentUser);
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
      key: 'profile',
      // focusedIcon: () => (
      //   <View
      //     style={{
      //       padding: 0.5,
      //       borderRadius: 50,
      //       borderWidth: 1,
      //       borderColor: '#EE2A7B',
      //     }}
      //   >
      //     <Avatar.Image source={{ uri: loggedUser?.proImgLink }} size={25} />
      //   </View>
      // ),
      focusedIcon: () => (
        <Avatar.Image source={{ uri: loggedUser?.proImgLink }} size={25} />
      ),
      unfocusedIcon: () => (
        <Avatar.Image source={{ uri: loggedUser?.proImgLink }} size={25} />
      ),
    },
  ]);
  const HomeRoute = () => <HomeTab />;
  const SearchRoute = () => <SerachTab />;
  const AddRoute = () => <AddTab />;
  const NotificationsRoute = () => <Text>Notifications</Text>;
  const ProfileRoute = () => <Setting />;

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    plus: AddRoute,
    heart: NotificationsRoute,
    profile: ProfileRoute,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        labeled={true}
        activeColor='#ee2a7b'
        barStyle={{
          backgroundColor: '#fff',
          height: 40,
          justifyContent: 'center',
        }}
      />
    </>
  );
};

export default Dashboard;

// const styles = StyleSheet.create({});
