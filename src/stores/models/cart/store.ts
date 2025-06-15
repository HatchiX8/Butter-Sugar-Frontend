import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ApiResponse, Cart, CartItem, MergeCartData } from '@/api/cart/types';
import { getCartList, addCartItem, removeCartItem, mergeCartList } from '@/api/cart/index';
import { useUserStore } from '@/stores/models/user/store';
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'cart';

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore();
  const isLoggedIn = computed(() => userStore.isLoggedIn); // 登入狀態由外部登入流程更新
  const model = computed(() => (isLoggedIn.value ? 'api' : 'local'));

  // 購物車資料
  const cartItems = ref<CartItem[]>([]);

  // 僅登入後才會被使用
  const serverItemCount = ref(0);
  const serverTotalPrice = ref(0);

  // 根據登入狀態自動決定使用哪一組資料
  const itemCount = computed(() =>
    model.value === 'api'
      ? (serverItemCount.value ?? 0)
      : cartItems.value.length
  );
  const totalPrice = computed(() =>
    model.value === 'api'
      ? (serverTotalPrice.value ?? 0)
      : cartItems.value.reduce((sum, item) => sum + item.price, 0)
  );

  const loading = ref(false);
  const error = ref<string | null>(null);

  // 錯誤訊息
  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      // 優先取後端回傳的 message
      const msg = err.response?.data?.message
      if (typeof msg === 'string') return err.response?.data?.message;
    }
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    return '發生未知錯誤';
  };

  interface ActionResult {
    success: boolean;
    message: string;
  }

  // 取得購物車
  const getCart = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (model.value === 'api') {
        const res : ApiResponse<Cart> = await getCartList();
        if (!res.status) throw new Error(res.message);
        cartItems.value = res?.data?.items ?? [];
        serverItemCount.value = res?.data?.item_count ?? 0;
        serverTotalPrice.value = res?.data?.total_price ?? 0;
      } else {
        const localCart = localStorage.getItem(LOCAL_STORAGE_KEY);
        cartItems.value = localCart ? JSON.parse(localCart) : [];
      }
    } catch (err) {
        error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  };

  // 新增項目
  const addItem = async (item: CartItem): Promise<ActionResult> => {
    loading.value = true;
    error.value = null;

    try {
      if (model.value === 'api') {
        const res : ApiResponse<Cart> = await addCartItem(item.course_id);
        if (!res.status) throw new Error(res.message);
        await getCart(); // 新增後重新同步
        return { success: true, message: res.message };
      } else {
        const exists = cartItems.value.some(i => i.course_id === item.course_id);
        if (!exists) {
          cartItems.value.push(item);
          saveToLocalStorage();
          return { success: true, message: '成功新增到購物車' };
        }
        return { success: false, message: '此課程已存在購物車' };
      }
    } catch (err) {
        const msg = getErrorMessage(err);
        error.value = msg;
        return { success: false, message: msg };
    } finally {
      loading.value = false;
    }
  };

  // 刪除項目
  const removeItem = async (courseId: string): Promise<ActionResult> => {
    loading.value = true;
    error.value = null;

    try {
      if (model.value === 'api') {
        const res : ApiResponse<Cart> = await removeCartItem(courseId);
        if (!res.status) throw new Error(res.message);
        await getCart(); // 刪除後重新同步
        return { success: true, message: res.message };
      } else {
        cartItems.value = cartItems.value.filter(i => i.course_id !== courseId);
        saveToLocalStorage();
        return { success: true, message: '已從購物車移除課程' };
      }
    } catch (err) {
        const msg = getErrorMessage(err);
        error.value = msg;
        return { success: false, message: msg };
    } finally {
      loading.value = false;
    }
  };

  // 登入後整合購物車
  const mergeCart = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (model.value === 'api') {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const courseIds = localCart.map((item: CartItem) => item.course_id);

        const res : ApiResponse<MergeCartData> = await mergeCartList(courseIds);
        if (!res.status) throw new Error(res.message);
        await getCart(); // 整合後重新同步
        localStorage.removeItem('cart');
      }
    } catch (err) {
        const msg = getErrorMessage(err);
        error.value = msg;
    } finally {
      loading.value = false;
    }
  };

  // 儲存到 localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems.value));
  };

  return {
    // state
    isLoggedIn,
    cartItems,
    itemCount,
    totalPrice,
    loading,
    error,

    // actions
    getCart,
    addItem,
    removeItem,
    mergeCart
  };
});
