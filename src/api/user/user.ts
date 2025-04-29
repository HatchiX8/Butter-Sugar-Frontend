import instance from '../axios';
import type { User, UserRequest } from './types';

export const getUser = async () => {
  const res = await instance.get<User>('/api/user/info');
  return res.data;
};

export const selectUserInfo = async (data: UserRequest) => {
  const res = await instance.post<User>('/api/user/select_info', data);
  return res.data;
};
