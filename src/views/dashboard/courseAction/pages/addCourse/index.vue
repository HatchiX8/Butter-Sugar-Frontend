<template>
  <div>
    <courseStepIndicator :current="currentStep" />
    <component :is="currentFormComponent" />
  </div>
  <button @click="preToggle">上一步</button>
  <button @click="nextToggle">下一步</button>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  courseChapter,
  courseIntroduction,
  courseStepIndicator,
  courseSubmit,
} from '../../comps/index';

// 從表格頁面跳轉進來
const route = useRoute();
const currentStep = ref(Number(route.query.step) || 1);

const currentFormComponent = computed(() => {
  switch (currentStep.value) {
    case 1:
      return courseIntroduction;
    case 2:
      return courseChapter;
    case 3:
      return courseSubmit;
    default:
      return courseIntroduction;
  }
});

const nextToggle = () => {
  if (currentStep.value >= 3) {
    return;
  }
  currentStep.value++;
};

const preToggle = () => {
  if (currentStep.value <= 1) {
    return;
  }
  currentStep.value--;
};
</script>
