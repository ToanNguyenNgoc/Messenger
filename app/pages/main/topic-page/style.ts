import {color, dimension} from '@/themes';
import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  cnt: {
    paddingHorizontal: 12,
    backgroundColor: color.white,
  },
  searchCnt: {
    height: 40,
    position: 'relative',
    marginBottom: 8,
  },
  search: {
    height: 40,
    borderColor: color.white,
    backgroundColor: color.grey[200],
    paddingLeft: 16,
  },
  searchIconLeft: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    borderWidth: 0,
    marginLeft: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 8,
    width: '100%',
  },
});

export const styleTopic = StyleSheet.create({
  cnt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarCnt: {
    width: 58,
    aspectRatio: 1 / 1,
    borderRadius: 100,
  },
  topicRight: {
    width: dimension.screenWidth - 92,
  },
});
