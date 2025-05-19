<template>
  <div class="flex min-h-screen flex-col">
    <headerComps />
    <router-view class="flex-1" />
    <footerComps />
  </div>
</template>

<script setup lang="ts">
import { headerComps, footerComps } from '@/components/index';
</script>
