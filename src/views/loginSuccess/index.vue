<template>
  <div>登入成功跳轉中...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

onMounted(() => {
  // 從網址取得 JWT token
  const token = route.query.token as string;

  if (token) {
    // 寫入 localStorage
    localStorage.setItem('access_token', token);

    // 跳轉至首頁
    router.replace('/home');
  } else {
    // 沒有 token，跳轉回登入頁
    router.replace('/login');
  }
});
</script>
