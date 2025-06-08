<template>
  <div class="text-white">講師頁面</div>
  <div class="h-100dvh flex flex-col md:flex-row">
    <div class="w-full md:w-1/4">
      <n-menu
        :root-indent="36"
        :indent="12"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuSelect"
      />
    </div>
    <div class="flex-1 overflow-auto"><router-view /></div>
  </div>
</template>
<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeKey = ref<string>('BasicInfo');

const menuOptions: MenuOption[] = [
  {
    label: '基本資訊',
    key: 'BasicInfo',
  },
  {
    label: '課程資訊',
    key: 'CourseInfo',
  },
  {
    label: '建立新課程',
    key: 'courseAction/addCourse',
  },
];

const handleMenuSelect = (key: string) => {
  activeKey.value = key;
  router.push(`/Teacher/${key}`);
};
</script>
