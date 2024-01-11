import {auth_key_storage} from '@/constants';
import {storage} from './storage';

interface Arg {
  token?: string;
  refresh_token?: string;
  ci_api_token?: string;
  token_expired_at?: string;
}
type KeyGet = keyof typeof auth_key_storage;
export const authStorage = {
  saveAuth: async ({
    token,
    refresh_token,
    ci_api_token,
    token_expired_at,
  }: Arg) => {
    if (token) {
      await storage.setItem(auth_key_storage.token, token);
    }
    if (refresh_token) {
      await storage.setItem(auth_key_storage.refresh_token, refresh_token);
    }
    if (ci_api_token) {
      await storage.setItem(auth_key_storage.ci_api_token, ci_api_token);
    }
    if (token_expired_at) {
      await storage.setItem(
        auth_key_storage.token_expired_at,
        token_expired_at,
      );
    }
  },
  get: async (key: KeyGet) => {
    return storage.getItem(key);
  },
};
