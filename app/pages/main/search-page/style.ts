import {color, dimension} from '@/themes';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  searchCnt: {
    height: 40,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  search: {
    height: 40,
    borderColor: color.white,
    backgroundColor: color.grey[200],
    paddingLeft: 16,
    width: dimension.screenWidth - 68,
  },
  searchIconLeft: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    borderWidth: 0,
    marginLeft: 2,
  },
});
