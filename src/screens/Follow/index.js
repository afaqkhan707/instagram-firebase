import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Appbar, Divider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import FollowersTab from './components/followers';
import FollowingTab from './components/following';
import SubscriptionTab from './components/subscriber';

const Tab = createMaterialTopTabNavigator();

const UserFollow = ({ route }) => {
  const { ProfileUser } = route.params;
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();
  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content
          title={ProfileUser?.username}
          titleStyle={{
            color: '#000000',
            fontWeight: 'bold',
            marginRight: -50,
          }}
        />
      </Appbar.Header>
      <Divider />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused, color }) => {
            let label;
            if (route.name === 'followers') {
              label = `${ProfileUser?.followers?.length} followers`;
            } else if (route.name === 'following') {
              label = `${ProfileUser?.following?.length} following`;
            } else if (route.name === 'subscriber') {
              label = 'subscription';
            }
            return (
              <Text style={{ color: color, fontWeight: 'bold', fontSize: 16 }}>
                {label}
              </Text>
            );
          },

          tabBarIndicatorStyle: { backgroundColor: 'gray' },
        })}
      >
        <Tab.Screen name='followers'>
          {() => (
            <FollowersTab
              followers={ProfileUser?.followers}
              // followerId={ProfileUser?.userId}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name='following'>
          {() => (
            <FollowingTab
              following={ProfileUser?.following}
              // followingId={ProfileUser?.userId}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name='subscriber'>{() => <SubscriptionTab />}</Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

export default UserFollow;

const styles = StyleSheet.create({});
