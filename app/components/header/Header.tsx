/* eslint-disable react-native/no-inline-styles */
import {color} from '@/themes';
import React, {FC, ReactNode, memo} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Label} from '../label/Labe';
import {HeaderBackButton} from './components';
import {StyleProps} from 'react-native-reanimated';

interface HeaderProps {
  backgroundColor?: string;
  children?: ReactNode;
  title?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  backShow?: boolean;
  styleCnt?: StyleProps;
}

export const Header: FC<HeaderProps> = memo(
  ({
    backgroundColor = color.white,
    children,
    title = '',
    leftComponent = <View style={{width: 32}} />,
    rightComponent = <View style={{width: 32}} />,
    backShow,
    styleCnt,
  }: HeaderProps) => {
    const insets = useSafeAreaInsets();
    return (
      <View
        style={[
          style.cnt,
          {paddingTop: insets.top - 8, backgroundColor},
          styleCnt,
        ]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        {children || (
          <View style={style.headerBody}>
            {backShow ? <HeaderBackButton /> : leftComponent}
            <Label text={title} preset="s16" />
            {rightComponent}
          </View>
        )}
      </View>
    );
  },
);

const style = StyleSheet.create({
  cnt: {},
  headerBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
