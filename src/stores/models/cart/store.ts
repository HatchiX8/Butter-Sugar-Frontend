import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem } from '@/api/cart/types';
import { useUserStore } from '@/stores/models/user/store';

const LOCAL_STORAGE_KEY = 'cart';

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore();
  const isLoggedIn = computed(() => userStore.isLoggedIn); // 登入狀態由外部登入流程更新
  // const model = computed(() => (isLoggedIn.value ? 'api' : 'local'));

  // 購物車資料
  const cartItems = ref<CartItem[]>([]);

  // 僅登入後才會被使用
  // const serverItemCount = ref(0);
  // const serverTotalPrice = ref(0);

  // 根據登入狀態自動決定使用哪一組資料
  const itemCount = computed(() =>
    // model.value === 'api'
    //   ? (serverItemCount.value ?? 0)
    //   : cartItems.value.length
    cartItems.value.length
  );
  const totalPrice = computed(() =>
    // model.value === 'api'
    //   ? (serverTotalPrice.value ?? 0)
    //   : cartItems.value.reduce((sum, item) => sum + item.price, 0)
    cartItems.value.reduce((sum, item) => sum + item.price, 0)
  );

  // 取得購物車
  const getCart = async () => {
    // if (model.value === 'api') {

    // } else {
      const localCart = localStorage.getItem(LOCAL_STORAGE_KEY);
      cartItems.value = localCart ? JSON.parse(localCart) : [];
    // }
  };

  // 新增項目
  const addItem = async (item: CartItem) => {
    // if (model.value === 'api') {

    // } else {
      const exists = cartItems.value.some(i => i.course_id === item.course_id);
      if (!exists) {
        cartItems.value.push(item);
        saveToLocalStorage();
      }
    // }
  };

  // 刪除項目
  const removeItem = async (courseId: string) => {
    // if (model.value === 'api') {

    // } else {
      cartItems.value = cartItems.value.filter(i => i.course_id !== courseId)
      saveToLocalStorage()
    // }
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

    // actions
    getCart,
    addItem,
    removeItem
  };
});
