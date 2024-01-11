import {ResponseOrg} from './ResponseOrg';

export interface ResponseUser {
  id: number;
  fullname: string;
  email: string | null;
  telephone: string;
  fcm_token: string | null;
  created_at: string;
  platform: string;
  avatar: string | null;
  current_platform: string | null;
}
export interface ResponseTopicUser {
  _id: string;
  user_id: number;
  joined_at: string;
  topic_id: string;
  user: ResponseUser;
}
export interface ResponseMessage {
  _id: string;
  msg: string;
  user_id: number;
  topic_id: string;
  media_urls: any;
  reply_id: null | string;
  updated_at: string;
  created_at: string;
  user: ResponseUser;
}
export interface ResponseTopic {
  _id: string;
  type: string;
  organization_id: number;
  created_by: number;
  name: string;
  updated_at: string;
  created_at: string;
  topic_user: Array<ResponseTopicUser>;
  messages: Array<ResponseMessage>;
  organization: ResponseOrg;
}
