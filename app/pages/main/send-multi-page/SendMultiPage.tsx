import {Svg} from '@/assets';
import {Header, HeaderBtn, Label} from '@/components';
import {useStores} from '@/models/store';
import {navigate} from '@/navigator';
import {color} from '@/themes';
import {observer} from 'mobx-react-lite';
import React, {FC, useEffect} from 'react';
import {Button, Text} from 'react-native';

export const SendMultiPage: FC = observer(() => {
  const {counterModel, organizationModel} = useStores();

  const handleIncrement = () => {
    counterModel.increment();
  };

  const handleDecrement = () => {
    counterModel.decrement();
  };
  useEffect(() => {
    const test = async () => {
      const data = await organizationModel.getOrganization();
      console.log(data);
    };
    test();
  }, []);
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
        title="Gửi tin nhắn nhiều người"
      />
      <Label text={'xxx'} />
      <Text>Count: {counterModel.count}</Text>
      <Button title="Increment" onPress={handleIncrement} />
      <Button title="Decrement" onPress={handleDecrement} />
    </>
  );
});
