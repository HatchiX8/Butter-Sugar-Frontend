<!-- 步驟條 -->
<template>
  <div class="text-white p-6">
    <n-steps v-model:current="current" size="medium">
      <n-step v-for="(title, index) in steps" :key="index" :title="title" style="
      --n-indicator-color: #D68E39;
      --n-indicator-border-color: #D68E39;
      --n-indicator-text-color: #FFFDFA;
      --n-splitor-color: #FFFDFA;
      --n-header-text-color: #FFFDFA;
      " />
    </n-steps>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const steps = ['購物車', '結帳資訊', '確認付款', '訂購完成']

const current = ref(1)
current.value = computed(() => {
  if (route.path.startsWith('/cart/success')) return 4
  if (route.path.startsWith('/cart/return')) return 3
  if (route.path.startsWith('/cart/checkout')) return 2
  return 1
}).value
</script>

<style scoped></style>
