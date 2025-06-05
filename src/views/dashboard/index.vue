<template>
  <div>講師頁面</div>
  <div class="h-100dvh flex flex-col md:flex-row">
    <div class="w-full md:w-1/4">
      <n-menu :root-indent="36" :indent="12" :options="menuOptions" />
    </div>
    <div class="flex-1 overflow-auto"><router-view /></div>
  </div>
</template>
<script setup lang="ts">
const menuOptions: MenuOption[] = [
  {
    label: '基本資訊',
    key: 'basic-info',
  },
  {
    label: '教師資訊',
    key: 'teacher-info',
  },
  {
    label: '課程資訊',
    key: 'course-info',
    children: [
      {
        type: 'group',
        label: '建立新課程',
        key: 'people',
      },
      {
        label: '新增課程章節',
        key: 'beverage',
      },
      {
        label: '定價&提交審核',
        key: 'food',
      },
    ],
  },
];
</script>
