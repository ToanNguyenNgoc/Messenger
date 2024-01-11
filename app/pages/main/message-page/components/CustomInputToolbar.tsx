/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import {Svg} from '@/assets';
import {ButtonIcon} from '@/components';
import {color, dimension, styleGlobal} from '@/themes';
import React, {
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Animated, StyleSheet, TextInput, View} from 'react-native';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from 'react-native-gifted-chat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ToolBarHeight} from '../MessagePage';
import dayjs from 'dayjs';
import {useStores} from '@/models/store';
import {useMutation} from '@tanstack/react-query';
import {BodyMessage} from '@/interfaces/request';

interface CustomInputToolbarProps extends InputToolbarProps<IMessage> {
  setMessages: (value: SetStateAction<IMessage[]>) => void;
  topic_id: string;
}

const widthFeature = (dimension.screenWidth - 24) * 0.4;
const widthInput = (dimension.screenWidth - 24) * 0.6;
const wWrapInput = widthInput - 40;

const handleAnimated = (
  isFocus: boolean,
  aniWidthFeature: Animated.Value,
  aniDisPlayBtn: Animated.Value,
  aniWidthInput: Animated.Value,
  aniWrapInput: Animated.Value,
) => {
  const newWidthValue = isFocus ? 0 : widthFeature;
  const newDisplay = isFocus ? 0 : 1;
  const newWidthInputValue = isFocus ? dimension.screenWidth - 24 : widthInput;
  const newWidthWrapInput = isFocus ? dimension.screenWidth - 64 : wWrapInput;
  Animated.timing(aniWidthFeature, {
    toValue: newWidthValue,
    duration: 500,
    useNativeDriver: false,
  }).start();
  Animated.timing(aniDisPlayBtn, {
    toValue: newDisplay,
    duration: isFocus ? 300 : 600,
    useNativeDriver: false,
  }).start();
  Animated.timing(aniWidthInput, {
    toValue: newWidthInputValue,
    duration: 500,
    useNativeDriver: false,
  }).start();
  Animated.timing(aniWrapInput, {
    toValue: newWidthWrapInput,
    duration: 500,
    useNativeDriver: false,
  }).start();
};

export const CustomInputToolbar: FC<CustomInputToolbarProps> = props => {
  const {setMessages, topic_id} = props;
  const {
    authModel: {profile},
    messageModel,
  } = useStores();
  const insets = useSafeAreaInsets();
  const [isFocus, setIsFocus] = useState(false);
  const aniWidthFeature = useRef(new Animated.Value(widthFeature)).current;
  const aniWidthInput = useRef(new Animated.Value(widthInput)).current;
  const aniDisPlayBtn = useRef(new Animated.Value(0)).current;
  const aniWrapInput = useRef(new Animated.Value(wWrapInput)).current;
  useEffect(() => {
    handleAnimated(
      isFocus,
      aniWidthFeature,
      aniDisPlayBtn,
      aniWidthInput,
      aniWrapInput,
    );
  }, [isFocus]);
  const {mutate} = useMutation({
    mutationFn: (body: BodyMessage) => messageModel.postMessage(body),
  });
  const [body, setBody] = useState({msg: '', media_ids: []});
  const handleSubmitMessage = useCallback(() => {
    if (body.msg.trim().length !== 0 || body.media_ids.length > 0) {
      const messages: IMessage[] = [
        {
          _id: dayjs().format('YYYYMMDDHHmmss'),
          text: body.msg,
          createdAt: new Date(),
          user: {
            _id: Number(profile?.id),
            avatar: String(profile?.avatar),
            name: String(profile?.fullname),
          },
        },
      ];
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
      mutate({msg: body.msg, media_ids: body.media_ids, topic_id});
      setBody({msg: '', media_ids: []});
    }
  }, [body]);
  return (
    <>
      <InputToolbar
        {...props}
        containerStyle={{
          paddingBottom: insets.bottom,
        }}
        renderComposer={() => (
          <View style={[styleGlobal.row, style.cnt]}>
            <Animated.View
              style={[
                styleGlobal.row,
                style.cntFeature,
                {width: aniWidthFeature},
              ]}>
              <Animated.View
                style={[
                  styleGlobal.row,
                  {alignItems: 'center', opacity: aniDisPlayBtn},
                ]}>
                <ButtonIcon
                  size={38}
                  style={{borderWidth: 0}}
                  icon={<Svg.PriNavigation width={24} height={24} />}
                />
                <ButtonIcon
                  size={38}
                  style={{borderWidth: 0}}
                  icon={<Svg.PriCamera width={28} height={28} />}
                />
                <ButtonIcon
                  size={38}
                  style={{borderWidth: 0}}
                  icon={<Svg.PriPicture width={21} height={21} />}
                />
                <ButtonIcon
                  size={38}
                  style={{borderWidth: 0}}
                  icon={<Svg.PriMic width={21} height={21} />}
                />
              </Animated.View>
            </Animated.View>
            <Animated.View
              style={[styleGlobal.row, style.cntInput, {width: aniWidthInput}]}>
              <Animated.View style={[style.wrapInput, {width: aniWrapInput}]}>
                <TextInput
                  onChangeText={text => setBody({...body, msg: text})}
                  onBlur={() => setIsFocus(false)}
                  onPressIn={() => setIsFocus(!isFocus)}
                  placeholder="Aa"
                  value={body.msg}
                  style={style.input}
                />
              </Animated.View>
              <ButtonIcon
                onPress={handleSubmitMessage}
                icon={<Svg.PriPlanPaper />}
              />
            </Animated.View>
          </View>
        )}
      />
    </>
  );
};

const style = StyleSheet.create({
  wrapper: {},
  cnt: {
    width: '100%',
    height: ToolBarHeight,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cntFeature: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  cntInput: {
    width: widthInput,
    height: '100%',
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapInput: {
    height: '100%',
    width: wWrapInput,
  },
  input: {
    width: '100%',
    height: '100%',
    backgroundColor: color.grey[200],
    borderRadius: ToolBarHeight / 2,
    paddingHorizontal: 12,
    color: color.grey[900],
  },
});
