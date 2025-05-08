<template>
  <div>登入成功跳轉中...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/models/user/userStore';
import axios from 'axios'


const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

onMounted(async() => {
  // 從網址取得 JWT token
  const token = route.query.token as string;
  const id = route.query.id as string;
  console.log('>>> OAuth callback, token =', token, 'id =', id)
  if (!token || !id) {
    return router.replace('/Home')
  }

  userStore.setToken(token)
  userStore.setUserId(id)
  
  localStorage.setItem('access_token', token)
  localStorage.setItem('userId', id)

  return router.replace('/Home')

  
});
</script>
