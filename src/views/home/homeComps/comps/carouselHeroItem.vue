<template>
  <div class="relative flex flex-col items-center justify-center pt-20 pb-8">
    <!-- 麥穗圖（左右）-->
    <img :src="wheatLeftImgUrl" class="absolute z-10 hidden md:block
    md:h-58 md:left-[7%] md:bottom-[26%]
    lg:h-63 lg:left-[7%] lg:bottom-[23%]
    xl:h-68 xl:left-[10%] xl:bottom-[22%]
    2xl:h-68 2xl:left-[21%] 2xl:bottom-[22%]" />
    <img :src="wheatRightImgUrl" class="absolute h-68 z-10 hidden md:block
    md:h-58 md:right-[7%] md:bottom-[26%]
    lg:h-63 lg:right-[7%] lg:bottom-[23%]
    xl:h-68 xl:right-[10%] xl:bottom-[22%]
    2xl:h-68 2xl:right-[21%] 2xl:bottom-[22%]" />

    <!-- 中央圖片 -->
    <div class="relative z-0 w-[80%] max-w-256 overflow-hidden aspect-[3/1.2] p-b-24">
      <img class="w-full h-full object-cover" :src="imageUrl" :alt="imageAlt" />

      <!-- 文字區塊（覆蓋在圖片上）-->
      <div class="absolute inset-0 w-2/3 m-auto flex items-end text-center text-white font-['Noto Serif TC']">
        <div>
          <h2 class="text-8 sm:text-16 leading-normal font-['ChenYuluoyan']">{{ title }}</h2>
          <h3 class="mb-3 text-4 sm:text-7 font-bold leading-tight">{{ subtitle }}</h3>
          <h3 class="mb-2 text-3 sm:text-5 font-bold leading-normal">{{ description }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  imageUrl: string
  imageAlt: string
  title: string
  subtitle: string
  description: string
}>();

const wheatLeftImgUrl = new URL('@/assets/images/home/wheat-left.png', import.meta.url).href;
const wheatRightImgUrl = new URL('@/assets/images/home/wheat-right.png', import.meta.url).href;
</script>
