<!-- 步驟條 -->
<template>
  <div class="text-white p-6">
    <n-config-provider :theme-overrides="themeOverrides">
      <div class="text-white p-6">
        <n-steps v-model:current="current" size="medium">
          <n-step v-for="(title, index) in steps" :key="index" :title="title" />
        </n-steps>
      </div>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const steps = ['購物車', '結帳資訊', '確認付款', '訂購完成'];

const current = computed(() => {
  if (route.path.startsWith('/cart-flow/order-success')) return 4
  if (route.path.startsWith('/cart-flow/order-return')) return 3
  if (route.path.startsWith('/cart-flow/checkout')) return 2
  return 1
});

const themeOverrides = {
  Steps: {
    // 未開始
    headerTextColorWait: '#FFFDFA',
    // 進行中
    indicatorTextColorProcess: '#FFFDFA',
    headerTextColorProcess: '#FFFDFA',
    indicatorColorProcess: '#D68E39',
    indicatorBorderColorProcess: '#D68E39',
    splitorColorProcess: '#FFFDFA',
    // 已完成
    indicatorTextColorFinish: '#FFFDFA',
    headerTextColorFinish: '#FFFDFA',
    indicatorColorFinish: '#D68E39',
    indicatorBorderColorFinish: '#D68E39',
    splitorColorFinish: '#FFFDFA',
  }
};
</script>

<style scoped></style>
