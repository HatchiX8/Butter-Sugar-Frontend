<template>
  <div class="w-80% max-w-200 mx-auto mb-20">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '學生會員中心', to: '/home/memberCenter/profile' },
        { label: '訂單紀錄' },
      ]"
    />
    <typography variant="h2" font-type="title" underline class="mb-8 text-white">訂單紀錄</typography>
    <n-select v-model:value="value" :options="options" placeholder="所有訂單" class="w-20% mb-6 ml-auto"/>
      <n-data-table
        :columns="columns"
        :data="orders"
        :bordered="true"
        :pagination="false"
      />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import typography from '@/components/layout/typography.vue';

// 篩選下拉
const options = [
  { label: '2025年', value: '2025' },
  { label: '2024年', value: '2024' },
  { label: '2023年', value: '2023' },
  { label: '2023以前', value: '' }
];
const value = ref(options[0].value);

// 表格
type Order = {
  id: string
  courseName: string
  amount: string
  date: string
  status: string
};

const orders: Order[] = [
  {
    id: '0000000001',
    courseName: '零基礎也能成功！手揉麵包入門全攻略',
    amount: '5800',
    date: '2025-01-21 00:00:00',
    status: '已付款',
  },
  {
    id: '0000000003',
    courseName: '職人級！一次掌握歐式麵包的高水量與發酵秘訣',
    amount: '4200',
    date: '2025-01-21 00:00:00',
    status: '已付款',
  },
]

const columns = [
  {
    title: '訂單編號',
    key: 'id',
  },
  {
    title: '課程名稱',
    key: 'courseName',
  },
  {
    title: '金額',
    key: 'amount',
  },
  {
    title: '日期',
    key: 'date',
  },
  {
    title: '狀態',
    key: 'status',
  },
]
</script>
