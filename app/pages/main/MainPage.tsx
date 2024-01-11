/* eslint-disable react/no-unstable-nested-components */
import React, {FC} from 'react';
import {HomePage} from './home-page/HomePage';
import {path} from '@/navigator';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {DrawerHead} from '@/components';
import {color} from '@/themes';
import {Svg} from '@/assets';
import {SendMultiPage} from './send-multi-page/SendMultiPage';

const Drawer = createDrawerNavigator();

export const MainPage: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={path.home}
      screenOptions={{
        headerShown: false,
        drawerItemStyle: {borderRadius: 12},
        drawerActiveBackgroundColor: color.bluegrey[50],
        drawerInactiveBackgroundColor: color.white,
        drawerActiveTintColor: color.black,
        drawerLabelStyle: {
          marginLeft: -24,
        },
      }}
      drawerContent={props => {
        return (
          <SafeAreaView>
            <DrawerHead />
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}>
      <Drawer.Screen
        name={path.home}
        options={{
          drawerLabel: 'Đoạn chat',
          drawerIcon: () => {
            return (
              <View style={style.drawIconCnt}>
                <Svg.CommentGrey width={18} height={18} />
              </View>
            );
          },
        }}
        component={HomePage}
      />
      <Drawer.Screen
        name={path.send_multi}
        options={{
          drawerLabel: 'Gửi tin nhắn nhiều người',
          drawerIcon: () => {
            return (
              <View style={style.drawIconCnt}>
                <Svg.PaperPlanGrey width={18} height={18} />
              </View>
            );
          },
        }}
        component={SendMultiPage}
      />
    </Drawer.Navigator>
  );
};

const style = StyleSheet.create({
  drawIconCnt: {
    backgroundColor: color.bluegrey[100],
    padding: 6,
    borderRadius: 8,
  },
});
