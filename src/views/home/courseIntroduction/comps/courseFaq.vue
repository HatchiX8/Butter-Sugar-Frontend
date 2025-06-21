<template>
  <div id="course-qa" class="flex flex-col gap-10 w-full">
    <typography variant="h2" font-type="title" class="text-white" underline>課程問答</typography>

    <!-- 留言輸入區 (只有登入用戶才能看到) -->
    <div v-if="isLoggedIn" class="border-1 border-solid border-white/20 p-6 bg-neutral_500">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            class="w-full h-full"
            style="object-fit: cover; object-position: center;"
            src="@/assets/images/course/teacher.jpg"
            alt="用戶頭像"
          />
        </div>
        <div class="flex-grow">
          <n-input
            v-model:value="commentText"
            type="textarea"
            placeholder="輸入您的問題或留言..."
            :autosize="{ minRows: 3, maxRows: 6 }"
            class="mb-3"
          />
          <div class="flex justify-end">
            <n-button type="primary" @click="submitComment" :disabled="!commentText.trim()">
              <typography variant="paragraph-medium" font-type="content" class="text-white">送出</typography>
            </n-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 未登入提示區 -->
    <div v-if="!isLoggedIn" class="border-1 border-solid border-white/20 p-6 bg-neutral_500 flex flex-col items-center">
      <div class="i-ion:person-circle-outline text-primary-light text-8xl mb-4"></div>
      <typography variant="h5" font-type="title" class="text-white mb-2">請先登入後留言</typography>
      <typography variant="paragraph-regular" font-type="content" class="text-neutral-200 mb-4">登入後即可參與課程問答，與講師及其他學員互動</typography>
      <n-button type="primary" size="large" class="px-8" @click="onGoogleLogin">
        <typography variant="paragraph-medium" font-type="content" class="text-white">登入/註冊</typography>
      </n-button>
    </div>

    <!-- 問答列表元件 (所有用戶都能看到) -->
    <div class="w-full">
      <div class="flex flex-col gap-6">
        <!-- 加載中狀態 -->
        <div v-if="isLoading" class="flex justify-center items-center p-10">
          <NSpin size="large" />
        </div>

        <!-- 錯誤狀態 -->
        <div v-else-if="hasError" class="flex flex-col items-center justify-center py-8">
          <NEmpty :description="errorMessage" size="large">
            <template #icon>
              <div class="text-red-500 text-4xl mb-2">
                <i class="fas fa-exclamation-circle"></i>
              </div>
            </template>
            <template #extra>
              <!-- 如果是401未授權錯誤，顯示登入按鈕 -->
              <div v-if="errorMessage.includes('請先登入')" class="mt-4">
                <NButton @click="onGoogleLogin" type="primary">
                  登入/註冊
                </NButton>
              </div>
              <!-- 其他錯誤則顯示重試按鈕 -->
              <NButton v-else @click="fetchCourseQA" type="primary" class="mt-4">
                重新嘗試
              </NButton>
            </template>
          </NEmpty>
        </div>

        <!-- 無數據狀態 -->
        <div v-else-if="qaList.length === 0 && !isLoading" class="flex justify-center items-center p-10">
          <NEmpty description="暫無問答數據" />
        </div>

        <!-- 數據顯示 -->
        <template v-else>
          <QnAList :qa-list="qaList" :page-size="showMore ? expandedPageSize : defaultPageSize" />
          <div class="flex justify-center">
            <NButton v-if="!showMore && qaList.length > defaultPageSize" type="primary" @click="showMore = true">
              顯示更多
            </NButton>
            <NButton v-else-if="showMore" type="primary" @click="showMore = false">
              收起
            </NButton>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useUserStore } from '@/stores/models/index';
import { useCourseQAStore } from '@/stores/models/courseQA/store';
import typography from '@/components/layout/typography.vue';
import { NButton, NInput, NEmpty, NSpin } from 'naive-ui';
import QnAList from '@/components/layout/qaList.vue';

// 接收課程ID作為props
const props = defineProps<{
  courseId: string
}>();

// API 基礎 URL
const API_BASE = import.meta.env.VITE_API_URL;

// 使用者狀態
const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);

// 第三方登入
const onGoogleLogin = () => {
  window.location.href = `${API_BASE}/api/v1/users/auth/google`;
};

const commentText = ref('');

// 分頁相關狀態
// 控制顯示更多問答
const defaultPageSize = 5; // 預設每頁顯示 5 筆
const expandedPageSize = 10; // 展開後每頁顯示 10 筆
const showMore = ref(false);

// 使用課程問答 store
const courseQAStore = useCourseQAStore();

// 計算屬性：獲取當前課程的問答列表
const qaList = computed(() => courseQAStore.getCourseQA(props.courseId));

// 計算屬性：獲取當前課程的加載狀態
const isLoading = computed(() => courseQAStore.getLoadingState(props.courseId));

// 計算屬性：獲取當前課程的錯誤狀態
const errorState = computed(() => courseQAStore.getErrorState(props.courseId));
const hasError = computed(() => errorState.value.hasError);
const errorMessage = computed(() => errorState.value.errorMessage);

// 從API獲取課程問答數據
const fetchCourseQA = () => {
  if (props.courseId) {
    courseQAStore.fetchCourseQA(props.courseId);
  }
};

// 監聽courseId變化，重新獲取數據
watch(() => props.courseId, (newId) => {
  if (newId) {
    fetchCourseQA();
  }
}, { immediate: true });

// 處理留言提交
const submitComment = async () => {
  if (!commentText.value.trim()) {
    alert('請輸入問題內容');
    return;
  }

  // 使用store提交問題
  const success = await courseQAStore.submitQuestion(props.courseId, commentText.value);

  if (success) {
    // 提交成功後清空輸入框
    commentText.value = '';
  }
  // 錯誤已由 store 處理，錯誤會在 UI 中顯示
};
</script>

<style scoped>
/* 分頁樣式已移至 QnAList 元件中 */
</style>
