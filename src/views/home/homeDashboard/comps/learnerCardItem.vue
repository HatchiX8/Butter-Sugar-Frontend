<template>
  <div class="w-full max-w-80 h-auto p-6 mx-auto transition-colors duration-300 hover:bg-white/10%">
    <div>
      <h4 class="clamped-text-1 mb-6 text-4.5 font-bold text-white leading-normal">{{ courseTitle }}</h4>
      <p class="clamped-text-4 h-16 text-3.5 text-neutral_200 leading-tight">{{ review }}</p>
    </div>
    <div class="flex items-center text-sm text-white leading-normal mt-4">
      <div class="relative w-10 mr-3 overflow-hidden rounded-full aspect-[1/1]">
        <img class="w-full h-full align-top" :src="avatar" :alt="avatarAlt"/>
      </div>
      <p class="text-3.5 text-neutral_200">{{ name }}</p>
    </div>
    <div class="mt-5 w-50 b-b-1 b-b-solid b-white/25%"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  avatar: string
  avatarAlt: string
  name: string
  courseTitle: string
  review: string
}>();
</script>

<style scoped>
.clamped-text-4 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
.clamped-text-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
