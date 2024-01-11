/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Avatar, Header, HeaderBackButton, Label} from '@/components';
import {color, styleGlobal} from '@/themes';
import {observer} from 'mobx-react-lite';
import React, {FC, useMemo, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styleHead} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {NavigatorParamList} from '@/navigator';
import {uniqueBy} from '@/utils';
import {useGetListMessage} from '@/queries';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbarProps,
} from 'react-native-gifted-chat';
import {CustomInputToolbar, CustomMessageImage} from './components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ResponseMessage} from '@/interfaces/response';
import {useStores} from '@/models/store';

export const ToolBarHeight = 52;

const transformMessage = (messages: ResponseMessage[]) => {
  return messages.map(i => {
    const image = i.media_urls as any;
    return {
      _id: i._id,
      text: i.msg,
      createdAt: new Date(i.created_at),
      user: {
        _id: i.user_id,
        name: i.user?.fullname,
        avatar: i.user?.avatar || '',
      },
      image,
    };
  });
};

export const MessagePage: FC<StackScreenProps<NavigatorParamList, 'message'>> =
  observer(({route}) => {
    const {topic, topic_id} = route.params;
    const {authModel} = useStores();
    const insets = useSafeAreaInsets();
    const users = useMemo(
      () => uniqueBy(topic.topic_user, item => item.user_id),
      [],
    );
    const {data: dataResponse, fetchNextPage} = useGetListMessage(
      {topic_id},
      {
        getNextPageParam: (data: any) => data.context.current_page + 1,
        onSuccess: data => {
          let messagesOrigin: IMessage[] = transformMessage(
            data?.pages
              .map(i => i.context.data)
              .flat()
              .filter(Boolean),
          );
          setMessages(messagesOrigin);
        },
      },
    );
    const [messages, setMessages] = useState<IMessage[]>(
      transformMessage(
        dataResponse?.pages
          .map(i => i.context.data)
          .flat()
          .filter(Boolean) || [],
      ),
    );
    const total = dataResponse?.pages[0]?.context.total || 1;
    return (
      <>
        <Header>
          <View style={[styleGlobal.row, styleHead.cnt]}>
            <View style={[styleGlobal.row, styleHead.headLeft]}>
              <HeaderBackButton />
              <Avatar uri={users[0].user?.avatar || ''} size={38} hasBadge />
              <Label
                text={users.map(i => i.user.fullname).join(', ')}
                preset="s14_b6"
                color={color.grey[900]}
                style={{marginLeft: 6}}
                numberOfLines={1}
              />
            </View>
          </View>
        </Header>
        <GiftedChat
          loadEarlier
          infiniteScroll
          scrollToBottom
          onLoadEarlier={() => fetchNextPage()}
          messages={messages}
          messagesContainerStyle={{
            paddingBottom: ToolBarHeight - 12,
            backgroundColor: color.white,
          }}
          renderLoadEarlier={() => (
            <ActivityIndicator
              style={messages.length >= total ? {display: 'none'} : {}}
            />
          )}
          renderBubble={props => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {backgroundColor: color.primary},
                left: {backgroundColor: '#F7F5FF'},
              }}
            />
          )}
          renderMessageImage={data => (
            <CustomMessageImage media={data.currentMessage?.image} />
          )}
          user={{
            _id: Number(authModel.profile?.id),
          }}
          renderInputToolbar={(props: InputToolbarProps<any>) => (
            <CustomInputToolbar
              {...props}
              setMessages={setMessages}
              topic_id={topic_id}
            />
          )}
          bottomOffset={-(ToolBarHeight - insets.bottom)}
        />
      </>
    );
  });
