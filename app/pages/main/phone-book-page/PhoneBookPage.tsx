import {Svg} from '@/assets';
import {Header, HeaderBtn} from '@/components';
import {navigate} from '@/navigator';
import {color} from '@/themes';
import React, {FC} from 'react';

export const PhoneBookPage: FC = () => {
  return (
    <>
      <Header
        leftComponent={
          <HeaderBtn
            onPress={() => navigate.openDrawer()}
            color={color.white}
            icon={<Svg.PriMenu width={22} />}
          />
        }
        title="Danh bạ"
      />
    </>
  );
};
