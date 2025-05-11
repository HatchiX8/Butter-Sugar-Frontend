<template>
  <header class="font-['Noto Serif TC'] px-6 py-3">
    <div class="mx-auto w-full max-w-7xl flex items-center justify-between">
      <router-link to="/home">
        <img src="@/assets/logo.png" alt="Butter&Sugar" class="h-8" />
      </router-link>

      <nav class="flex items-center gap-4">
        <a href="#" class="text-white no-underline">探索課程</a>
        <div class="pos-relative flex items-center justify-between">
          <n-config-provider :theme-overrides="themeOverrides">
            <n-input
              type="text"
              placeholder="輸入關鍵字搜尋"
              class="w-300px h-48px  bg-[#0D0B07] leading-[48px] focus:outline-none"
            />
          </n-config-provider>
          <div
            class="i-ion:search-outline pos-absolute text-5 right-2 top-1/2 -translate-y-1/2 cursor-pointer text-[#9E9E9E]"
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

const themeOverrides = {
  Input: {
    border: '1px solid  #0D0B07',
    borderHover: '1px solid  #0D0B07',
    borderFocus: '1px solid  #0D0B07',
    borderRadius: '4px',
    placeholderColor: '#9e9e9e',
    color: '#9e9e9e',
  }
}
</script>
<style>
header{
  border-bottom: 1px solid rgba(253,253,253,0.25);
}

</style>