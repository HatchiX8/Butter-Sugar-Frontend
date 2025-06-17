import { defineStore } from 'pinia';
import { ref} from 'vue';
import { getOrderList } from '@/api/orders/index';
import type { ApiResponse, Orders } from '@/api/orders/types';
import axios from 'axios';

export const useOrderStore = defineStore('orderStore', () => {
  const orders = ref<Orders[]>([]);
  const order = ref<Orders>();
  const error = ref<string | null>(null);

  // 錯誤訊息
  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      // 優先取後端回傳的 message
      const msg = err.response?.data?.message
      if (typeof msg === 'string') return msg;
    }
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    return '發生未知錯誤';
  };

  // 取得所有訂單
  const fetchOrders = async () => {
    error.value = null;

    try {
      const res: ApiResponse<Orders[]> = await getOrderList();
      orders.value = res.data ?? [];
    } catch (err) {
      error.value = getErrorMessage(err);
    }
  };

  // 取得訂單
  const fetchOrder = async () => {
    error.value = null;

    try {
      // await getOrder();
      // 暫時拿 orders 第一筆
      order.value = orders.value[0];
    } catch (err) {
      error.value = getErrorMessage(err);
    }
  };

  return {
    // state
    error,
    orders,
    order,

    // actions
    fetchOrders,
    fetchOrder,
  };
});
