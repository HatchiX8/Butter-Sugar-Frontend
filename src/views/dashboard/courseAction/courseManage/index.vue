<template>
  <div>
    <courseStepIndicator :current="currentStep" :is-edit="isEditMode" />
    <!-- <component :is="currentFormComponent" /> -->
    <div v-show="currentStep === 1">
      <courseIntroduction
        :course-data="courseInfoData"
        :is-edit="isEditMode"
        :request="addChildRequest"
        @update:courseName="courseName = $event"
        @update:categoryId="categoryId = $event"
      />
    </div>
    <div v-show="currentStep === 2">
      <courseChapter :course-data="courseChapterData" />
    </div>
    <div v-show="currentStep === 3">
      <courseSubmit
        :course-data="courseSubmitData"
        @save="onSavePrice"
        @update:originPrice="(val) => (courseSubmitData.origin_price = val)"
        @update:sellPrice="(val) => (courseSubmitData.sell_price = val)"
      />
    </div>
  </div>
  <div v-show="dashboardStore.courseId">
    <n-button v-show="currentStep !== 1"
      type="primary"
      @click="preToggle"
      class="bg-primaryDefault mr-4 rounded-md border-none px-4 py-3 text-white"
      >上一步</n-button
    >
    <n-button :disabled="!showNextButton"
      type="primary"
      @click="nextToggle"
      class="bg-primaryDefault rounded-md border-none px-4 py-3 text-white"
      >下一步</n-button
    >
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  courseChapter,
  courseIntroduction,
  courseStepIndicator,
  courseSubmit,
} from '../comps/index';
import type { AddChildRequestPayload } from '@/views/dashboard/type';
import { useDashboardStore } from '@/stores/models/index';
import { useMessage } from 'naive-ui';
import { useMenuStore } from '@/stores/models/dashboard/uiStore';

const menuStore = useMenuStore();

const message = useMessage();

// 從表格頁面跳轉進來
const route = useRoute();
const courseId = computed(() => {
  const id = route.query.id;
  return typeof id === 'string' ? id : '';
});
const isEditMode = computed(() => menuStore.isEditingCourse); // 有 id 就代表是編輯
const currentStep = ref(Number(route.query.step) || 1);

const courseInfoData = ref({
  id: '',
  course_name: '',
  category_id: '',
  course_description: '',
  course_banner_description: '',
  suitable_for: '',
  course_goal: '',
  course_banner_imageUrl: '',
  course_small_imageUrl: '',
  course_description_imageUrl: '',
  trailer_url: '',
  trailer_name: '',
});

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
  id: '',
  origin_price: '',
  sell_price: '',
});

const courseChapterData = ref({
  id: '',
  course_name: '',
  course_description: '',
});

const courseName = ref('');
const categoryId = ref<number | ''>('');

const showNextButton = computed(() => {
  // 編輯模式一定可以顯示
  if (isEditMode.value) return true;

  // 新增模式：有輸入課程名稱和類別才顯示
  return courseName.value.trim() !== '' && categoryId.value !== '';
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

// -----------儲存課程價格-----------
const onSavePrice = async () => {
  const data = courseSubmitData.value;
  if (data.origin_price === null || data.sell_price === null) {
    message.error('請輸入完整的價格資訊');
    return;
  }

  const res = await dashboardStore.saveCoursePrice(data.id, {
    origin_price: Number(data.origin_price),
    sell_price: Number(data.sell_price),
  });
  message[res.success ? 'success' : 'error'](res.message);
};
// -----------------------------

// -----------新增/編輯模式判斷是否重置資料-----------
const emptyCourseInfoData = {
  id: '',
  course_name: '',
  category_id: '',
  course_description: '',
  course_banner_description: '',
  suitable_for: '',
  course_goal: '',
  course_banner_imageUrl: '',
  course_small_imageUrl: '',
  course_description_imageUrl: '',
  trailer_url: '',
  trailer_name: '',
};

const emptyCourseSubmitData = {
  id: '',
  origin_price: '',
  sell_price: '',
};

const resetFormData = () => {
  courseInfoData.value = { ...emptyCourseInfoData };
  courseSubmitData.value = { ...emptyCourseSubmitData };
};

const fetchCourseDetailAndInit = async (id: string) => {
  try {
    // 取得課程資料
    const courseDetail = await dashboardStore.fetchCourseDetail(id);
    if (!courseDetail) return;

    // 同時初始化課程簡介資料
    courseInfoData.value = {
      id: courseDetail.id,
      course_name: courseDetail.course_name,
      category_id: courseDetail.category_id,
      course_description: courseDetail.course_description,
      course_banner_description: courseDetail.course_banner_description,
      suitable_for: courseDetail.suitable_for,
      course_goal: courseDetail.course_goal,
      course_banner_imageUrl: courseDetail.course_banner_imageUrl,
      course_small_imageUrl: courseDetail.course_small_imageUrl,
      course_description_imageUrl: courseDetail.course_description_imageUrl,
      trailer_url: courseDetail.trailer_url,
      trailer_name: courseDetail.trailer_name,
    };

    // 同時初始化章節資料
    courseChapterData.value = {
      id: courseDetail.id,
      course_name: courseDetail.course_name,
      course_description: courseDetail.course_description,
    };

    // 同時初始化定價資料
    courseSubmitData.value = {
      id: courseDetail.id,
      origin_price: courseDetail.origin_price?.toString() || '',
      sell_price: courseDetail.sell_price?.toString() || '',
    };
  } catch (err) {
    console.error('載入課程資料失敗', err);
  }
};

watch(
  isEditMode,
  async (isEdit) => {
    if (isEdit) {
      // 編輯模式
      await fetchCourseDetailAndInit(courseId.value);
    } else {
      // 新增模式
      resetFormData();
    }
  },
  { immediate: true }
);
// -----------------------------
</script>
