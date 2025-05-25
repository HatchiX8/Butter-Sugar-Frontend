<template>
  <div v-if="userStore.isLoggedIn === false">
    <a href="#" class="cursor-pointer text-white no-underline" @click="onGoogleLogin">登入/註冊</a>
  </div>
  <n-dropdown v-else :options="options" @select="handleSelect">
    <n-avatar round :size="40" class="cursor-pointer" :src="userImage" />
  </n-dropdown>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
const options = [
  { label: '我的課程', key: 'course' },
  { label: '個人資料', key: 'student' },
  { label: '訂單記錄', key: 'order' },
  { label: '登出', key: 'logout' },
];

const handleSelect = (key: string) => {
  switch (key) {
    case 'course':
      router.push('/home/course');
      break;
    case 'student':
      router.push('/home/student');
      break;
    case 'logout':
      // 登出邏輯（清除 token / 跳轉登入頁）
      userStore.logout();
      router.push('/home');
      break;
    default:
      router.push('/home');
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
