<template>
  <header class=" px-6 py-3 fw-400 text-white font-['Noto Serif TC'] ">
    <div class="header-box flex items-center justify-between">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/logo.png" alt="Butter&Sugar" class="h-8" />
        </router-link>
      </div>
      <nav class="desktop-nav flex items-center gap-4 text-size-14px">
        <router-link to="/search" class="">探索課程</router-link>
        <div class="search-box">
            <n-input type="text" placeholder="輸入關鍵字搜尋" class="bg-[#0D0B07] border-none w-300px h-48px text-[#9E9E9E]" style="--n-border: none;"/>
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
          <!-- 已登入時顯示頭像 -->
          <router-link v-else to="/student">
            <img :src="userAvatar" alt="avatar" class="avatar" />
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import loginComps from '@/components/feedback/misc/loginComps.vue'
const userAvatar = ref(localStorage.getItem('userAvatar') || '')
const isLoggedIn = computed(() => userAvatar.value !== '')
</script>

<style scoped>
/* UnoCSS */
a{
  @apply text-white;
  text-decoration: none;
  &:hover{
    text-decoration: none;
  }
}
header{
  border-bottom: 1px solid #FFFDFA40;
}
.header-box{
  max-width: 1280px;
  margin: 0 auto;
}
.n-input .n-input-wrapper{
  width: 300px;
}
.search-box{
  @apply flex justify-between items-center relative;
}
.search-icon-box{
  @apply absolute right-2 top-1/2 -translate-y-1/2;
  cursor: pointer;
}
.b-full{
  background: #0D0B07;
  border: none
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
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Ccircle cx='176' cy='416' r='32' fill='%23fffdfa'/%3E%3Ccircle cx='400' cy='416' r='32' fill='%23fffdfa'/%3E%3Cpath fill='%23fffdfa' d='M456.8 120.78a23.92 23.92 0 0 0-18.56-8.78H133.89l-6.13-34.78A16 16 0 0 0 112 64H48a16 16 0 0 0 0 32h50.58l45.66 258.78A16 16 0 0 0 160 368h256a16 16 0 0 0 0-32H173.42l-5.64-32h241.66A24.07 24.07 0 0 0 433 284.71l28.8-144a24 24 0 0 0-5-19.93'/%3E%3C/svg%3E");
}
.avatar{
  @apply block w-40px h-40px;
  background: url('@/assets/images/avatar.png');
  background-size: cover;
  border-radius: 50%;
}
</style>
