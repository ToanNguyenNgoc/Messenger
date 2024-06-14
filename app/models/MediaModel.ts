import {api} from '@/services';
import {flow, types} from 'mobx-state-tree';

const MediaModel = types.model('Media').actions(() => {
  const postMediaApi = flow(function* postMediaApi(form: FormData) {
    const response = yield api.post('media', form, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response;
  });
  return {
    postMediaApi,
  };
});
export default MediaModel;
