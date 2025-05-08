<template>
  <div v-if="userStore.isLoggedIn === false">
    <a href="#" class="cursor-pointer text-white no-underline" @click="onGoogleLogin">登入</a>
  </div>
  <n-dropdown v-else :options="options" @select="handleSelect">
    <n-avatar
      round
      :size="32"
      class="cursor-pointer"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </n-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/models/index';
import { useRouter } from 'vue-router';

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
  }
};
</script>
