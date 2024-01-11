import React, {FC, ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {style} from './style';
import {color} from '@/themes';

interface HeaderBtnProps extends TouchableOpacityProps {
  icon?: ReactNode;
  color?: string;
}

export const HeaderBtn: FC<HeaderBtnProps> = (props: HeaderBtnProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        style.cnt,
        props.style,
        {backgroundColor: props.color || color.primary},
      ]}>
      {props.icon}
    </TouchableOpacity>
  );
};
