// import React from 'react';
// import { useWindowDimensions } from 'react-native';
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import { MaterialIcons } from '@expo/vector-icons';
// import DisplayContact from './DisplayContact';
// import DisplayImages from './DisplayImages';

// const renderScene = SceneMap({
//   1: DisplayImages,
//   2: DisplayContact,
// });

// export default function ProfileBottomBarNavigation() {
//   const layout = useWindowDimensions();

//   const [index, setIndex] = React.useState(0);

//   const [routes] = React.useState([
//     { key: '1', icon: 'grid-on' },
//     { key: '2', icon: 'perm-contact-cal' },
//   ]);

//   const renderIcon = ({ route, focused }) => (
//     <MaterialIcons
//       name={route.icon}
//       size={24}
//       color={focused ? '#000' : 'grey'}
//     />
//   );

//   return (
//     <TabView
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       style={{ backgroundColor: '#fff' }}
//       renderTabBar={(props) => (
//         <TabBar
//           {...props}
//           // pressColor='#ee2a7b'
//           renderIcon={renderIcon}
//           style={{ backgroundColor: '#fff' }}
//           indicatorStyle={{ backgroundColor: 'grey' }}
//         />
//       )}
//       onIndexChange={setIndex}
//       initialLayout={{ width: layout.width }}
//     />
//   );
// }

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import OtherDisplayContact from './OtherDisplayContact';
import OtherDisplayImages from './OtherDisplayImages';

const Tab = createMaterialTopTabNavigator();

export default function OtherProfileBottomBarNavigation({ postImages }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name='OtherDisplayImages'
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? 'grid-on' : 'grid-off'}
              size={24}
              color={focused ? '#000' : 'gray'}
            />
          ),
        }}
      >
        {() => <OtherDisplayImages Images={postImages} />}
      </Tab.Screen>
      <Tab.Screen
        name='OtherDisplayContact'
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? 'perm-contact-cal' : 'perm-contact-cal'}
              size={24}
              color={focused ? '#000' : 'grey'}
            />
          ),
        }}
      >
        {() => <OtherDisplayContact />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
