/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MainPage,
  MessagePage,
  ProfilePage,
  SearchPage,
  SignInPage,
} from '@/pages';
import {navigationRef} from './navigate';
import {path} from './path-route';
import {useStores} from '@/models/store';
import {observer} from 'mobx-react-lite';
import {useFocusBackApp} from '@/hooks';
import {InteractionManager, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator<any>();

export const AppNavigator = observer(() => {
  const {authModel} = useStores();
  useFocusBackApp(() => authModel.getProfile());
  useEffect(() => {
    authModel
      .getProfile(true)
      .then(() =>
        InteractionManager.runAfterInteractions(() => SplashScreen.hide()),
      )
      .catch(() =>
        InteractionManager.runAfterInteractions(() => SplashScreen.hide()),
      );
  }, []);
  let initRoute = path.sign_in;
  if (!authModel.loading && authModel.profile) {
    initRoute = path.main;
  }
  if (authModel.loading) {
    return <View />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initRoute}>
        <Stack.Screen name={path.main} component={MainPage} />
        <Stack.Screen name={path.sign_in} component={SignInPage} />
        <Stack.Screen name={path.search} component={SearchPage} />
        <Stack.Screen name={path.message} component={MessagePage} />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name={path.profile} component={ProfilePage} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
});
