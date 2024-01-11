import {api} from '@/services';
import {flow, types} from 'mobx-state-tree';

const TopicModel = types.model('Topic').actions(self => {
  const getDataTopics = flow(function* getDataTopics() {
    const response = yield api.get('topics?p=1&l=15&org=demo&sort=-updated_at');
    return response;
  });
  const getDataTopic = flow(function* getDataTopic(topic_id: string) {
    const response = yield api.get(`topics/${topic_id}`);
    return response;
  });
  return {
    getDataTopics,
    getDataTopic,
  };
});
export default TopicModel;
