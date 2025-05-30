<template>
  <div class="p-6 bg-white/10 b-1 b-solid border-white/60% relative overflow-hidden">
    <!-- 光影背景 -->
    <img class="absolute inset-0 w-1/2 h-24 left-1/2 -translate-x-1/2 z-0 pointer-events-none" :src="lightShadeImgUrl" alt="光影背景" />

    <!-- 圖片 -->
    <div class="w-14 h-14 mb-5 mx-auto relative z-10">
      <img class="w-full h-full z-10" :src="imageUrl" :alt="imageAlt" />
    </div>

    <!-- 內容 -->
    <h4 class="text-5 font-bold text-center text-white mb-3">{{ title }}</h4>
    <p class="text-3.5 leading-tight text-gray-300">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  imageUrl: string
  imageAlt: string
  title: string
  description: string
}>();

const lightShadeImgUrl = new URL('@/assets/images/home/light-shade.png', import.meta.url).href;

</script>

<style scoped>
.clamped-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
