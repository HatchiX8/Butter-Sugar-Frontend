import { defineStore } from 'pinia';
import { ref} from 'vue';
import { getOrderList, getOrder } from '@/api/orders/index';
import type { ApiResponse, Orders, OrderItem } from '@/api/orders/types';
import axios from 'axios';

export const useOrderStore = defineStore('orderStore', () => {
  const orders = ref<Orders[]>([]);
  const order = ref<Orders | null>(null);
  const orderItems = ref<OrderItem[]>([]);
  const itemCount = ref<number>(0);
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

  // 取得單一訂單
  const fetchOrder = async (orderNumber: string) => {
    error.value = null;

    try {
      const res: ApiResponse<Orders[]> = await getOrder(orderNumber);
      if (res.data?.length) {
      order.value = res.data[0];
      orderItems.value = order.value?.order_items ?? [];
      itemCount.value = orderItems.value.length;
    } else {
      console.warn('找不到訂單資料');
      order.value = null;
      orderItems.value = [];
      itemCount.value = 0;
    }
    } catch (err) {
      error.value = getErrorMessage(err);
    }
  };

  return {
    // state
    error,
    orders,
    order,
    orderItems,
    itemCount,

    // actions
    fetchOrders,
    fetchOrder,
  };
});
