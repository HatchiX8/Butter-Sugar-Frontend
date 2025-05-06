<template>
  <TopNav />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import TopNav from '@/components/layout/topNav.vue'
</script>
