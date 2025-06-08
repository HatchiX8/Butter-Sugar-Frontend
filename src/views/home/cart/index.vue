<!-- 購物流程共用的 layout -->
<template>
  <div class="pt-20 min-h-screen bg-neutral_600">
    <stepIndicator />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import stepIndicator from './comps/stepIndicator.vue';
</script>
