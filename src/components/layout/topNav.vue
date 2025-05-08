<template>
  <header class="fw-400 font-['Noto Serif TC'] px-6 py-3 text-white">
    <div class="header-box flex items-center justify-between">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/logo.png" alt="Butter&Sugar" class="h-8" />
        </router-link>
      </div>
      <nav class="desktop-nav text-size-14px flex items-center gap-4">
        <router-link to="/search" class="">探索課程</router-link>
        <div class="search-box">
          <n-input
            type="text"
            placeholder="輸入關鍵字搜尋"
            class="w-300px h-48px border-none bg-[#0D0B07] text-[#9E9E9E]"
            style="--n-border: none"
          />
          <div class="search-icon-box">
            <span class="ion--search"></span>
          </div>
        </div>

        <router-link to="/cart" class="cart">
          <span class="ion--cart"></span>
        </router-link>

        <div class="login-area">
          <!-- 未登入時顯示登入按鈕 -->
          <loginComps v-if="!isLoggedIn" />
          <!-- 已登入時 avatar + 下拉選單 -->

          <div v-else ref="menuRoot" class="relative">
            <img
              :src="userAvatar"
              @click="toggleMenu"
              alt="avatar"
              class="avatar h-10 w-10 cursor-pointer rounded-full object-cover"
            />

            <!-- 下拉選單 -->
            <ul
              v-show="showMenu"
              @click="showMenu = false"
              class="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded bg-white text-black shadow-lg"
            >
              <li
                class="cursor-pointer px-4 py-2 hover:bg-gray-100"
                @click="go('/student/my-courses')"
              >
                我的課程
              </li>
              <li class="cursor-pointer px-4 py-2 hover:bg-gray-100" @click="go('/home/student')">
                學生資料管理
              </li>
              <li class="cursor-pointer px-4 py-2 hover:bg-gray-100" @click="go('/student/orders')">
                訂單紀錄
              </li>
              <li class="cursor-pointer px-4 py-2 hover:bg-gray-100" @click="logout">登出</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import loginComps from '@/components/feedback/misc/loginComps.vue';
import { useUserStore } from '@/stores/models/user/userStore';

// Pinia store
const userStore = useUserStore();

// router helper
const router = useRouter();

// 控制下拉
const showMenu = ref(false);
function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function go(path: string) {
  showMenu.value = false;
  router.push(path);
}
function logout() {
  showMenu.value = false;
  userStore.logout();
  router.replace('/');
}

// Avatar 狀態
const isLoggedIn = computed(() => !!userStore.token);
const userAvatar = computed(() => userStore.avatarUrl || '/assets/images/avatar.png');

// 取得根節點，監聽外部點擊 // 點外面要關掉
const menuRoot = ref<HTMLElement | null>(null);
function onClickOutside(e: MouseEvent) {
  if (menuRoot.value && !menuRoot.value.contains(e.target as Node)) {
    showMenu.value = false;
  }
}

onMounted(async () => {
  document.addEventListener('click', onClickOutside);

  const token = localStorage.getItem('access_token');
  if (!token) {
    // 沒 token，不做任何事（未登入狀態）
    return;
  }
  try {
    // 驗證 token
    await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/check`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // 驗證 OK，再把 token 寫回 Pinia
    userStore.setToken(token);
    // 之前有存在 avatarUrl，也同步到 store
    const avatar = localStorage.getItem('avatarUrl');
    if (avatar) userStore.setAvatar(avatar);
  } catch {
    // 驗證失敗，直接登出、清除
    userStore.logout();
  }
});
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<style scoped>
/* UnoCSS */
a {
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
}
header {
  border-bottom: 1px solid #fffdfa40;
}
.header-box {
  max-width: 1280px;
  margin: 0 auto;
}
.n-input .n-input-wrapper {
  width: 300px;
}
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.search-icon-box {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.b-full {
  background: #0d0b07;
  border: none;
}
.ion--search {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23575656' d='M456.69 421.39L362.6 327.3a173.8 173.8 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.8 173.8 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8'/%3E%3C/svg%3E");
}
.ion--cart {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Ccircle cx='176' cy='416' r='32' fill='%23fffdfa'/%3E%3Ccircle cx='400' cy='416' r='32' fill='%23fffdfa'/%3E%3Cpath fill='%23fffdfa' d='M456.8 120.78a23.92 23.92 0 0 0-18.56-8.78H133.89l-6.13-34.78A16 16 0 0 0 112 64H48a16 16 0 0 0 0 32h50.58l45.66 258.78A16 16 0 0 0 160 368h256a16 16 0 0 0 0-32H173.42l-5.64-32h241.66A24.07 24.07 0 0 0 433 284.71l28.8-144a24 24 0 0 0-5-19.93'/%3E%3C/svg%3E");
}
.avatar {
  display: block;
  width: 40px;
  height: 40px;
  background: url('@/assets/images/avatar.png');
  background-size: cover;
  border-radius: 50%;
}
</style>
