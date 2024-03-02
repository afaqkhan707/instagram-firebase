import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import OtherDisplayContact from './OtherDisplayContact';
import OtherDisplayImages from './OtherDisplayImages';

const Tab = createMaterialTopTabNavigator();

export default function OtherProfileBottomBarNavigation({
  postImages,
  userData,
}) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIndicatorStyle: { backgroundColor: 'transparent' },
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
        {() => <OtherDisplayImages Images={postImages} User={userData} />}
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
