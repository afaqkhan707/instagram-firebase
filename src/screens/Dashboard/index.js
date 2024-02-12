import * as React from 'react';
import { BottomNavigation, Text, StatusBar } from 'react-native-paper';
import SerachTab from '../Search';
import HomeTab from '../Home';
import AddTab from '../Add';
import Setting from '../Settings';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/services/firebaseActions';
const Dashboard = () => {
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();

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
  const HomeRoute = () => <HomeTab />;
  const SearchRoute = () => <SerachTab />;
  const AddRoute = () => <AddTab />;
  const NotificationsRoute = () => <Text>Notifications</Text>;
  const Heart = () => <Setting />;

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    plus: AddRoute,
    heart: NotificationsRoute,
    account: Heart,
  });
  React.useEffect(() => {
    dispatch(getAllUsers());
  }, []);

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
