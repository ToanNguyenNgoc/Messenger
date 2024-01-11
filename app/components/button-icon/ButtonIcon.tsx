import {color} from '@/themes';
import React, {FC, ReactNode} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonIconProps extends TouchableOpacityProps {
  icon?: ReactNode;
  mode?: 'contained' | 'outlined' | 'text';
  bgColor?: string;
  size?: number;
}

export const ButtonIcon: FC<ButtonIconProps> = props => {
  const {mode = 'text', size = 32, bgColor = color.white} = props;
  const createStyleProps = () => {
    let styleProps = {
      borderColor: color.white,
      borderWidth: 1,
      width: size - 2,
    } as any;
    if (mode === 'outlined') {
      styleProps = {
        borderColor: bgColor,
        borderWidth: 1,
        width: size - 2,
      };
    }
    if (mode === 'contained') {
      styleProps = {
        borderColor: bgColor,
        borderWidth: 1,
        backgroundColor: bgColor,
        width: size - 2,
      };
    }
    return styleProps;
  };
  return (
    <TouchableOpacity
      {...props}
      style={[style.cnt, createStyleProps(), props.style]}>
      {props.icon}
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  cnt: {
    aspectRatio: 1 / 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
