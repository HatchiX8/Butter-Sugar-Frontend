<template>
  <div v-show="uiCartStore.isCartOpen"
    class="absolute top-full mt-0.25 right-0 w-120 bg-neutral_600 text-white z-30 border-solid border-1 border-white/10%">
    <!-- 空購物車提示 -->
    <div v-if="cartStore.itemCount === 0" class="text-center text-sm text-neutral_200 py-8">
      <span>購物車是空的，快去挑選喜歡的課程吧！</span>
    </div>
    <!-- 購物車清單 -->
    <div v-else class="p-4 max-h-[80vh] overflow-y-auto">
      <div v-for="item in cartStore.cartItems" :key="item.course_id"
        class="flex items-start gap-3 border-b border-white p-4">
        <img :src="item.course_smallimage" class="w-25 h-18.5 object-cover rounded" />
        <div class="flex-1">
          <div class="clamped-text line-height-5 text-white">{{ item.course_name }}</div>
          <div class="text-3.5 text-neutral_200 m-t-2">{{ formatCurrency(item.price) }}</div>
        </div>
        <n-button text @click="cartStore.removeItem(item.course_id)">
          <div class="i-ion:trash-outline w-4 h-4 ml-1 color-white"></div>
        </n-button>
      </div>

      <div class="mt-4 ">
        <div class="flex justify-between py-6 border-t-1 border-solid border-white/10%">
          <div class="text-3.5 text-neutral_200">總計 {{ cartStore.itemCount }} 項商品</div>
          <div class="text-5 font-bold text-white">{{ formatCurrency(cartStore.totalPrice) }}</div>
        </div>
        <n-button type="primary" class="w-full mb-2" @click="goToCart">
          <span>前往購物車</span>
          <span class="inline-block align-middle w-3.5 h-3.5 i-ion:arrow-forward ml-1 color-white"></span>
        </n-button>
      </div>
    </div>
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

function formatCurrency(value: number, currency = 'NT$') {
  return `${currency} ${value.toLocaleString('en-US')}`
}
</script>

<style scoped>
.clamped-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
