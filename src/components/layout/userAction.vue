<template>
  <div v-if="userStore.isLoggedIn === false">
    <a href="#" class="cursor-pointer text-white no-underline" @click="onGoogleLogin">登入/註冊</a>
  </div>
  <n-dropdown v-else :options="userOptions" @select="handleSelect">
    <n-avatar round :size="40" class="cursor-pointer" :src="userImage" />
  </n-dropdown>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useUserStore } from '@/stores/models/index';
import { useRouter } from 'vue-router';

import axios from 'axios';

const userStore = useUserStore();
const router = useRouter();

// ----------第三方登入----------
const API_BASE = import.meta.env.VITE_API_URL;
const onGoogleLogin = () => {
  window.location.href = `${API_BASE}/api/v1/users/auth/google`;
};

// ----------登入後選單----------
interface MenuOption {
  label: string;
  key: string;
};
const studentOptions: MenuOption[] = [
  { label: '我的課程', key: 'myCourse' },
  { label: '學生資料管理', key: 'studentProfile'  },
  { label: '訂單紀錄', key: 'orders',  },
  { label: '登出', key: 'logout' },
];
const teacherOptions: MenuOption[] = [
  { label: '教師儀表板', key: 'revenue' },
  { label: '課程管理', key: 'dashboard'  },
  { label: '教師資料管理', key: 'teacherProfile'  },
  { label: '登出', key: 'logout' },
];

// 根據角色取得選單
const userOptions = computed<MenuOption[]>(() =>
  userStore.role === 'teacher' ? teacherOptions : studentOptions
);

const handleSelect = (key: string) => {
  switch (key) {
    case 'myCourse':
      router.push({ name: 'MyCourse' });
      break;
    case 'studentProfile':
      router.push({ name: 'StudentProfile' });
      break;
    case 'orders':
      router.push({ name: 'Orders' });
      break;
    case 'revenue':
      router.push({ name: 'Revenue' });
      break;
    case 'dashboard':
      router.push({ name: 'CourseInfo' });
      break;
    case 'teacherProfile':
      router.push({ name: 'TeacherProfile' });
      break;
    case 'logout':
      userStore.logout();
      router.push({ name: 'HomeDashboard' });
      break;
    default:
      router.push({ name: 'HomeDashboard' });
  }
};

const userImage = ref('');
// 讀取學生資料
const fetchData = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/info`, {
      headers: { Authorization: `Bearer ${userStore.userToken}` },
    });
    userImage.value = res.data.data.profile_image_url;
    console.log('info', res);
  } catch (err) {
    console.error('取得學生資料失敗', err);
  }
};

onMounted(() => {
  fetchData();
});
</script>
