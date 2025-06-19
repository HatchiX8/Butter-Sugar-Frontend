<template>
  <section class="relative w-full h-54vh md:h-64vh flex items-center justify-center text-white py-20">
    <!-- 背景圖 -->
    <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url('${backgroundUrl}')` }"></div>

    <!-- 黑色遮罩 -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- 內容 -->
    <div class="relative z-10 text-center px-6">
      <p class="text-5 md:text-8 tracking-widest text-neutral-300 font-['ChenYuluoyan'] py-2">
        恭喜！你的烘焙之旅正式開始！
      </p>
      <p class="text-6 md:text-10 font-bold tracking-widest leading-tight py-2">
        你已成功訂購課程，<br>現在就踏上美味的學習旅程！
      </p>
      <p class="text-5 md:text-8 text-neutral-200 font-['ChenYuluoyan'] py-2">
        點擊下方按鈕，開始探索百變風味的烘焙世界，滿足你的甜點靈感！
      </p>
      <router-link :to="{ name: 'MyCourse' }">
        <baseButton label="前往我的課程" type="primary" class="mt-4" />
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import baseButton from '@/components/layout/baseButton.vue';

// 建議背景圖：烘焙甜點圖片
const backgroundUrl = new URL('@/assets/images/cart/make-cookies.jpg', import.meta.url).href;
</script>

<style scoped>
</style>
