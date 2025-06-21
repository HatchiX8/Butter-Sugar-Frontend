import instance from '@/api/axios';
import type { ApiResponse, Cart, MergeCartData, CheckoutPayload, CheckoutResponse  } from './types';

// 取得購物車
export const getCartList = async (): Promise<ApiResponse<Cart>> => {
  const res = await instance.get<ApiResponse<Cart>>('/api/v1/cart');
  return res.data;
};

// 新增課程到購物車
export const addCartItem = async (courseId: string): Promise<ApiResponse<Cart>> => {
  const res = await instance.post<ApiResponse<Cart>>('/api/v1/cart', {
    course_id: courseId,
  });
  return res.data;
};

// 從購物車移除課程
export const removeCartItem = async (courseId: string): Promise<ApiResponse<Cart>> => {
  const res = await instance.delete<ApiResponse<Cart>>(`/api/v1/cart/${courseId}`);
  return res.data;
};

// 登入後整合購物車
export const mergeCartList = async (courseIds: string[]): Promise<ApiResponse<MergeCartData>> => {
  const res = await instance.post<ApiResponse<MergeCartData>>('/api/v1/cart/merge', {
    course_ids: courseIds
  });
  return res.data;
};

/**
 * 向後端請求結帳，取得 NewebPay HTML 表單
 * @param payload CheckoutPayload
 * @returns CheckoutResponse (HTML 字串)
 */
export const checkoutCart = async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
  const { data } = await instance.post<CheckoutResponse>('/api/v1/cart/checkout',
    payload,
    {
      // 後端回傳純 HTML；要指定 text，避免 axios 嘗試 JSON 解析
      responseType: 'text',
    },
  );
  return data;
};
