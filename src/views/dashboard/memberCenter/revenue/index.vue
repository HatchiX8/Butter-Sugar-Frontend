<template>
  <div class="w-80% max-w-200 mx-auto mb-20">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '教師會員中心', to: '/teacher/memberCenter/revenue' },
      ]"
    />
    <typography variant="h2" font-type="title" underline class="my-8 text-white">教師會員中心</typography>
    <div class="p-4">
      <!-- 圓餅圖 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <n-card v-for="(item, index) in pieCharts" :key="index" :title="item.title">
          <div :data="item.data"></div>
        </n-card>
      </div>

      <!-- 總計 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <n-card v-for="(card, index) in summaryCards" :key="index">
          <div class="text-6 font-bold">{{ card.value }}</div>
        </n-card>
      </div>

      <!-- 表格 -->
      <div>
        <n-card title="總收益">
          <n-data-table :columns="columns" :data="courses" :bordered="true" :pagination="false" />
          <div class="text-right mt-4">
            <baseButton label="下載報表" type="primary"/>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import baseButton from '@/components/layout/baseButton.vue';
import typography from '@/components/layout/typography.vue';

const pieCharts = [
  {
    title: '總收益',
    data: [
      { value: 40, name: 'A' },
      { value: 30, name: 'B' },
      { value: 30, name: 'C' },
    ],
  },
  {
    title: '銷售課程數',
    data: [
      { value: 50, name: 'X' },
      { value: 20, name: 'Y' },
      { value: 30, name: 'Z' },
    ],
  },
  {
    title: '學員數',
    data: [
      { value: 57, name: 'G' },
      { value: 22, name: 'H' },
      { value: 21, name: 'I' },
    ],
  },
];

const summaryCards = [
  { label: '總收益', value: '1000' },
  { label: '評價', value: '5.0' },
  { label: '銷售課程數', value: '100' },
  { label: '開設課程數', value: '7'},
];

const columns = [
  { title: '課程名稱', key: 'courseName' },
  { title: '金額', key: 'amount' },
  { title: '手續費', key: 'fee' },
  { title: '淨收益', key: 'net' },
  { title: '日期', key: 'date' },
  { title: '學生數', key: 'students' },
];

const courses = [
  {
    courseName: '零基礎也能成功！手揉麵包入門全攻略',
    amount: '5800',
    fee: '100',
    net: '5700',
    date: '2025/03/01',
    students: 100,
  },
  {
    courseName: '職人級！一次掌握歐式麵包的高水量與發酵秘訣',
    amount: '4200',
    fee: '100',
    net: '4100',
    date: '2025/03/01',
    students: 100,
  },
];
</script>
