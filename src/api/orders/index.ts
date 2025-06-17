import instance from '@/api/axios';
import type { ApiResponse, Orders  } from './types';

// 取得所有訂單
export const getOrderList = async (): Promise<ApiResponse<Orders[]>> => {
  const res = await instance.get<ApiResponse<Orders[]>>('/api/v1/users/orders');
  return res.data;
};

// 取得訂單
export const getOrder= async (): Promise<ApiResponse<Orders>> => {
  const res = await instance.get<ApiResponse<Orders>>('/api/v1/users/order');
  return res.data;
};
