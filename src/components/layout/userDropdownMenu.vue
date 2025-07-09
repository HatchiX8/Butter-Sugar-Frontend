<template>
  <ul class="space-y-2">
    <li
      v-for="option in userOptions"
      :key="option.key"
      @click="handleSelect(option.key)"
      class="hover:nounderline hover:bg-primaryDefault cursor-pointer px-4 py-3 text-white"
    >
      {{ option.label }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/models/index';
import { computed } from 'vue';

const router = useRouter();
const userStore = useUserStore();

// 選單資料
interface MenuOption {
  label: string;
  key: string;
}

const studentOptions: MenuOption[] = [
  { label: '我的課程', key: 'myCourse' },
  { label: '學生資料管理', key: 'studentProfile' },
  { label: '訂單紀錄', key: 'orders' },
  { label: '登出', key: 'logout' },
];

const teacherOptions: MenuOption[] = [
  // { label: '教師儀表板', key: 'revenue' },
  { label: '我的課程', key: 'myCourse' },
  { label: '課程管理', key: 'dashboard' },
  { label: '教師資料管理', key: 'teacherProfile' },
  { label: '訂單紀錄', key: 'orders' },
  { label: '登出', key: 'logout' },
];

const adminOptions: MenuOption[] = [
  // { label: '教師儀表板', key: 'revenue' },
  { label: '教師申請審核', key: 'teacherApplication' },
  { label: '我的課程', key: 'myCourse' },
  { label: '課程管理', key: 'dashboard' },
  { label: '教師資料管理', key: 'teacherProfile' },
  { label: '訂單紀錄', key: 'orders' },
  { label: '登出', key: 'logout' },
];

// 根據角色決定選單
const userOptions = computed(() =>
  userStore.role === 'teacher' ? teacherOptions : userStore.role === 'admin' ? adminOptions : studentOptions
);

// 點選選項時導頁或登出
const handleSelect = (key: string) => {
  switch (key) {
    case 'myCourse':
      router.push('/home/my-course');
      break;
    case 'studentProfile':
      router.push('/home/memberCenter/profile');
      break;
    case 'orders':
      router.push('/home/memberCenter/orders');
      break;
    case 'revenue':
      router.push('/teacher/memberCenter/revenue');
      break;
    case 'dashboard':
      router.push('/teacher/courseInfo');
      break;
    case 'teacherProfile':
      router.push('/teacher/basicInfo');
      break;
    case 'logout':
      userStore.logout();
      router.push('/home');
      break;
    case 'teacherApplication':
      router.push('/admin/teacherManage');
      break;
    default:
      router.push('/home');
  }
};
</script>
<style></style>
