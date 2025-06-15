<template>
  <div class="px-5 text-white mb-15">
    <div class="flex justify-between">
      <typography variant="h4" font-type="title" class="text-white -mt-10 mb-5">
        所有課程
      </typography>
      <p class="text-8"></p>
      <button class="bg-primaryDefault text-white border-none rounded-md px-4">建立新課程</button>
    </div>
    <n-divider />
    <div class="w-full">
      <n-data-table :columns="columns" :data="data" :pagination :bordered="false"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';
import { NButton, useMessage } from 'naive-ui';
import { h } from 'vue';
import { ref } from 'vue';
import typography from '@/components/layout/typography.vue';

interface Song {
  no: number;
  title: string;
  status: string;
}

const message = useMessage();

const edit = (row: Song) => {
  message.info(`編輯 ${row.title}`);
};

const remove = (row: Song) => {
  message.info(`下架 ${row.title}`);
};

const createColumns = (): DataTableColumns<Song> => [
  {
    title: 'No',
    key: 'no',
  },
  {
    title: '課程名稱',
    key: 'title',
  },
  {
    title: '狀態',
    key: 'status',
  },
  {
    title: '編輯/下架',
    key: 'actions',
    render(row) {
      return h(
        'div',
        { style: 'display: flex; gap: 8px;' }, // 可以加點間距
        [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              type: 'warning',
              onClick: () => edit(row),
            },
            { default: () => '編輯' }
          ),
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              type: 'error',
              onClick: () => remove(row),
            },
            { default: () => '下架' }
          ),
        ]
      );
    },
  },
  {
    title: '定價&提交審核',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: 'small',
          type: 'warning',
          onClick: () => edit(row),
        },
        { default: () => '編輯' }
      );
    },
  },
];

const data = ref<Song[]>([
  { no: 1, title: '職人級！一次掌握歐式麵包的高水量與發酵秘訣', status: '未送出審核' },
  { no: 2, title: '法式經典｜酥脆外皮、柔軟內裡的完美法國麵包', status: '審核中' },
  { no: 3, title: '秒殺人氣！學會製作超鬆軟爆漿奶油', status: '已上架' },
  { no: 4, title: '零基礎也能成功！手揉麵包入門全攻略', status: '未上架' },
  { no: 5, title: '香濃﻿奶油香氣四溢！手作日式生吐司', status: '未上架' },
]);

const columns = ref(createColumns());
const pagination = false;
</script>
<style scoped>
:deep(.n-data-table) {
  width: 100% !important;
  min-width: 0 !important;
}
:deep(.n-data-table th, .n-data-table td) {
  min-width: 0 !important;
  white-space: normal;
  word-break: break-all;
}
:deep(.n-data-table-wrapper) {
  width: 100% !important; /* 確保 wrapper 也填滿 */
}
</style>