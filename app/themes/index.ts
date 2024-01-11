import {Dimensions} from 'react-native';

export * from './color';
const DESIGN_WIDTH = 375;
export const dimension = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  fontScale: Dimensions.get('window').fontScale,
};
export const scale = (size: number) => {
  return (dimension.screenWidth / DESIGN_WIDTH) * size;
};

export const scaleFontSize = (size: number, factor = 0.8) => {
  return size + (scale(size) - size) * factor;
};
export const styleGlobal: any = {
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
};
