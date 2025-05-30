<!-- 購物車頁面 -->
<template>
  <div class="text-white">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex gap-6">
        <div class="flex-1 bg-neutral_600 border-1 border-solid border-white/10% p-4 rounded-0.5">
          <div class="flex items-center justify-between p-4 mb-4">
            <div>
              <h2 class="font-bold text-6">購物車</h2>
              <div class="mt-4 w-14 h-0.1 bg-primaryDefault"></div>
            </div>
            <div class="font-['Noto Sans TC'] text-primaryDefault text-4 text-right">總共 {{ itemCount }} 件</div>
          </div>
          <!-- 空購物車提示 -->
          <div v-if="itemCount === 0" class="text-center text-sm text-neutral_200 py-8">
            <span>購物車是空的，快去挑選喜歡的課程吧！</span>
          </div>
          <div v-for="(item, index) in cartItems" :key="item.course_id"
            class="p-4">
            <div class="flex gap-4 pb-4" :class="{ 'custom-border-bottom': index !== cartItems.length - 1 }">
              <router-link
                :to="`/home/course/${item.course_id}`"
                class="flex flex-1 items-start gap-4 cursor-pointer no-underline group">
                <!-- 課程圖片 -->
                <div class="shrink-0 w-36 h-24 overflow-hidden rounded-md transition-shadow duration-300 group-hover:shadow-lg">
                  <img :src="item.course_smallimage" alt="課程小圖"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <!-- 課程名稱 -->
                <div class="font-bold text-white text-base leading-snug clamped-text">
                  {{ item.course_name }}
                </div>
              </router-link>
              <div class="w-21 min-w-28 text-right">
                <div class="text-white font-bold text-lg mb-3">
                  {{ formatCurrency(item.price) }}
                </div>
                <!-- 移除按鈕 -->
                <div class="flex items-center justify-end gap-2">
                  <n-button text @click="showConfirmModal = true">
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
          <n-button type="primary" class="mt-4 w-full" @click="goToCheckout">
            前往結帳
          </n-button>
        </div>
      </div>
    </div>
  </div>
  <confirmModal v-model="showConfirmModal" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/models/cart/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import confirmModal from '@/views/home/cart/comps/confirmModal.vue';

const showConfirmModal = ref(false);

const cartStore = useCartStore();

const { cartItems, itemCount, totalPrice } = storeToRefs(cartStore);

const router = useRouter();
const goToCheckout = () => {
  router.push('/home/cart-flow/checkout');
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
