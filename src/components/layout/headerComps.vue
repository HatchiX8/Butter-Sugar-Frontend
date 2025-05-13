<template>
  <header class="font-['Noto Serif TC'] border-b-solid border-b-1 border-b-white px-6 py-3">
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between">
      <router-link to="/home">
        <img src="@/assets/logo.png" alt="Butter&Sugar" class="h-8" />
      </router-link>

      <nav class="flex items-center gap-4">
        <a href="#" class="text-white no-underline">探索課程</a>
        <div class="pos-relative flex items-center justify-between">
          <n-input
            type="text"
            placeholder="輸入關鍵字搜尋"
            class="w-300px h-48px bg-black leading-[48px] focus:outline-none"
          />
          <div
            class="i-ion:search-outline pos-absolute text-5 text-neutral_300 right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          ></div>
        </div>
        <a href="#">
          <div class="i-ion:cart w-4.5 h-4.5 text-white"></div>
        </a>
        <userAction />
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { userAction } from '@/components/index';
</script>

<style></style>
