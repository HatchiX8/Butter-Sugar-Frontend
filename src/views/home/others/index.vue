<template>
  <div :style="{ backgroundImage: `url(${bgImgUrl})` }">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 背景圖片
const bgImgUrl= new URL('@/assets/images/home/bg-grey-wrinkle.png', import.meta.url).href;
</script>

<style scoped>

</style>
