<template>
  <div>登入成功跳轉中...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/models/user/userStore';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  // 從網址取得 JWT token
  const token = route.query.token as string;
  const id = route.query.id as string;

  if (token && id) {
    // 寫入 localStorage
    userStore.setToken(token)
    userStore.setUserId(id)
    localStorage.setItem('access_token', token)
    localStorage.setItem('userId', id)

    // 跳轉至首頁
    router.replace('/home');
  } else {
    // 沒有 token，跳轉回登入頁
    router.replace('/login');
  }
});
</script>
