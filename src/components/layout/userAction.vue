<template>
  <div v-if="!userStore.isLoggedIn">
    <a href="#" class="cursor-pointer text-white no-underline" @click="onGoogleLogin">
      登入 / 註冊
    </a>
  </div>
  <div v-else ref="dropdownRef" class="relative inline-block" @click.stop>
    <n-avatar round :size="40" class="cursor-pointer" :src="userImage" @click="toggleDropdown" />
    <div
      v-if="showDropdown"
      class="w-150px absolute right-0 z-50 mt-5 rounded bg-black text-white shadow"
    >
      <userDropdownMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useUserStore } from '@/stores/models/index';
import axios from 'axios';
import userDropdownMenu from './userDropdownMenu.vue';
// import { useRouter } from 'vue-router'
// const router = useRouter()

const userStore = useUserStore();
const API_BASE = import.meta.env.VITE_API_URL;
const onGoogleLogin = () => {
  window.location.href = `${API_BASE}/api/v1/users/auth/google`;
};

const userImage = ref('');
const fetchData = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/v1/users/info`, {
      headers: { Authorization: `Bearer ${userStore.userToken}` },
    });
    userImage.value = userStore.profileImageUrl || res.data.data.profile_image_url;
  } catch (err) {
    console.error('取得學生資料失敗', err);
  }
};

const showDropdown = ref(false);
const toggleDropdown = () => (showDropdown.value = !showDropdown.value);

/* -------------- click-outside ---------------- */
const dropdownRef = ref<HTMLElement | null>(null);
const handleClickOutside = (e: MouseEvent) => {
  if (!showDropdown.value) return; // 已收合就不判斷
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    showDropdown.value = false; // 點到外部 → 收合
  }
};
onMounted(() => {
  fetchData();
  document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>
