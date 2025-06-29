<template>
  <div
    :class="[
      'fixed left-0 top-0 z-50 w-full transition-all duration-300',
      isScrolled ? 'bg-neutral_600/90 backdrop-blur' : 'bg-neutral_600',
    ]"
  >
    <header
      class="font-['Noto Serif TC'] border-b-1 border-b-solid border-white/25% relative z-20 flex h-20 items-center px-6"
    >
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between">
        <!-- LOGO -->
        <router-link to="/home">
          <img src="@/assets/logo.png" alt="Butter&Sugar" class="h-8" />
        </router-link>

        <!-- 桌面版 nav -->
        <nav class="hidden max-w-[596px] items-center gap-4 md:flex">
          <router-link to="/home/course-info" class="p-2 text-white no-underline">
            探索課程
          </router-link>
          <div class="relative flex items-center">
            <baseInput type="text" placeholder="輸入關鍵字搜尋" class="w-75 leading-12 h-12" />
            <div
              class="i-ion:search-outline text-5 text-neutral_300 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            ></div>
          </div>
          <div
            class="relative flex h-10 w-10 cursor-pointer items-center justify-center"
            @click="handleCartToggle"
          >
            <div
              v-if="cartStore.itemCount > 0"
              class="w-4.5 h-4.5 bg-secondaryDefault text-3 absolute bottom-5 left-5 z-30 flex items-center justify-center rounded-full font-sans text-white shadow-md"
            >
              <span>{{ cartStore.itemCount }}</span>
            </div>
            <a href="#" class="p-2">
              <div class="i-ion:cart w-4.5 h-4.5 hover:bg-primaryDefault text-white"></div>
            </a>
          </div>
          <cartSidebar />
          <userAction />
        </nav>

        <!-- 手機版 icon 區 -->
        <div class="flex items-center gap-4 md:hidden">
          <!-- 購物車 -->
          <div
            class="relative flex h-10 w-10 cursor-pointer items-center justify-center"
            @click="handleCartToggle"
          >
            <cartSidebar />
            <a href="#" class="p-2">
              <div class="i-ion:cart w-4.5 h-4.5 hover:bg-primaryDefault text-white"></div>
            </a>
          </div>
          <!-- menu 漢堡 icon -->
          <div @click="toggleMobileMenu" class="text-6 cursor-pointer text-white">
            <div :class="isMobileMenuOpen ? 'i-ion:close' : 'i-ion:menu'"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- 手機版選單區 -->
    <template v-if="isMobileMenuOpen">
      <!-- ★ 透明遮罩：覆蓋整頁；點它就關閉 -->
      <div class="fixed inset-0 z-40 bg-black/20 md:hidden" @click="isMobileMenuOpen = false"></div>
      <!-- 選單本體：加定位 & @click.stop -->
      <div
        class="w-90% bg-neutral_600 fixed left-0 top-20 z-50 space-y-4 px-6 pb-4 text-white md:hidden"
        @click.stop
      >
        <!-- 搜尋列 -->
        <div class="border-b-1 border-b-solid relative border-b-white/20 px-6 py-4">
          <baseInput type="text" placeholder="輸入關鍵字搜尋" class="leading-12 h-12 w-full" />
          <div
            class="i-ion:search-outline text-5 text-neutral_300 absolute right-9 top-1/2 -translate-y-1/2"
          ></div>
        </div>

        <!-- 選單項目 -->
        <a
          href="/home/course-info"
          class="border-b-1 border-b-solid block border-b-white/20 px-6 py-6 text-white no-underline"
          >探索課程</a
        >
        <template v-if="userStore.isLoggedIn">
          <!-- 登入後展開選單 -->
          <div
            @click="toggleUserDropdown"
            class="flex cursor-pointer items-center justify-between px-6 py-6"
          >
            <userAction />
            <div>{{ userStore.name }}</div>
            <div
              :class="[
                isUserDropdownOpen ? 'i-ion:chevron-up' : 'i-ion:chevron-down',
                'text-primaryDefault',
              ]"
            ></div>
          </div>
          <div v-if="isUserDropdownOpen" class="space-y-2 pl-8">
            <userDropdownMenu />
          </div>
        </template>

        <template v-else>
          <div class="px-6 py-5 pb-2 text-white no-underline"><userAction /></div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import cartSidebar from './cartSidebar.vue';
import baseInput from '@/components/layout/baseInput.vue';
import userAction from './userAction.vue';
import { useCartStore } from '@/stores/models/cart/store';
import { useCartUIStore } from '@/stores/models/cart/uiStore';
import { useUserStore } from '@/stores/models/index';
import userDropdownMenu from './userDropdownMenu.vue';

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

// 使用者store
const userStore = useUserStore();

onMounted(async () => {
  await cartStore.getCart();
  await userStore.fetchUser();
  console.log('使用者權限', userStore.role); // 已擷取到權限teacher/student

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
