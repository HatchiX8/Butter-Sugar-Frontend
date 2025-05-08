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

  try{
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/users/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const avatar = res.data.data.profile_image_url
    userStore.setAvatar(avatar)                // <-- 把頭像 url 存到 Pinia
    localStorage.setItem('avatarUrl', avatar)  // <--（可選）也存在 localStorage
    router.replace('/Home')
  }catch(err){
    console.error('取得完整用戶資料失敗', err)
    return router.replace('/login')
  }

  
});
</script>
