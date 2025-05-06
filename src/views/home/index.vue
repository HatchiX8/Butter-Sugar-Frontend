<template>
  <headerComps />
  <div>首頁</div>
  <router-view />
  <div class="i-clarity:avatar-line"></div>
  <div class="i-ion:logo-alipay"></div>
</template>

<script setup lang="ts">
import { headerComps } from '@/components/index';
</script>
