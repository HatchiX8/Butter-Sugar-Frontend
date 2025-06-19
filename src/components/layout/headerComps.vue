<template>
  <div :class="['fixed top-0 left-0 w-full z-50 transition-all duration-300', isScrolled ? 'bg-neutral_600/90 backdrop-blur' : 'bg-neutral_600']">
    <header class="font-['Noto Serif TC'] border-b-1 border-b-solid border-white/25% flex h-20 items-center px-6 z-20 relative">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between">
        <!-- LOGO -->
        <router-link to="/home">
          <img src="@/assets/logo.png" alt="Butter&Sugar" class="h-8" />
        </router-link>

        <!-- 桌面版 nav -->
        <nav class="hidden md:flex items-center gap-4 max-w-[596px]">
          <a href="#" class="p-2 text-white no-underline">探索課程</a>
          <div class="relative flex items-center">
            <baseInput type="text" placeholder="輸入關鍵字搜尋" class="w-75 h-12 leading-12" />
            <div class="i-ion:search-outline absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-5 text-neutral_300"></div>
          </div>
          <div class="relative w-10 h-10 flex items-center justify-center cursor-pointer" @click="handleCartToggle">
            <div v-if="cartStore.itemCount > 0"
              class="absolute bottom-5 left-5 w-4.5 h-4.5 bg-secondaryDefault text-white text-3 rounded-full z-30 shadow-md flex items-center justify-center font-sans">
              <span>{{ cartStore.itemCount }}</span>
            </div>
            <a href="#" class="p-2">
              <div class="i-ion:cart w-4.5 h-4.5 text-white hover:bg-primaryDefault"></div>
            </a>
          </div>
          <cartSidebar />
          <userAction />
        </nav>

        <!-- 手機版 icon 區 -->
        <div class="flex md:hidden items-center gap-4">
          <!-- 購物車 -->
          <div class="relative w-10 h-10 flex items-center justify-center cursor-pointer" @click="handleCartToggle">
            <cartSidebar />
            <a href="#" class="p-2">
              <div class="i-ion:cart w-4.5 h-4.5 text-white hover:bg-primaryDefault"></div>
            </a>
          </div>
          <!-- menu 漢堡 icon -->
          <div @click="toggleMobileMenu" class="text-white text-6 cursor-pointer">
            <div :class="isMobileMenuOpen ? 'i-ion:close' : 'i-ion:menu'"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- 手機版選單區 -->
    <template v-if="isMobileMenuOpen">
      <!-- ★ 透明遮罩：覆蓋整頁；點它就關閉 -->
      <div class="fixed inset-0 z-40 md:hidden bg-black/20" @click="isMobileMenuOpen = false"></div>
      <!-- 選單本體：加定位 & @click.stop -->
      <div
        class="fixed top-20 left-0 w-90% bg-neutral_600 text-white
              px-6 pb-4 space-y-4 z-50 md:hidden"
        @click.stop
      >
    <!-- <div v-if="isMobileMenuOpen" class="md:hidden w-90% bg-neutral_600 text-white px-6 pb-4 space-y-4"> -->
        <!-- 搜尋列 -->
        <div class="relative px-6 border-b-1 border-b-solid border-b-white/20 py-4">
          <baseInput type="text" placeholder="輸入關鍵字搜尋" class="w-full h-12 leading-12" />
          <div class="i-ion:search-outline absolute right-9 top-1/2 -translate-y-1/2 text-5 text-neutral_300"></div>
        </div>

        <!-- 選單項目 -->
        <a href="#" class="block border-b-1 border-b-solid border-b-white/20 px-6 py-6 text-white no-underline">探索課程</a>

        <template v-if="userStore.isLoggedIn">
          <!-- 登入後展開選單 -->
          <div @click="toggleUserDropdown" class="flex items-center justify-between px-6 py-6 cursor-pointer">
            <userAction />
            <div>{{userStore.name}}</div>
            <div :class="[isUserDropdownOpen ? 'i-ion:chevron-up' : 'i-ion:chevron-down','text-primaryDefault',]"></div>
          </div>
          <div v-if="isUserDropdownOpen" class="pl-8 space-y-2">
            <UserDropdownMenu />
          </div>
        </template>

        <template v-else>
          <a href="/login" class="block border-b border-white/20 pb-2">登入 / 註冊</a>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import cartSidebar from './cartSidebar.vue';
import baseInput from '@/components/layout/baseInput.vue';
import { userAction } from '@/components/index';
import { useCartStore } from '@/stores/models/cart/store';
import { useCartUIStore } from '@/stores/models/cart/uiStore';
import { useUserStore } from '@/stores/models/index';
import UserDropdownMenu from './UserDropdownMenu.vue';

// 狀態
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const isUserDropdownOpen = ref(false);

// 購物車
const cartStore = useCartStore();
const uiCartStore = useCartUIStore();

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};
const handleCartToggle = () => {
  cartStore.getCart();
  uiCartStore.toggleCart();
};
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

// 模擬登入使用者（請替換）
const userStore = useUserStore();
console.log('userStore',userStore);

onMounted(() => {
  cartStore.getCart();
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(8px);
}
</style>
