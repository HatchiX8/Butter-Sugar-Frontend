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
            <!-- 顯示多筆課程（多行） -->
            <ul
              v-if="Array.isArray(item.value) && item.value.length > 1"
              class="mt-1 pl-4"
            >
              <li v-for="(course, i) in item.value" :key="i"
                class="relative pl-4 before:content-[''] before:block  before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-primaryDefault">
                {{ course }}
              </li>
            </ul>
            <!-- 顯示單筆課程 or 一般文字（同行） -->
            <span v-else>
              {{
                Array.isArray(item.value)
                  ? item.value[0] ?? '-'
                  : item.value
              }}
            </span>
          </div>
        </div>
        <!-- 訂單狀態 -->
        <div class="flex items-center md:items-end md:justify-center md:justify-end text-5">
          <span class="inline-block w-5 h-5 i-ion:checkmark-circle mx-1 text-green-600"></span>
          <span>{{ orderStatus }}</span>
        </div>
      </div>
      <!-- <cartList
        :cartItems="cartItems"
        :itemCount="itemCount"
        :orderDetails="true"
      /> -->
    </div>
  </div>
<welcomeSection/>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useOrderStore } from '@/stores/models/orders/store';
import welcomeSection from '@/views/home/cart/comps/welcomeSection.vue';
// import cartList from '@/components/data/cartList.vue';

const formatCurrency = (value: number, currency = 'NT$'): string => `${currency} ${value.toLocaleString('en-US')}`;

// 取得訂單資料
const orderStore = useOrderStore();
onMounted(async () => {
  await orderStore.fetchOrders();
  await orderStore.fetchOrder();
});

const formatDatetime = (inputTime: string) => {
  const date = new Date(inputTime)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}`
};

// 訂單資料
const orderInfo = computed(() => [
  { label: '訂單編號', value: orderStore.order?.order_number ?? "" },
  { label: '訂單日期', value: formatDatetime(orderStore.order?.created_at ?? "") },
  // { label: '付款方式', value: "信用卡" },
  { label: '實付金額', value: formatCurrency(orderStore.order?.final_amount ?? 0) },
  { label: '課程名稱', value: orderStore.order?.course_name ?? []},
]);

const orderStatus = '完成付款';
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
