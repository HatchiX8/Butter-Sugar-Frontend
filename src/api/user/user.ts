import instance from '../axios';
import type { ApiResponse, User, UserRequest } from './types';

export const getUser = async () => {
  const res = await instance.get<ApiResponse<User>>('/api/v1/users/info');
  return res.data;
};

export const selectUserInfo = async (data: UserRequest) => {
  const res = await instance.post<User>('/api/v1/user/select_info', data);
  return res.data;
};
