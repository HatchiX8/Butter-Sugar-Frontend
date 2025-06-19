<template>
  <!-- 遮罩和側邊欄容器 -->
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="uiCartStore.isCartOpen"
      class="fixed top-20 left-0 right-0 bottom-0 z-20 bg-black bg-opacity-60"
      @click.self="uiCartStore.closeCart">
    </div>
  </transition>
  <!-- 購物車本體 -->
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
  >
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
            <img :src="item.course_small_imageurl" class="w-25 h-18.5 object-cover rounded" />
            <div class="flex-1">
              <div class="font-bold line-height-5 text-white clamped-text">{{ item.course_name }}</div>
              <div class="text-3.5 text-neutral_200 mt-2">{{ formatCurrency(item.price) }}</div>
            </div>
            <baseButton text @click="handleRemoveFromCart(item.cart_item_id ?? item.course_id)" icon="i-ion:trash-outline" iconClass="w-4 h-4 text-neutral_200 hover:text-primaryDefault" />
          </div>
        </div>

        <!-- 固定底部總計與按鈕區 -->
        <div class="border-t border-white/10% p-4 bg-neutral_600 shrink-0">
          <div class="flex justify-between py-4">
            <div class="text-3.5 text-neutral_200">總計 {{ cartStore.itemCount }} 項商品</div>
            <div class="text-5 font-bold text-white">{{ formatCurrency(cartStore.totalPrice) }}</div>
          </div>
          <baseButton label="前往購物車" type="primary" @click="goToCart" icon="i-ion:arrow-forward" iconPosition="right" class="w-full mb-2" />
        </div>
      </template>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/models/cart/store';
import { useCartUIStore } from '@/stores/models/cart/uiStore';
import { useRouter } from 'vue-router';
import baseButton from '@/components/layout/baseButton.vue';
import { useMessage } from 'naive-ui';

const message = useMessage();

const cartStore = useCartStore();
const uiCartStore = useCartUIStore();

const router = useRouter();
const goToCart = () => {
  uiCartStore.isCartOpen = false;
  router.push({ name: 'Cart' });
};

const formatCurrency = (value?: number, currency = 'NT$'): string => `${currency} ${value?.toLocaleString('en-US')}`;

const handleRemoveFromCart = async (id: string) => {
  const res = await cartStore.removeItem(id);
  message[res.success ? 'success' : 'error'](res.message);
};
</script>

<style scoped>
.clamped-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
