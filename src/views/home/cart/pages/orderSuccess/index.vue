<!-- 訂購完成頁面 -->
<template>
  <div class="text-white">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between text-white p-4 gap-4">
        <!-- 訂單資訊 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 flex-1">
          <div v-for="(item, index) in orderInfo" :key="index"
            class="border rounded text-base p-2">
            <span>{{ item.label }}：</span>
            <span>{{ item.value }}</span>
          </div>
        </div>
        <!-- 訂單狀態 -->
        <div class="flex items-center md:items-end md:justify-center md:justify-end text-5">
          <span class="inline-block w-5 h-5 i-ion:checkmark-circle mx-1 text-green-600"></span>
          <span>{{ orderStatus }}</span>
        </div>
      </div>
      <cartList
        :cartItems="cartItems"
        :itemCount="itemCount"
        :orderDetails="true"
      />
    </div>
  </div>
<welcomeSection/>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/models/cart/store';
import { storeToRefs } from 'pinia';
import welcomeSection from '@/views/home/cart/comps/welcomeSection.vue';
import cartList from '@/components/data/cartList.vue';

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
