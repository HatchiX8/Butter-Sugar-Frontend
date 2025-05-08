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

  // try {
  //   // 呼叫驗證 API
  //   await axios.get(
  //     `${import.meta.env.VITE_API_URL}/api/v1/users/check`,
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   )
  //   // 驗證成功，可從 localStorage 拿 avatarUrl
  //   const avatarUrl = localStorage.getItem('avatarUrl')
  //   if (avatarUrl) userStore.setAvatar(avatarUrl)

  //   router.replace('/Home');
  // } catch (e) {
  //   console.error('取得完整用戶資料失敗', e)
  //   router.replace('/Home');
  // }
  return router.replace('/Home')

  
});
</script>
