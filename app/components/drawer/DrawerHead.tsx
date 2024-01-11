/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Label} from '../label/Labe';
import {color} from '@/themes';
import FastImage from 'react-native-fast-image';
import {ButtonIcon} from '../button-icon';
import {Svg} from '@/assets';
import {navigate, path} from '@/navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {observer} from 'mobx-react-lite';
import {useStores} from '@/models/store';

export const DrawerHead: FC = observer(() => {
  const insets = useSafeAreaInsets();
  const {authModel} = useStores();
  return (
    <View
      style={[
        style.cnt,
        {paddingTop: Platform.OS === 'android' ? insets.top : 0},
      ]}>
      <View style={style.cntLeft}>
        <FastImage
          style={style.avatar}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: 'https://i.imgur.com/mliFXKq.jpg',
          }}
        />
        <Label
          text={authModel.profile?.fullname}
          color={color.grey[800]}
          preset="s14"
        />
      </View>
      <ButtonIcon
        onPress={() => navigate.onNavigate(path.profile)}
        icon={<Svg.PriSettingBold width={22} />}
        mode="text"
      />
    </View>
  );
});

const style = StyleSheet.create({
  cnt: {
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cntLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 100,
    marginRight: 8,
  },
});
