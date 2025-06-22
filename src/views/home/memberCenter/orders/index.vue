<template>
  <div class="w-80% max-w-200 md:max-w-[1280px] mx-auto mb-20">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '學生會員中心', to: '/home/memberCenter/profile' },
        { label: '訂單紀錄' }
      ]"
    />
    <typography variant="h2" font-type="title" underline class="text-white mb-8">訂單紀錄</typography>
    <n-select v-model:value="value" :options="options" placeholder="所有訂單" class="w-20% mb-6 ml-auto"/>
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
  try {
    const formatter = new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Taipei'
    });

    const formatted = formatter.format(new Date(inputTime)).replace(/\//g, '-'); // 把字串中 所有的 / 字元 換成 -
    return formatted;
  } catch (error) {
    console.warn('時間格式化失敗，回傳原始值：', inputTime, error)
    return inputTime;
  }
};
</script>
