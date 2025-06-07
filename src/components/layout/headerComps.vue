<template>
    <div class="fixed top-0 left-0 w-full z-50 shadow-md bg-neutral_600">
      <header
      class="font-['Noto Serif TC'] border-b-solid border-b-1 border-b-white/25% flex h-20 items-center px-6 z-20 relative"
>
        <div class="mx-auto flex w-full max-w-7xl items-center justify-between">
          <router-link to="/home">
            <img src="@/assets/logo.png" alt="Butter&Sugar" class="h-8" />
          </router-link>

          <nav class="flex max-w-[596px] items-center gap-4">
            <a href="#" class="p-2 text-white no-underline">探索課程</a>
            <div class="pos-relative flex items-center justify-between">
              <baseInput
                type="text"
                placeholder="輸入關鍵字搜尋"
                class="w-300px h-48px leading-[48px]"
              />
              <div
                class="i-ion:search-outline pos-absolute text-5 text-neutral_300 right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              ></div>
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
        </div>
      </header>
    </div>
  </template>

<script setup lang="ts">
import { userAction } from '@/components/index';
import cartSidebar from './cartSidebar.vue';
import { useCartStore } from '@/stores/models/cart/store';
import { useCartUIStore } from '@/stores/models/cart/uiStore';
import { onMounted } from 'vue';
import baseInput from '@/components/layout/baseInput.vue';

const cartStore = useCartStore();
const uiCartStore = useCartUIStore();

const handleCartToggle = () => {
  cartStore.getCart();
  uiCartStore.toggleCart();
};

onMounted(() => {
  cartStore.getCart();
});
</script>

<style></style>
