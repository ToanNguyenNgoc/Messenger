/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {AppNavigator} from '@/navigator/AppNavigator';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {color} from '@/themes';
import {RootStoreContext, rootStore} from '@/models/store';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@/services';

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: color.primary,
    primaryContainer: color.primary,
  },
};

function App(): JSX.Element {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </QueryClientProvider>
    </RootStoreContext.Provider>
  );
}

export default App;
