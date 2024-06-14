import {IMedia} from '@/hooks';

export interface Page {
  p?: number | string;
  l?: number | string;
}
export interface ReqMessages extends Page {
  topic_id: string;
  sort?: string;
}
export interface BodyMessage {
  msg: string;
  topic_id: string;
  media_ids: number[];
  reply_id?: number;
}
export interface BodyMessageV2 extends BodyMessage {
  media?: IMedia[];
}
