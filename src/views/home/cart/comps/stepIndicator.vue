<!-- 步驟條 -->
<template>
  <div class="text-white p-6 flex justify-center">
    <n-config-provider :theme-overrides="themeOverrides">
      <div class="w-60 pl-4 py-4 md:w-168 md:pl-16 md:py-6">
        <n-steps :current="current" size="medium">
          <n-step v-for="(title, index) in steps" :key="index" :title="title"/>
        </n-steps>
      </div>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { hexToRgba, themeColors } from '@/utils';

const route = useRoute();
const steps = ['購物車', '結帳資訊', '確認付款', '訂購完成'];

const current = computed(() => {
  if (route.path.startsWith('/home/cart-flow/order-success')) return 4
  if (route.path.startsWith('/home/cart-flow/order-return')) return 3
  if (route.path.startsWith('/home/cart-flow/checkout')) return 2
  return 1
});

const colors = themeColors.colors;
const themeOverrides = {
  Steps: {
    // 未開始
    indicatorTextColorWait: hexToRgba(colors.white, 0.5),
    headerTextColorWait: hexToRgba(colors.white, 0.5),
    indicatorBorderColorWait: hexToRgba(colors.white, 0.5),
    splitorColorWait: hexToRgba(colors.white, 0.5),
    // 進行中
    indicatorTextColorProcess: colors.white,
    headerTextColorProcess: colors.white,
    indicatorColorProcess: colors.primaryDefault,
    indicatorBorderColorProcess: colors.primaryDefault,
    splitorColorProcess: colors.white,
    // 已完成
    indicatorTextColorFinish: colors.white,
    headerTextColorFinish: colors.white,
    indicatorColorFinish: colors.primaryDefault,
    indicatorBorderColorFinish: colors.primaryDefault,
    splitorColorFinish: colors.white,
  }
};
</script>

<style scoped></style>
