import {color, dimension, scaleFontSize} from '@/themes';
import {TextStyle} from 'react-native';

const BASE: TextStyle = {
  color: color.grey[900],
  fontSize: scaleFontSize(14) * dimension.fontScale,
  fontWeight: '400',
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  default: BASE,

  b7: {...BASE, fontWeight: '700'} as TextStyle,

  b6: {...BASE, fontWeight: '600'} as TextStyle,

  s6: {...BASE, fontSize: scaleFontSize(6) * dimension.fontScale} as TextStyle,

  s8: {...BASE, fontSize: scaleFontSize(8) * dimension.fontScale} as TextStyle,

  s12: {
    ...BASE,
    fontSize: scaleFontSize(12) * dimension.fontScale,
  } as TextStyle,

  s10: {
    ...BASE,
    fontSize: scaleFontSize(10) * dimension.fontScale,
  } as TextStyle,

  s14: {
    ...BASE,
    fontSize: scaleFontSize(14) * dimension.fontScale,
    fontWeight: '500',
  } as TextStyle,

  s16: {
    ...BASE,
    fontSize: scaleFontSize(16) * dimension.fontScale,
    fontWeight: '500',
  } as TextStyle,

  s12_b6: {
    ...BASE,
    fontSize: scaleFontSize(12) * dimension.fontScale,
    fontWeight: '600',
  } as TextStyle,

  s10_b6: {
    ...BASE,
    fontSize: scaleFontSize(10) * dimension.fontScale,
  } as TextStyle,

  s12_b7: {
    ...BASE,
    fontSize: scaleFontSize(12) * dimension.fontScale,
    fontWeight: '700',
  } as TextStyle,

  s12_b8: {
    ...BASE,
    fontSize: scaleFontSize(12) * dimension.fontScale,
    fontWeight: '800',
  } as TextStyle,

  s14_b6: {
    ...BASE,
    fontSize: scaleFontSize(14) * dimension.fontScale,
    fontWeight: '600',
  } as TextStyle,

  s14_b7: {
    ...BASE,
    fontSize: scaleFontSize(14) * dimension.fontScale,
    fontWeight: '700',
  } as TextStyle,

  s14_b8: {
    ...BASE,
    fontSize: scaleFontSize(14) * dimension.fontScale,
    fontWeight: '800',
  } as TextStyle,

  s16_b8: {
    ...BASE,
    fontSize: scaleFontSize(16) * dimension.fontScale,
    fontWeight: '800',
  } as TextStyle,

  s16_b7: {
    ...BASE,
    fontSize: scaleFontSize(16) * dimension.fontScale,
    fontWeight: '700',
  } as TextStyle,

  s18: {
    ...BASE,
    fontSize: scaleFontSize(18) * dimension.fontScale,
    fontWeight: '500',
  } as TextStyle,

  s18_b7: {
    ...BASE,
    fontSize: scaleFontSize(18) * dimension.fontScale,
    fontWeight: '700',
  } as TextStyle,

  s18_b8: {
    ...BASE,
    fontSize: scaleFontSize(18) * dimension.fontScale,
    fontWeight: '800',
  } as TextStyle,
  s20_b6: {
    ...BASE,
    fontSize: scaleFontSize(20) * dimension.fontScale,
    fontWeight: '600',
  } as TextStyle,
  s20_b7: {
    ...BASE,
    fontSize: scaleFontSize(20) * dimension.fontScale,
    fontWeight: '700',
  } as TextStyle,

  s20_b8: {
    ...BASE,
    fontSize: scaleFontSize(20) * dimension.fontScale,
    fontWeight: '800',
  } as TextStyle,

  s24_b8: {
    ...BASE,
    fontSize: scaleFontSize(20) * dimension.fontScale,
    fontWeight: '800',
  } as TextStyle,
};
export type TextPresets = keyof typeof presets;
