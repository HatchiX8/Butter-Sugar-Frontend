<template>
  <div class="w-full max-w-[1280px] mx-auto px-4 flex flex-col items-start box-border text-white">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '首頁', to: '/' },
        { label: '我的課程', to: '/home/my-course?page=1' },
        { label: '職人級！一次掌握歐式麵包的高水量與發酵秘訣' },
      ]"
    />
    <courseVideo />
    <qaModule />
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import courseVideo from './comps/courseVideo.vue';
</script>