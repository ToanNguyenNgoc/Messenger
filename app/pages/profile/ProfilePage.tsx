/* eslint-disable react-native/no-inline-styles */
import {Svg} from '@/assets';
import {ButtonIcon, Header} from '@/components';
import {useStores} from '@/models/store';
import {navigate} from '@/navigator';
import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {Platform, ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const ProfilePage: FC = observer(() => {
  const {authModel} = useStores();
  const insets = useSafeAreaInsets();
  return (
    <>
      <Header
        title="Cài đặt"
        styleCnt={{paddingTop: Platform.OS === 'ios' ? 0 : insets.top - 8}}
        leftComponent={
          Platform.OS === 'android' ? (
            <ButtonIcon
              onPress={() => navigate.goBack()}
              icon={<Svg.PriAngleLeft width={16} />}
              size={32}
            />
          ) : (
            <View style={{width: 32}} />
          )
        }
      />
      <ScrollView>
        <Button
          onPress={() => {
            navigate.goBack();
            authModel.logout();
          }}
          mode="contained">
          Đăng xuất
        </Button>
      </ScrollView>
    </>
  );
});
