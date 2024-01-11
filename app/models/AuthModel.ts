import {ReqLogin} from '@/interfaces/request';
import {navigate, path} from '@/navigator';
import {api} from '@/services';
import {authStorage, storage} from '@/utils';
import {flow, types} from 'mobx-state-tree';

const AuthModel = types
  .model('Auth', {
    loading: false,
    profile: types.maybeNull(
      types.model({
        id: types.maybeNull(types.number),
        avatar: types.maybeNull(types.string),
        ci_api_token: types.maybeNull(types.string),
        current_platform: types.maybeNull(types.string),
        email: types.maybeNull(types.string),
        fullname: types.maybeNull(types.string),
        platform: types.maybeNull(types.string),
        roles: types.maybeNull(types.string),
        telephone: types.maybeNull(types.string),
      }),
    ),
  })
  .actions(self => {
    const login = flow(function* login(req: ReqLogin) {
      const response: any = yield api.post(`/auth/${req.subdomain}/login`, {
        ...req,
        code: '1',
        verification_id: '1',
      });
      if (response.context) {
        const {ci_api_token, token, refresh_token, token_expired_at} =
          response.context;
        yield authStorage.saveAuth({
          token,
          refresh_token,
          ci_api_token,
          token_expired_at,
        });
        self.profile = response.context;
      }
      return response;
    });
    const getProfile = flow(function* getProfile(reload?: boolean) {
      self.loading = reload === undefined ? false : true;
      const token = yield authStorage.get('token');
      if (!token) {
        self.loading = false;
        self.profile = null;
        return;
      }
      try {
        const response = yield api.get('users/profile');
        if (response.context) {
          self.profile = response.context;
        }
        self.loading = false;
        return response;
      } catch (error) {
        console.log(error);
        self.profile = null;
        self.loading = false;
        navigate.onNavigate(path.sign_in);
      }
    });
    const logout = flow(function* logout() {
      yield storage.clearAll();
      self.profile = null;
      navigate.onNavigate(path.sign_in);
    });
    return {
      login,
      getProfile,
      logout,
    };
  });
export default AuthModel;
