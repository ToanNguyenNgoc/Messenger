import {IMedia} from '@/hooks';
import {BodyMessage, BodyMessageV2, ReqMessages} from '@/interfaces/request';
import {api} from '@/services';
import {pickUp} from '@/utils';
import {flow, types} from 'mobx-state-tree';
import {Alert, Platform} from 'react-native';

const handlePostMedia = async (media: IMedia[]) => {
  let media_ids = [] as number[];
  let data = [] as any;
  console.log(media);
  try {
    for (var i = 0; i < media.length; i++) {
      const form = new FormData();
      form.append('file', pickUp(media[i]));
      media[i].uri =
        Platform.OS === 'ios' ? `file:/${media[i].uri}` : media[i].uri;
      const response: any = await api.post('media', form, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      media_ids.push(Number(response.context.model_id));
    }
  } catch (error) {
    console.log(20, error);
    Alert.alert('Thông báo', 'Có lỗi xảy ra. Vui lòng thử lại !');
  }
  return {media_ids, data};
};

const MessageModel = types.model('Message').actions(() => {
  const getDataMessages = flow(function* getDataMessages(request: ReqMessages) {
    const response = yield api.get('messages', {params: request});
    return response;
  });
  const postMessage = flow(function* postMessage(body: BodyMessage) {
    const response = yield api.post('messages', body);
    return response;
  });
  const postMessageMedia = flow(function* postMessageMedia(
    body: BodyMessageV2,
  ) {
    const {media_ids} = yield handlePostMedia(body.media || []);
    const response = yield api.post(
      'messages',
      pickUp<BodyMessageV2>({...body, media_ids}),
    );
    return response;
  });
  return {
    getDataMessages,
    postMessage,
    postMessageMedia,
  };
});

export default MessageModel;
