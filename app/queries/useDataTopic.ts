import {ResponseContext, ResponseTopic} from '@/interfaces/response';
import {useStores} from '@/models/store';
import {QR_KEY} from '@/services';
import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

export const useGetListTopic = (
  params?: any,
  options?: UseInfiniteQueryOptions<any>,
) => {
  const {topicModel} = useStores();
  return useInfiniteQuery<any>(
    [QR_KEY.topic],
    ({pageParam = 1}) => topicModel.getDataTopics().then(res => res.context),
    {
      ...options,
    },
  );
};
export const useGetDetailTopic = (
  topic_id: string,
  options?: UseQueryOptions<ResponseContext<ResponseTopic>>,
) => {
  const {topicModel} = useStores();
  return useQuery({
    queryKey: [QR_KEY.topic, topic_id],
    queryFn: () => topicModel.getDataTopic(topic_id),
    ...options,
  });
};
