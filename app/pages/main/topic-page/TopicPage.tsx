/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {Avatar, ButtonIcon, Header, HeaderBtn, Label} from '@/components';
import {FC} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Svg} from '@/assets';
import {color, styleGlobal} from '@/themes';
import {navigate, path} from '@/navigator';
import {useGetListTopic} from '@/queries';
import {style, styleTopic} from './style';
import {TextInput} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useFocusEffect} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {QR_KEY} from '@/services';
import {ResponseTopic} from '@/interfaces/response';
import {uniqueBy} from '@/utils';
import dayjs from 'dayjs';

export const TopicPage: FC = observer(() => {
  const {data} = useGetListTopic();
  const topics: ResponseTopic[] = data?.pages.map(i => i.data).flat() || [];
  const client = useQueryClient();
  useFocusEffect(() => {
    client.invalidateQueries([QR_KEY.topic]);
  });
  const renderListHeader = () => {
    return (
      <View style={style.searchCnt}>
        <ButtonIcon
          style={style.searchIconLeft}
          icon={<Svg.SearchRegularGrey width={18} height={18} />}
          onPress={() => navigate.onNavigate(path.search)}
        />
        <TextInput
          style={style.search}
          placeholder="Tìm kiếm"
          mode="outlined"
        />
      </View>
    );
  };

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
        rightComponent={
          <HeaderBtn color={color.white} icon={<Svg.PriPencil width={18} />} />
        }
        title="Đoạn chat"
      />
      <FlatList
        style={style.cnt}
        showsVerticalScrollIndicator={false}
        data={topics}
        renderItem={({item}) => <TopicItem topic={item} />}
        keyExtractor={item => item._id}
        ListHeaderComponent={renderListHeader}
      />
    </>
  );
});

const TopicItem: FC<{topic: ResponseTopic}> = memo(({topic}) => {
  const users = uniqueBy(topic.topic_user, item => item.user_id);
  let lastMsg = 'Tin nhắn...';
  if (topic.messages.length > 0) {
    lastMsg = topic.messages[0].msg;
    if (topic.messages[0].media_urls.length > 0) {
      lastMsg = 'Hình ảnh';
    }
  }
  let time = dayjs(topic.updated_at).format('[ng] DD, MM');
  if (
    dayjs(topic.updated_at).format('DD-MM-YYYY') ===
    dayjs().format('DD-MM-YYYY')
  ) {
    time = dayjs(topic.updated_at).format('HH:mm');
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigate.onNavigate(path.message, {topic_id: topic._id, topic})
      }
      style={styleTopic.cnt}>
      <Avatar uri={users[0].user?.avatar || ''} size={58} hasBadge />
      <View style={styleTopic.topicRight}>
        <View>
          <Label
            text={users.map(i => i.user.fullname).join(',')}
            color={color.grey[900]}
            preset="s14_b7"
            numberOfLines={1}
          />
          <View style={[styleGlobal.row, {marginTop: 2}]}>
            <Label
              style={{width: '80%'}}
              text={lastMsg}
              color={color.grey[800]}
              preset="s14"
              numberOfLines={1}
            />
            <Label
              style={{width: '20%', textAlign: 'right'}}
              text={time}
              preset="s12"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});
