<template>
  <div>登入成功跳轉中...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/models/user/userStore';
import axios from 'axios';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

onMounted(async() => {
  // 從網址取得 JWT token
  const token = route.query.token as string;
  const id = route.query.id as string;
  console.log('>>> OAuth callback, token =', token, 'id =', id)
  if (!token || !id) return router.replace('/')

  userStore.setToken(token)
  userStore.setUserId(id)
  
  localStorage.setItem('access_token', token)
  localStorage.setItem('userId', id)

  try {
    // const res = await axios.get(
    //   `https://buttersuger-frontend.zeabur.app/api/v1/users/${id}`,
    //   { headers: { Authorization: `Bearer ${token}` } }
    // )
    // userStore.setAvatar(res.data.profile_image_url)
    // localStorage.setItem('avatarUrl', res.data.profile_image_url)

    router.replace('/Home');
  } catch (e) {
    console.error('取得完整用戶資料失敗', e)
    router.replace('/Home');
  }


  
});
</script>
