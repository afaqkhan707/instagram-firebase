import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons
import DisplayContact from './DisplayContact';
import DisplayImages from './DisplayImages';

const renderScene = SceneMap({
  1: DisplayImages,
  2: DisplayContact,
});

export default function ProfileBottomBarNavigation() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: '1', icon: 'grid-on' },
    { key: '2', icon: 'perm-contact-cal' },
  ]);

  const renderIcon = ({ route, focused }) => (
    <MaterialIcons
      name={route.icon}
      size={24}
      color={focused ? '#000' : 'grey'}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      style={{ backgroundColor: '#fff' }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          pressColor='#ee2a7b'
          renderIcon={renderIcon}
          style={{ backgroundColor: '#fff' }}
          indicatorStyle={{ backgroundColor: 'grey' }}
        />
      )}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
