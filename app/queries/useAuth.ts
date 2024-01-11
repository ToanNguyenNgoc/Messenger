import {ReqLogin} from '@/interfaces/request';
import {useStores} from '@/models/store';
import {navigate, path} from '@/navigator';
import {useMutation} from '@tanstack/react-query';

export function useAuth() {
  const {authModel} = useStores();
  const mutationLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: (reqLogin: ReqLogin) => authModel.login(reqLogin),
    onSuccess: data => {
      navigate.onNavigate(path.main);
    },
  });
  return {
    mutationLogin,
  };
}
