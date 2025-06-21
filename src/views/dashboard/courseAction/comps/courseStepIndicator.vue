<template>
  <div>
    <typography variant="h4" font-type="title" class="text-white -mt-15 mb-5" v-if="!isEdit">
      建立新課程
    </typography>
    <h2 v-else>編輯課程</h2>
    <n-config-provider :theme-overrides="themeOverrides">
      <div class="md:w-168 w-60 py-4 pl-4 md:py-6 md:pl-16">
        <n-steps :current="props.current" :data-current="props.current" class="step-indicator" size="medium">
          <n-step v-for="(title, index) in steps" :key="index" :title="title" />
        </n-steps>
      </div>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { hexToRgba, themeColors } from '@/utils';
import typography from '@/components/layout/typography.vue';

const steps = computed(() => (props.isEdit ? editSteps : addSteps));
const addSteps = ['新增課程簡介', '新增課程章節', '定價&提交審核'];
const editSteps = ['編輯課程簡介', '編輯課程章節', '定價&提交審核'];

const props = defineProps<{
  current: number;
  isEdit: boolean;
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
<style scoped>
.step-indicator { width: 100%; }

/* 1. 手機 (< 768px) 才做隱藏 */
@media (max-width: 767px) {

  /* 當 current = 1 → 隱藏第 3 顆 */
  .step-indicator[data-current="1"] .n-step:nth-child(3) {
    display: none;
  }

  /* 當 current = 2 或 3 → 隱藏第 1 顆 */
  .step-indicator[data-current="2"] .n-step:nth-child(1),
  .step-indicator[data-current="3"] .n-step:nth-child(1) {
    display: none;
  }
}
</style>