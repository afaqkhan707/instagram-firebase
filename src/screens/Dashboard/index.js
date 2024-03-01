// import * as React from 'react';
// import { BottomNavigation, Text, Avatar } from 'react-native-paper';
// import SerachTab from '../Search';
// import HomeTab from '../Home';
// import AddTab from '../Add';
// import { useDispatch, useSelector } from 'react-redux';
// import ProfileScreen from '../Settings';
// const Dashboard = () => {
//   const [index, setIndex] = React.useState(0);
//   const dispatch = useDispatch();
//   const loggedUser = useSelector((state) => state.auth.currentUser);
//   const [routes] = React.useState([
//     {
//       key: 'home',
//       focusedIcon: 'home',
//       unfocusedIcon: 'home-outline',
//     },

//     {
//       key: 'search',
//       focusedIcon: 'magnify',
//     },
//     {
//       key: 'plus',
//       focusedIcon: 'plus-box',
//       unfocusedIcon: 'plus-box-outline',
//     },
//     { key: 'heart', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
//     {
//       key: 'profile',
//       focusedIcon: () => (
//         <View
//           style={{
//             padding: 0.5,
//             borderRadius: 50,
//             borderWidth: 1,
//             borderColor: '#EE2A7B',
//           }}
//         >
//           <Avatar.Image source={{ uri: loggedUser?.proImgLink }} size={25} />
//         </View>
//       ),
//       focusedIcon: () => (
//         <Avatar.Image source={{ uri: loggedUser?.proImgLink }} size={25} />
//       ),
//       unfocusedIcon: () => (
//         <Avatar.Image source={{ uri: loggedUser?.proImgLink }} size={25} />
//       ),
//     },
//   ]);
//   const HomeRoute = () => <HomeTab />;
//   const SearchRoute = () => <SerachTab />;
//   const AddRoute = () => <AddTab />;
//   const NotificationsRoute = () => <Text>Notifications</Text>;
//   const ProfileRoute = () => <ProfileScreen />;

//   const renderScene = BottomNavigation.SceneMap({
//     home: HomeRoute,
//     search: SearchRoute,
//     plus: AddRoute,
//     heart: NotificationsRoute,
//     profile: ProfileRoute,
//   });

//   return (
//     <>
//       <BottomNavigation
//         navigationState={{ index, routes }}
//         onIndexChange={setIndex}
//         renderScene={renderScene}
//         labeled={true}
//         activeColor='#ee2a7b'
//         barStyle={{
//           backgroundColor: '#fff',
//           height: 40,
//           justifyContent: 'center',
//         }}
//       />
//     </>
//   );
// };

// export default Dashboard;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SerachTab from '../Search';
import HomeTab from '../Home';
import AddTab from '../Add';
import ProfileScreen from '../Settings';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, focused }) => ({
        tabBarLabelStyle: { color: focused ? '#ee2a7b' : 'gray' },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            color = focused ? '#ee2a7b' : 'gray';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
            color = focused ? '#ee2a7b' : 'gray';
          } else if (route.name === 'Add') {
            iconName = focused ? 'add' : 'add-outline';
            color = focused ? '#ee2a7b' : 'gray';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            color = focused ? '#ee2a7b' : 'gray';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name='Home' component={HomeTab} />
      <Tab.Screen name='Search' component={SerachTab} />
      <Tab.Screen name='Add' component={AddTab} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Dashboard;

// const loggedUser = useSelector((state) => state.auth.currentUser);

{
  /* <Tab.Screen
        name='Profile'
        // component={ProfileScreen}
        // initialParams={{ userId: loggedUser?.userId }}
      >
        {() => <ProfileScreen active={loggedUser?.userId} />}
      </Tab.Screen> */
}
