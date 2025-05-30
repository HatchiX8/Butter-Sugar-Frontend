<template>
  <div class="relative flex flex-col items-center justify-center pt-20 pb-8">
    <!-- 麥穗圖（左右）-->
    <img :src="wheatLeftImgUrl" class="absolute z-10
    md:h-58
    md:left-[7%]
    md:bottom-[26%]
    lg:h-68
    lg:left-[21%]
    lg:bottom-[21%]
    " />
    <img :src="wheatRightImgUrl" class="absolute h-68 z-10
    md:h-58
    md:right-[7%]
    md:bottom-[26%]
    lg:h-68
    lg:right-[21%]
    lg:bottom-[21%]
    " />

    <!-- 中央圖片 -->
    <div class="relative z-0 w-[80%] max-w-5xl overflow-hidden aspect-[3/1.2] p-b-24">
      <img class="w-full h-full object-cover" :src="imageUrl" :alt="imageAlt" />

      <!-- 文字區塊（覆蓋在圖片上）-->
      <div class="absolute inset-0 w-2/3 m-auto flex items-end text-center text-white font-['Noto Serif TC']">
        <n-typography>
          <h2 class="text-8 sm:text-16 leading-normal font-['ChenYuluoyan']">{{ title }}</h2>
          <h3 class="mb-3 text-4 sm:text-7 font-bold leading-tight">{{ subtitle }}</h3>
          <h3 class="mb-2 text-3 sm:text-5 font-bold leading-normal">{{ description }}</h3>
        </n-typography>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    imageUrl: String,
    imageAlt: String,
    title: String,
    subtitle: String,
    description: String,
});

const wheatLeftImgUrl = new URL(
    '@/assets/images/home/wheat-left.png',
    import.meta.url
).href;
const wheatRightImgUrl = new URL(
    '@/assets/images/home/wheat-right.png',
    import.meta.url
).href;
</script>
