<template>
  <div
    v-show="uiCartStore.isCartOpen"
    class="absolute top-full mt-0.25 right-0 w-120 bg-neutral_600 text-white z-30 border border-white/10% flex flex-col overflow-hidden"
    :style="{ height: 'calc(100vh - 5rem)' }">
    <!-- 空購物車提示 -->
    <div v-if="cartStore.itemCount === 0" class="flex-1 flex items-center justify-center text-sm text-neutral_200"
    >
      <span>購物車是空的，快去挑選喜歡的課程吧！</span>
    </div>
    <template v-else>
      <!-- 購物車清單 -->
      <div class="flex-1 overflow-y-auto p-4">
        <div
          v-for="item in cartStore.cartItems"
          :key="item.course_id"
          class="flex items-start gap-3 border-b border-white p-4"
        >
          <img :src="item.course_smallimage" class="w-25 h-18.5 object-cover rounded" />
          <div class="flex-1">
            <div class="font-bold line-height-5 text-white clamped-text">{{ item.course_name }}</div>
            <div class="text-3.5 text-neutral_200 mt-2">{{ formatCurrency(item.price) }}</div>
          </div>
          <n-button text @click="cartStore.removeItem(item.course_id)">
            <div class="i-ion:trash-outline w-4 h-4 color-neutral_200 hover:text-primaryDefault"></div>
          </n-button>
        </div>
      </div>

      <!-- 固定底部總計與按鈕區 -->
      <div class="border-t border-white/10% p-4 bg-neutral_600 shrink-0">
        <div class="flex justify-between py-4">
          <div class="text-3.5 text-neutral_200">總計 {{ cartStore.itemCount }} 項商品</div>
          <div class="text-5 font-bold text-white">{{ formatCurrency(cartStore.totalPrice) }}</div>
        </div>
        <n-button type="primary" class="w-full mb-2" @click="goToCart">
          <span>前往購物車</span>
          <span class="inline-block align-middle w-3.5 h-3.5 i-ion:arrow-forward ml-1 color-white"></span>
        </n-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/models/cart/store';
import { useCartUIStore } from '@/stores/models/cart/uiStore';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const uiCartStore = useCartUIStore();

const router = useRouter();
const goToCart = () => {
  uiCartStore.isCartOpen = false;
  router.push('/home/cart-flow/cart');
};

const formatCurrency = (value: number, currency = 'NT$'): string => `${currency} ${value.toLocaleString('en-US')}`;
</script>

<style scoped>
.clamped-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
