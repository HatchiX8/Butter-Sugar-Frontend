<!-- 訂購完成頁面 -->
<template>
  <div class="text-white">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex justify-between text-white p-4">
        <!-- 訂單資訊 -->
        <div class="grid grid-cols-2 gap-x-10 gap-y-2">
          <div v-for="(item, index) in orderInfo" :key="index"
            class="border rounded text-base">
            <span>{{ item.label }}：</span>
            <span>{{ item.value }}</span>
          </div>
        </div>
        <!-- 訂單狀態 -->
        <div class="flex items-end text-5">
          <span class="inline-block w-5 h-5 i-ion:checkmark-circle mx-1 text-green-600"></span>
          <span>{{ orderStatus }}</span>
        </div>
      </div>
      <div class="flex-1 bg-neutral_600 border-1 border-solid border-white/10% p-4 rounded-0.5">
        <div class="p-4 mb-4">
          <div>
            <h2 class="font-bold text-6">訂單明細</h2>
            <div class="mt-4 w-14 h-0.1 bg-primaryDefault"></div>
          </div>
          <div class="font-['Noto Sans TC'] text-primaryDefault text-4 text-right">總共 {{ itemCount }} 件</div>
        </div>
        <div v-for="(item, index) in visibleItems" :key="item.course_id" class="p-4">
          <div class="flex items-start gap-4 pb-4"
            :class="{ 'custom-border-bottom': index !== visibleItems.length - 1 }">
            <router-link :to="`/home/course/${item.course_id}`"
              class="flex flex-1 items-start gap-4 cursor-pointer no-underline group">
              <!-- 課程圖片 -->
              <div
                class="shrink-0 w-36 h-24 overflow-hidden rounded-md transition-shadow duration-300 group-hover:shadow-lg">
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
            </div>
          </div>
        </div>
        <div v-if="cartItems.length > 2" class="flex justify-center mt-4 cursor-pointer" @click="toggleExpanded">
          <span>{{ expanded ? '收合內容' : '查看更多' }}</span>
          <span class="inline-block align-middle w-3.5 h-3.5 px-1" :class="[expanded ? 'i-ion:chevron-up' : 'i-ion:chevron-down']"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/models/cart/store';
import { storeToRefs } from 'pinia';

const formatCurrency = (value: number, currency = 'NT$'): string => `${currency} ${value.toLocaleString('en-US')}`;

// 模擬訂單資料
const orderInfo = [
  { label: '訂單編號', value: "ORD20250329182000001" },
  { label: '訂單日期', value: "2025-03-29 18:20" },
  { label: '付款方式', value: "信用卡" },
  { label: '實付金額', value: formatCurrency(17560) }
];
const orderStatus = '完成付款';

// 暫時用購物車資料測試，實際應該從訂單資料中獲取
const cartStore = useCartStore();
const { cartItems, itemCount } = storeToRefs(cartStore);

// 控制展開明細
const expanded = ref(false);
const visibleItems = computed(() =>
  expanded.value ? cartItems.value : cartItems.value.slice(0, 2)
);
const toggleExpanded = () => {
  expanded.value = !expanded.value
};

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
