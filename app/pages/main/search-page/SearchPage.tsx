/* eslint-disable react-native/no-inline-styles */
import {ButtonIcon, Header, Label} from '@/components';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {style} from './style';
import {Svg} from '@/assets';
import {navigate} from '@/navigator';
import {color} from '@/themes';

export const SearchPage = observer(() => {
  return (
    <>
      <Header>
        <View style={{paddingHorizontal: 12}}>
          <View style={style.searchCnt}>
            <ButtonIcon
              style={style.searchIconLeft}
              icon={<Svg.SearchRegularGrey width={18} height={18} />}
            />
            <TextInput
              style={style.search}
              placeholder="Tìm kiếm"
              mode="outlined"
            />
            <Label
              text={'Hủy'}
              style={{lineHeight: 40, width: 32}}
              preset="s14"
              onPress={() => navigate.goBack()}
              color={color.primary}
            />
          </View>
        </View>
      </Header>
    </>
  );
});
