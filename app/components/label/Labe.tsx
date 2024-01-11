import * as React from 'react';
import {Text, StyleProp, TextProperties, TextStyle} from 'react-native';
import {color} from '@/themes';
import {TextPresets, presets} from './text.preset';

export interface LabelProps extends TextProperties {
  text?: string | number | any;
  style?: StyleProp<TextStyle>;
  color?: string;
  preset?: TextPresets;
}

export function Label(props: LabelProps) {
  const {preset = 'default', text, style: styleOverride, ...rest} = props;
  const style = presets[preset] || presets.default;
  const styles = [
    style,
    styleOverride,
    {color: props.color || color.grey[900]},
  ];
  return (
    <Text {...rest} style={styles} allowFontScaling={false}>
      {text}
    </Text>
  );
}
