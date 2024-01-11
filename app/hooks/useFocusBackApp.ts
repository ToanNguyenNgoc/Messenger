/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useRef} from 'react';
import {AppState} from 'react-native';

export const useFocusBackApp = (callback: Function) => {
  const appStateRef = useRef(AppState.currentState);
  const handleAppStateChange = useCallback((nextAppState: any) => {
    if (
      appStateRef.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      callback();
    }
    appStateRef.current = nextAppState;
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
};
