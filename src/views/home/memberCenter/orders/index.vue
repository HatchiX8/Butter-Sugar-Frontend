<template>
  <div class="w-80% max-w-200 mx-auto mb-20">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '學生會員中心', to: '/home/memberCenter/profile' },
        { label: '訂單紀錄' }
      ]"
    />
    <typography variant="h2" font-type="title" underline class="my-8 text-white">
      訂單紀錄
    </typography>
    <n-select
      v-model:value="value"
      :options="options"
      placeholder="所有訂單"
      class="w-20% mb-6 ml-auto"
    />
    <n-data-table
      :columns="columns"
      :data="filteredOrders"
      :bordered="true"
      :pagination="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useOrderStore } from '@/stores/models/orders/store';
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import typography from '@/components/layout/typography.vue';
import type { Orders } from '@/api/orders/types';

// 下拉選項
const options = [
  { label: '2025年', value: '2025' },
  { label: '2024年', value: '2024' },
  { label: '2023年', value: '2023' },
  { label: '2023以前', value: '' }
];
const value = ref(options[0].value);

// 取得訂單資料
const orderStore = useOrderStore();
onMounted(async () => {
  await orderStore.fetchOrders();
});

// 篩選資料
const filteredOrders = computed(() =>
  value.value
    ? orderStore.orders.filter(order => order.created_at.startsWith(value.value))
    : orderStore.orders
);

// 欄位定義
const columns = [
  {
    title: '訂單編號',
    key: 'order_number',
    render: (row: Orders) => row.order_number
  },
  {
    title: '課程名稱',
    key: 'course_name',
    render: (row: Orders) => row.course_name.join(', ')
  },
  {
    title: '金額',
    key: 'final_amount',
    render: (row: Orders) => `$${row.final_amount}`
  },
  {
    title: '日期',
    key: 'created_at',
    render: (row: Orders) => formatDatetime(row.created_at)
  },
  {
    title: '狀態',
    key: 'status',
    render: () => '已完成'
  }
];

const formatDatetime = (inputTime: string) => {
  const date = new Date(inputTime)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}`
};
</script>
