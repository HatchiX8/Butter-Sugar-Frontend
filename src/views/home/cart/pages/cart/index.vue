<!-- 購物車頁面 -->
<template>
  <div class="text-white">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 bg-neutral_600 border-1 border-solid border-white/10% p-4 rounded-0.5">
          <div class="flex items-center justify-between p-4 mb-4">
            <h2 class="font-bold text-6">購物車</h2>
            <div class="text-primaryDefault text-4 text-right">總共 {{ itemCount }} 件</div>
          </div>
          <div v-for="(item, index) in cartItems" :key="item.course_id"
            class="p-4 border-b border-neutral-700 group">
            <div class="flex items-start gap-4 pb-4" :class="{
      'border-b-1 border-b-solid border-b-white/20%': index !== cartItems.length - 1
    }">
              <!-- 課程圖片 -->
              <div class="shrink-0">
                <img :src="item.course_smallimage" alt="課程小圖"
                  class="w-36 h-24 object-cover rounded-md transition-transform duration-300 group-hover:scale-105" />
              </div>
              <!-- 課程資訊 -->
              <div class="flex justify-between items-start w-full">
                <!-- 課程名稱 -->
                <div class="font-bold text-white text-base leading-snug line-clamp-2 pr-4">
                  {{ item.course_name }}
                </div>
                <div class="text-right min-w-30">
                  <div class="text-white font-bold text-lg mb-3">
                    {{ formatCurrency(item.price) }}
                  </div>
                  <!-- 移除按鈕 -->
                  <div class="flex items-center justify-end gap-2">
                    <n-button text @click="cartStore.removeItem(item.course_id)">
                      <span class="text-neutral-300 hover:text-primaryDefault">移除</span>
                    </n-button>
                    <n-button text @click="cartStore.removeItem(item.course_id)">
                      <div class="i-ion:trash-outline w-4 h-4 text-neutral-300 hover:text-primaryDefault"></div>
                    </n-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 小計 -->
        <div class="bg-black p-4 rounded max-h-[30vh]">
          <h3 class="text-lg font-bold mb-4">訂單資訊</h3>
          <div class="mb-2 flex justify-between">
            <span>小計</span>
            <span>{{ formatCurrency(totalPrice) }}</span>
          </div>
          <div class="mb-2 flex justify-between">
            <span>總計</span>
            <span>{{ formatCurrency(totalPrice) }}</span>
          </div>
          <n-button type="primary" class="mt-4 w-full" @click="goToCheckout">
            前往結帳
          </n-button>
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

const cartStore = useCartStore();

const { cartItems, itemCount, totalPrice } = storeToRefs(cartStore);

const router = useRouter();
const goToCheckout = () => {
  router.push('/home/cart-flow/checkout');
};

function formatCurrency(value: number, currency = 'NT$') {
  return `${currency} ${value.toLocaleString('en-US')}`
}

onMounted(() => {
  cartStore.getCart()
});
</script>

<style scoped>
.clamped-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
