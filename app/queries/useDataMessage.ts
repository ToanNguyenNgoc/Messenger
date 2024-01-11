import {ReqMessages} from '@/interfaces/request';
import {ResponseContextList, ResponseMessage} from '@/interfaces/response';
import {useStores} from '@/models/store';
import {QR_KEY} from '@/services';
import {UseInfiniteQueryOptions, useInfiniteQuery} from '@tanstack/react-query';

export const useGetListMessage = (
  request: ReqMessages,
  options?: UseInfiniteQueryOptions<ResponseContextList<ResponseMessage>>,
) => {
  const {messageModel} = useStores();
  return useInfiniteQuery({
    queryKey: [QR_KEY.message, request.topic_id],
    queryFn: ({pageParam = 1}) =>
      messageModel.getDataMessages({
        ...request,
        p: pageParam,
        sort: '-created_at',
      }),
    staleTime: 0,
    ...options,
  });
};
