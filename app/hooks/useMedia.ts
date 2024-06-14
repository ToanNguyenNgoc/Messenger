import {useStores} from '@/models/store';
import ImagePicker from 'react-native-image-crop-picker';

export interface IMedia {
  model_id: null | number;
  uri: string;
  name: string;
  type: string;
}
interface PostMediaOptions {
  camera?: boolean;
}

export function useMedia() {
  const {mediaModel} = useStores();
  const postMedia = async (options?: PostMediaOptions) => {
    let media = [] as IMedia[];
    if (options?.camera) {
      const cameraLocal = await ImagePicker.openCamera({mediaType: 'photo'});
      media = [
        {
          model_id: null,
          uri: cameraLocal.path,
          name: cameraLocal.filename || cameraLocal.path,
          type: cameraLocal.mime,
        },
      ];
    } else {
      const mediaLocal = await ImagePicker.openPicker({
        multiple: true,
        compressImageQuality: 0.4,
      });
      media = mediaLocal.map(i => ({
        model_id: null,
        uri: i.path,
        name: i.filename?.replace(/HEIC/g, 'jpg') || 'image',
        type: 'image/jpeg',
      }));
    }
    return media;
    // try {
    //   // console.log(images[0])
    //   const photo: any = {
    //     uri: images[0].sourceURL,
    //     name: images[0].filename,
    //     type: images[0].mime,
    //   };
    //   const formData = new FormData();
    //   formData.append('file', photo);
    //   const response = await mediaModel.postMediaApi(formData);
    //   console.log(response);
    //   return response;
    // } catch (error) {
    //   console.log(error);
    // }
    // return;
  };
  return {postMedia};
}
