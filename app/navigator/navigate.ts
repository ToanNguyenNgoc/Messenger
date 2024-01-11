import {
  DrawerActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef<any>();

export const navigate = {
  onNavigate: (name: string, params?: any) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  },
  goBack: () => {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  },
  replace: (name: string, params: any) => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params));
    }
  },
  openDrawer: () => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.openDrawer());
    }
  },
  closeDrawer: () => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.closeDrawer());
    }
  },
  toggleDrawer: () => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.toggleDrawer());
    }
  },
};
