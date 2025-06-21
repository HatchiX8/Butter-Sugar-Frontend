<!-- 購物車頁面 -->
<template>
  <div class="text-white">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex gap-6">
        <div v-if="itemCount === 0" class="flex-1 bg-neutral_600 border-1 border-solid border-white/10% p-4 rounded-0.5">
          <!-- 空購物車提示 -->
          <div class="text-center text-sm text-neutral_200 py-8">
            <span>購物車是空的，快去挑選喜歡的課程吧！</span>
          </div>
        </div>
        <cartList
          :cartItems="cartItems"
          :itemCount="itemCount"
          :orderDetails="false"
        />
        <!-- 訂單資訊 -->
        <div class="bg-black px-4 py-8 rounded text-4 md:w-1/3 flex-shrink-0 flex flex-col h-1/4 sticky top-24">
          <h3 class="font-['Noto Sans TC'] font-bold mb-4">訂單資訊</h3>
          <div class="mb-4 flex justify-between text-neutral_200 p-b-4 custom-border-bottom cursor-pointer">
            <span>折價券</span>
            <div>
              <span>選擇或輸入</span>
              <span class="inline-block align-middle w-3.5 h-3.5 i-ion:chevron-forward-sharp ml-1"></span>
            </div>
          </div>
          <div class="mb-4 flex justify-between text-neutral_200">
            <span>小計</span>
            <span>{{ formatCurrency(totalPrice) }}</span>
          </div>
          <div class="mb-4 flex justify-between text-neutral_200">
            <span>總計</span>
            <span class="text-white text-5">{{ formatCurrency(totalPrice) }}</span>
          </div>
          <baseButton label="前往結帳" type="primary" @click="goToCheckout" :disabled="itemCount === 0" class="mt-4 w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/models/cart/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import baseButton from '@/components/layout/baseButton.vue';
import cartList from '@/components/data/cartList.vue';

const cartStore = useCartStore();
const { cartItems, itemCount, totalPrice } = storeToRefs(cartStore);

const router = useRouter();
const goToCheckout = () => {
  // 未登入 → 引導 Google 登入 → 導轉到結帳頁
  if (!cartStore.isLoggedIn) {
    // ----------第三方登入----------
    const API_BASE = import.meta.env.VITE_API_URL;
    window.location.href = `${API_BASE}/api/v1/users/auth/google`;
    return;
  }

  // 已登入 → 直接導轉到結帳頁
  router.push({ name: 'Checkout'});
};

const formatCurrency = (value: number, currency = 'NT$'): string => `${currency} ${value.toLocaleString('en-US')}`;

onMounted(() => {
  cartStore.getCart();
});
</script>

<style scoped>
.clamped-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.custom-border-bottom {
  @apply: border-b-1 border-b-solid border-b-white/20%;
}
</style>
