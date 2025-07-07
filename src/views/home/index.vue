<template>
  <div class="flex min-h-screen flex-col">
    <headerComps />
    <router-view class="flex-1" />
    <footerComps />
    <!-- 回到最上方按鈕 -->
    <scrollToTop/>
  </div>
</template>

<script setup lang="ts">
import { headerComps, footerComps, scrollToTop } from '@/components/index';
</script>
