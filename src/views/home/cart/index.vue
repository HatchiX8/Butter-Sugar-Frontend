<!-- 購物流程共用的 layout -->
<template>
  <div class="min-h-screen px-6 md:px-8 lg:px-16 bg-neutral_600">
    <stepIndicator />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import stepIndicator from './comps/stepIndicator.vue';
</script>
