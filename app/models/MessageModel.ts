import {BodyMessage, ReqMessages} from '@/interfaces/request';
import {api} from '@/services';
import {flow, types} from 'mobx-state-tree';

const MessageModel = types.model('Message').actions(() => {
  const getDataMessages = flow(function* getDataMessages(request: ReqMessages) {
    const response = yield api.get('messages', {params: request});
    return response;
  });
  const postMessage = flow(function* postMessage(body: BodyMessage) {
    const response = yield api.post('messages', body);
    return response;
  });
  return {
    getDataMessages,
    postMessage,
  };
});

export default MessageModel;
