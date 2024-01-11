import React, {FC} from 'react';
import {style} from './style';
import {TouchableOpacity} from 'react-native';
import {Svg} from '@/assets';
import {navigate} from '@/navigator';

export const HeaderBackButton: FC = () => {
  return (
    <TouchableOpacity onPress={() => navigate.goBack()} style={style.cnt}>
      <Svg.PriAngleLeft width={18} />
    </TouchableOpacity>
  );
};
