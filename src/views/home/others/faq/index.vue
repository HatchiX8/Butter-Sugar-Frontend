<template>
  <div class="w-80% max-w-200 mx-auto mb-20 text-white">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '首頁', to: '/' },
        { label: '常見問題'},
      ]"
    />
    <faqComps/>
  </div>
</template>

<script setup lang="ts">
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import faqComps from '@/views/home/courseIntroduction/comps/faq.vue';

</script>

<style scoped>

</style>
