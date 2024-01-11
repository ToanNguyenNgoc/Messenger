/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {TopicPage} from '../topic-page/TopicPage';
import {path} from '@/navigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {color} from '@/themes';
import {Svg} from '@/assets';
import {PhoneBookPage} from '../phone-book-page/PhoneBookPage';
import {CallPage} from '../call-page/CallPage';

const Tab = createBottomTabNavigator();

export const HomePage = () => {
  return (
    <Tab.Navigator
      initialRouteName={path.topic}
      screenOptions={{
        tabBarStyle: {
          borderTopColor: color.bluegrey[100],
        },
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.bluegrey[700],
      }}>
      <Tab.Group screenOptions={{headerShown: false}}>
        <Tab.Screen
          name={path.topic}
          component={TopicPage}
          options={{
            tabBarLabel: 'Đoạn chat',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Svg.PriComment width={20} />
              ) : (
                <Svg.CommentGrey width={20} />
              ),
          }}
        />
        <Tab.Screen
          name={path.call}
          component={CallPage}
          options={{
            tabBarLabel: 'Cuộc gọi',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Svg.PriCall width={20} />
              ) : (
                <Svg.CallGrey width={20} />
              ),
          }}
        />
        <Tab.Screen
          name={path.phone_book}
          component={PhoneBookPage}
          options={{
            tabBarLabel: 'Danh bạ',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Svg.PriUserTime width={20} />
              ) : (
                <Svg.UserTimeGrey width={20} />
              ),
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
