<template>
  <div v-if="!userStore.isLoggedIn">
    <a href="#" class="cursor-pointer text-white no-underline" @click="onGoogleLogin">
      登入 / 註冊
    </a>
  </div>
  <div v-else class="">
    <n-avatar round :size="40" class="cursor-pointer" :src="userImage" @click="toggleDropdown" />
    <div v-if="showDropdown" class="w-150px absolute right-0 bg-black text-white shadow rounded z-50 mt-5">
      <userDropdownMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/models/index';
import axios from 'axios';
import userDropdownMenu from './userDropdownMenu.vue';

const userStore = useUserStore();
const API_BASE = import.meta.env.VITE_API_URL;

const userImage = ref('');
const fetchData = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/v1/users/info`, {
      headers: { Authorization: `Bearer ${userStore.userToken}` },
    });
    userImage.value = res.data.data.profile_image_url;
  } catch (err) {
    console.error('取得學生資料失敗', err);
  }
};

const onGoogleLogin = () => {
  window.location.href = `${API_BASE}/api/v1/users/auth/google`;
};

const showDropdown = ref(false);
const toggleDropdown = () => (showDropdown.value = !showDropdown.value);

onMounted(() => {
  fetchData();
});
</script>
