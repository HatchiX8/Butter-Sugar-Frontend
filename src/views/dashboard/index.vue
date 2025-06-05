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
    label: '課程資訊',
    key: 'course-info',
  },
  {
    label: '建立新課程',
    key: 'new-course',
  },
];
</script>
