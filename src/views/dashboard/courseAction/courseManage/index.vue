<template>
  <div>
    <courseStepIndicator :current="currentStep" :is-edit="isEditMode" />
    <!-- <component :is="currentFormComponent" /> -->
    <div v-show="currentStep === 1">
      <courseIntroduction
        :course-data="courseInfoData"
        :is-edit="isEditMode"
        :request="addChildRequest"
      />
    </div>
    <div v-show="currentStep === 2">
      <courseChapter :course-data="courseChapterData" />
    </div>
    <div v-show="currentStep === 3">
      <courseSubmit :course-data="courseSubmitData" />
    </div>
  </div>
  <button @click="preToggle">上一步</button>
  <button @click="nextToggle">下一步</button>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  courseChapter,
  courseIntroduction,
  courseStepIndicator,
  courseSubmit,
} from '../comps/index';
import type { AddChildRequestPayload } from '@/views/dashboard/type';
import { useDashboardStore } from '@/stores/models/index';

// 從表格頁面跳轉進來
const route = useRoute();
const isEditMode = computed(() => typeof route.query.id === 'string' && route.query.id !== ''); // 有 id 就代表是編輯
const currentStep = ref(Number(route.query.step) || 1);

const courseInfoData = ref({
  description: '',
  id: '',
  title: '',
});

onMounted(() => {});

// ----------Store----------
const dashboardStore = useDashboardStore();
// -------------------------

// -----------上下頁切換-----------
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

const courseSubmitData = ref({
  description: '',
  id: '',
  title: '',
});

const courseChapterData = ref({
  description: '',
  id: '',
  title: '',
});
// ----------------------------------

// -----------判定新增/編輯-----------
// const isEditMode = computed(() => Boolean(route.query.id)); // 有 id 就代表是編輯
// ----------------------------------

// -----------API請求-----------
const addChildRequest = async ({ type, payload }: AddChildRequestPayload): Promise<unknown> => {
  // 觸發標題API
  if (type === 'addTitle') {
    // 呼叫新增課程標題 API
    const postData = {
      course_name: payload,
    };
    console.log('觸發標題API', postData);
    return dashboardStore.addTitle(postData);
  }
  // 觸發類別API
  else if (type === 'addCategory') {
    const postData = {
      category_id: payload.categoryId,
    };
    console.log('觸發類別API', postData);
    // 假設未來會有 API 呼叫，這裡先回傳 resolved Promise
    return dashboardStore.addCategory(postData);
  }
  return Promise.resolve();
};
// -----------------------------
</script>
