import {ResponseTopic} from '@/interfaces/response';

export type NavigatorParamList = {
  message: {topic_id: string; topic: ResponseTopic};
};

export const path = {
  main: 'main',
  home: 'home',
  search: 'search',
  message: 'message',
  send_multi: 'send_multi',
  call: 'call',
  phone_book: 'phone_book',
  topic: 'topic',
  profile: 'profile',
  sign_in: 'sign_in',
};
