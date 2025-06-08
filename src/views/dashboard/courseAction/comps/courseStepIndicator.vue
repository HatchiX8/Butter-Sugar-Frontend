<template>
  <div>
    <h2>建立新課程</h2>
    <n-config-provider :theme-overrides="themeOverrides">
      <div class="md:w-168 w-60 py-4 pl-4 md:py-6 md:pl-16">
        <n-steps :current="props.current" size="medium">
          <n-step v-for="(title, index) in steps" :key="index" :title="title" />
        </n-steps>
      </div>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { hexToRgba, themeColors } from '@/utils';

const steps = ['新增課程簡介', '新增課程章節', '定價&提交審核'];

const props = defineProps<{
  current: number;
}>();

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
  },
};
</script>
