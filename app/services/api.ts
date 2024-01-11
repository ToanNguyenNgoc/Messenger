import {baseURL} from '@/constants';
import {authStorage} from '@/utils';
import axios from 'axios';
import queryString from 'query-string';

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});
api.interceptors.request.use(async config => {
  const token = await authStorage.get('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);
